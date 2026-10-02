import rawDb from "@/data/history/algerian_bac_history_v5_lesson_wing.json";
import type {
  BacArchive,
  ChronologyEvent,
  Flashcard,
  FlashcardType,
  HistoryDatabase,
  HistoryUnit,
  IndirectExamQuestion,
  LessonSummary,
  LessonWing,
  MapCartography,
  Personality,
  PriorityTier,
  Situation,
  Term,
} from "@/types/history";

const db = rawDb as unknown as HistoryDatabase;

/** Normalize Arabic text for search: strip tashkeel, unify alef/hamza, ta marbuta, alef maqsura. */
export function normalizeArabic(input: string): string {
  return input
    .replace(/[ً-ٰٟ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ـ/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function matches(haystack: string, needle: string): boolean {
  return normalizeArabic(haystack).includes(normalizeArabic(needle));
}

export const DB_VERSION = db.metadata.version;

// ---------- memoized getters ----------
let unitsCache: HistoryUnit[] | null = null;
let termsCache: Term[] | null = null;
let personalitiesCache: Personality[] | null = null;
let chronologyCache: ChronologyEvent[] | null = null;
let flashcardsCache: Flashcard[] | null = null;
let mapsCache: MapCartography[] | null = null;
let archivesCache: BacArchive[] | null = null;

export function getDatabase(): HistoryDatabase {
  return db;
}

export function getUnits(): HistoryUnit[] {
  if (!unitsCache) unitsCache = db.units;
  return unitsCache;
}

export function getUnit(unitId: number): HistoryUnit | undefined {
  return getUnits().find((u) => u.id === unitId);
}

export function getSituation(unitId: number, situationId: string): Situation | undefined {
  return getUnit(unitId)?.situations.find((s) => s.id === situationId);
}

export function getAllSituations(): { unit: HistoryUnit; situation: Situation }[] {
  return getUnits().flatMap((unit) => unit.situations.map((situation) => ({ unit, situation })));
}

export function getLessonSummary(unitId: number, situationId: string): LessonSummary | undefined {
  return db.lesson_summaries.find((s) => s.unit_id === unitId && s.situation_id === situationId);
}

export function getIndirectQuestions(unitId: number, situationId: string): IndirectExamQuestion[] {
  return db.indirect_exam_questions.filter((q) => q.unit === unitId && q.situation_id === situationId);
}

/* ---------- lesson wing ---------- */
export function getLessonWing(unitId: number, situationId: string): LessonWing | undefined {
  return db.lesson_wing?.find((w) => w.unit_id === unitId && w.situation_id === situationId);
}

export function getAllLessonWings(): LessonWing[] {
  return db.lesson_wing ?? [];
}

/* ---------- priority tiers ---------- */
export function getPriorityTiers(): PriorityTier[] {
  const guide = db.priority_tiers_guide ?? {};
  return Object.values(guide).sort((a, b) => a.tier_id - b.tier_id);
}

export function getTier(tierId: number): PriorityTier | undefined {
  return getPriorityTiers().find((t) => t.tier_id === tierId);
}

export function tierBadge(tierId: number | undefined): string {
  if (!tierId) return "";
  return getTier(tierId)?.badge ?? "";
}

export function getTerms(unit?: number, tier?: number): Term[] {
  if (!termsCache) termsCache = db.terms;
  return termsCache.filter(
    (t) =>
      (unit === undefined || t.unit === unit) &&
      (tier === undefined || tier === 0 || t.priority_tier === tier)
  );
}

export function searchTerms(query: string, unit?: number, tier?: number): Term[] {
  const q = normalizeArabic(query);
  if (!q) return getTerms(unit, tier);
  return getTerms(unit, tier).filter((t) => matches(t.term, query) || matches(t.definition, query));
}

export function getPersonalities(category?: string, tier?: number): Personality[] {
  if (!personalitiesCache) personalitiesCache = db.personalities;
  return personalitiesCache.filter(
    (p) =>
      (!category || category === "all" || p.category === category) &&
      (tier === undefined || tier === 0 || p.priority_tier === tier)
  );
}

export function getPersonalityCategories(): string[] {
  return [...new Set(getPersonalities().map((p) => p.category))];
}

export function searchPersonalities(query: string, category?: string, tier?: number): Personality[] {
  const q = normalizeArabic(query);
  const base = getPersonalities(category, tier);
  if (!q) return base;
  return base.filter(
    (p) =>
      matches(p.name, query) ||
      matches(p.scoring_criteria.official_role, query) ||
      p.scoring_criteria.key_actions.some((a) => matches(a, query))
  );
}

export function getPersonalityByName(name: string): Personality | undefined {
  return getPersonalities().find((p) => p.name === name);
}

export function getPersonalityById(id: string): Personality | undefined {
  return getPersonalities().find((p) => p.id === id);
}

export function getTermById(id: string): Term | undefined {
  return getTerms().find((t) => t.id === id);
}

export function getChronology(unit?: number, tier?: number): ChronologyEvent[] {
  if (!chronologyCache) {
    chronologyCache = [...db.chronology].sort((a, b) => a.date.localeCompare(b.date));
  }
  return chronologyCache.filter(
    (e) =>
      (unit === undefined || unit === 0 || e.unit === unit) &&
      (tier === undefined || tier === 0 || e.priority_tier === tier)
  );
}

export function searchChronology(query: string, unit?: number, tier?: number): ChronologyEvent[] {
  const q = normalizeArabic(query);
  if (!q) return getChronology(unit, tier);
  return getChronology(unit, tier).filter(
    (e) => matches(e.event, query) || e.date.includes(query.trim())
  );
}

export function getMaps(): MapCartography[] {
  if (!mapsCache) mapsCache = db.maps_cartography;
  return mapsCache;
}

export function getMap(mapId: string): MapCartography | undefined {
  return getMaps().find((m) => m.id === mapId);
}

export function getFlashcards(
  type?: FlashcardType | "all",
  unit?: number,
  tier?: number
): Flashcard[] {
  if (!flashcardsCache) flashcardsCache = db.flashcards;
  return flashcardsCache.filter((c) => {
    if (type && type !== "all" && c.type !== type) return false;
    if (unit !== undefined && unit !== 0) {
      const back = c.back as { unit?: number };
      const cardUnit = c.unit_id ?? back.unit;
      if (cardUnit !== undefined && cardUnit !== unit) return false;
    }
    if (tier !== undefined && tier !== 0 && c.priority_tier !== tier) return false;
    return true;
  });
}

export function getArchives(): BacArchive[] {
  if (!archivesCache) {
    archivesCache = [...db.bac_archives].sort((a, b) => b.year - a.year);
  }
  return archivesCache;
}

export function getArchive(year: number): BacArchive | undefined {
  return getArchives().find((a) => a.year === year);
}

export function getRelatedPersonalities(term: string): Personality[] {
  return getPersonalities().filter((p) => p.related_terms.includes(term));
}

export function getStats(): {
  units: number;
  situations: number;
  terms: number;
  personalities: number;
  events: number;
  maps: number;
  flashcards: number;
  archives: number;
  indirect: number;
  wings: number;
} {
  return {
    units: getUnits().length,
    situations: getAllSituations().length,
    terms: getTerms().length,
    personalities: getPersonalities().length,
    events: getChronology().length,
    maps: getMaps().length,
    flashcards: getFlashcards().length,
    archives: getArchives().length,
    indirect: db.indirect_exam_questions.length,
    wings: getAllLessonWings().length,
  };
}
