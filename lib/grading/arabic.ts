/** Arabic text normalization + keyword scoring for ONEC-style grading. */

export function normalizeArabic(input: string): string {
  return input
    .replace(/[ً-ٰٟ]/g, "") // tashkeel + dagger alef
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ـ/g, "") // tatweel
    .replace(/[«»"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface KeywordResult {
  score: number;
  matched: string[];
  missing: string[];
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Proportional credit: each keyword is worth an equal share of maxScore. */
export function keywordScore(answer: string, keywords: string[], maxScore: number): KeywordResult {
  const norm = normalizeArabic(answer);
  const matched: string[] = [];
  const missing: string[] = [];
  for (const kw of keywords) {
    if (kw.trim().length === 0) continue;
    if (norm.includes(normalizeArabic(kw))) matched.push(kw);
    else missing.push(kw);
  }
  const denom = matched.length + missing.length;
  const score = denom === 0 ? 0 : round2((maxScore * matched.length) / denom);
  return { score, matched, missing };
}

/** Essay structure markers for philosophical / analytical answers. */
const ESSAY_MARKERS: { label: string; patterns: RegExp; weight: number }[] = [
  { label: "طرح المشكلة", patterns: /تمهيد|مشكلة|إشكالية|تساؤل|إثارة|تثير/, weight: 0.2 },
  { label: "عرض المواقف", patterns: /يرى|يعتقد|الموقف|الاتجاه|أنصار|يذهب إلى/, weight: 0.25 },
  { label: "النقد والمناقشة", patterns: /نقد|لكن|غير أن|يعاب|يؤخذ عليه|رغم/, weight: 0.2 },
  { label: "التركيب والخاتمة", patterns: /تركيب|ختام|نستنتج|رأي|نخلص|في الأخير/, weight: 0.2 },
  { label: "توظيف أمثلة وشواهد", patterns: /مثال|مثل|شاهد|قول|قال|كما/, weight: 0.15 },
];

export interface EssayCriterion {
  label: string;
  present: boolean;
  weight: number;
}

export interface EssayResult {
  score: number;
  criteria: EssayCriterion[];
  longEnough: boolean;
}

export function essayStructureScore(answer: string, maxScore: number, minChars = 120): EssayResult {
  const norm = normalizeArabic(answer);
  const criteria = ESSAY_MARKERS.map((m) => ({
    label: m.label,
    present: m.patterns.test(norm),
    weight: m.weight,
  }));
  const longEnough = norm.length >= minChars;
  const structureShare = criteria.reduce((acc, c) => acc + (c.present ? c.weight : 0), 0);
  // Length gates the top 30%: short answers cap at 70% of max.
  const lengthFactor = norm.length >= minChars ? 1 : norm.length >= 40 ? 0.7 : 0.4;
  const score = round2(maxScore * Math.min(1, structureShare + 0.1) * lengthFactor);
  return { score, criteria, longEnough };
}
