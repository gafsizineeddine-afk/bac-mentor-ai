/** Type definitions for algerian_bac_history_v5_lesson_wing.json (V5 Lesson Wing). */

export interface DatabaseMetadata {
  title: string;
  curriculum_authority: string;
  examination_authority: string;
  version: string;
  export_date: string;
  changelog?: string[];
  priority_system_architecture?: unknown;
  audit_summary?: {
    total_terms: number;
    total_personalities: number;
    total_events: number;
    total_flashcards: number;
    total_maps: number;
    total_bac_years: number;
    lesson_wing_situations: number;
    unified_maps: number;
    tier_1_dates: number;
  };
}

export interface TierInfo {
  tier_id: number;
  label: string;
  badge: string;
  exam_frequency: string;
  study_advice: string;
}

export interface PriorityTier extends TierInfo {}

export type PriorityTiersGuide = Record<string, PriorityTier>;

export interface RubricPart {
  text: string;
  points: number;
  aliases: string[];
}

export interface AuditInfo {
  source?: string;
  reviewedBy?: string;
  publishStatus?: string;
  lastReviewedAt?: string;
  [key: string]: unknown;
}

/* ---------- cartography (V5 unified shape) ---------- */
export interface MapRubricPoints {
  title_points: number;
  legend_points: number;
  orientation_points: number;
  accuracy_points: number;
}

export interface MapFeature {
  id: string;
  label: string;
  category: string;
  color_code: string;
}

export interface MapCartography {
  id: string;
  title: string;
  unit_id: number;
  situation_id: string;
  basemap_type: string;
  rubric_points: MapRubricPoints;
  features: MapFeature[];
  audit?: AuditInfo;
  /* legacy V3 fields (absent in V5, kept optional for tolerance) */
  scope?: string;
  unit?: number;
  grading_standard?: {
    title_points: number;
    key_legend_points: number;
    accuracy_points: number;
    total_points: number;
    examiner_note: string;
  };
  locations?: unknown[];
  categories?: unknown[];
  crisis_locations?: unknown[];
  key_countries?: unknown[];
  zones?: unknown[];
  wilayas?: unknown[];
}

export interface DeceptivePhrasing {
  bac_question: string;
  intended_concept: string;
  traps_to_avoid: string;
}

export interface IndirectExamQuestion {
  unit: number;
  situation_id: string;
  standard_topic: string;
  deceptive_phrasings: DeceptivePhrasing[];
}

export interface LessonSummary {
  unit_id: number;
  situation_id: string;
  title: string;
  key_concept: string;
  core_ideas: string[];
  bac_exam_tips: string;
}

export interface ExtendedDefinition {
  term: string;
  definition: string;
}

export interface CategoryDefinition {
  category: string;
  definitions: ExtendedDefinition[];
}

export type FlashcardType = "TERM" | "CHRONOLOGY_DATE_TO_EVENT" | "PERSONALITY";

export interface TermAnswer {
  ideal_answer: string;
  unit: number;
  study_advice?: string;
}

export interface DateAnswer {
  exact_event: string;
  unit: number;
  study_advice?: string;
}

export interface PersonalityAnswer {
  nationality: string;
  official_role: string;
  key_actions: string[];
  exam_alert: string;
  study_advice?: string;
}

export type FlashcardBack = TermAnswer | DateAnswer | PersonalityAnswer;

export interface Flashcard {
  card_id: string;
  type: FlashcardType;
  front: string;
  back: FlashcardBack;
  priority_tier?: number;
  priority_label?: string;
  situation_ids?: string[];
  unit_id?: number;
}

export interface SituationElement {
  sub_title: string;
  points: string[];
}

export interface Situation {
  id: string;
  title: string;
  elements: SituationElement[];
}

export interface HistoryUnit {
  id: number;
  title: string;
  situations: Situation[];
}

export interface Term {
  id: string;
  term: string;
  unit: number;
  definition: string;
  priority_tier?: number;
  tier_info?: TierInfo;
  unit_id?: number;
  situation_ids?: string[];
  traps_to_avoid?: string;
  structured_rubric?: Record<string, RubricPart>;
  audit?: AuditInfo;
}

export interface ScoringCriteria {
  nationality: string;
  official_role: string;
  key_actions: string[];
}

export interface Personality {
  id: string;
  name: string;
  category: string;
  scoring_criteria: ScoringCriteria;
  exam_alert: string;
  related_terms: string[];
  related_dates: string[];
  priority_tier?: number;
  tier_info?: TierInfo;
  unit_ids?: number[];
  situation_ids?: string[];
  structured_rubric?: Record<string, RubricPart>;
  audit?: AuditInfo;
}

export interface ChronologyEvent {
  date: string;
  event: string;
  unit: number;
  priority_tier?: number;
  tier_info?: TierInfo;
  unit_id?: number;
  situation_id?: string;
  historical_significance?: string;
  audit?: AuditInfo;
}

export interface ArchiveDate {
  date: string;
  event: string;
}

export interface OfficialKeyPoints {
  introduction: string;
  question_1_points: string[];
  question_2_points: string[];
  conclusion: string;
}

export interface SubjectExam {
  part_1: {
    terms: string[];
    dates: ArchiveDate[];
    personalities: string[];
  };
  part_2_essay: {
    topic: string;
    questions: string[];
    official_key_points: OfficialKeyPoints;
  };
}

export interface BacArchive {
  year: number;
  session: string;
  subject_1: SubjectExam;
  subject_2: SubjectExam;
}

/* ---------- lesson wing (V5 flagship) ---------- */
export interface PedagogicalHook {
  problematic_narrative: string;
  key_question: string;
}

export interface WingElement {
  sub_title: string;
  pedagogical_objective?: string;
  points: string[];
}

export interface SourceAnalysisQuestion {
  question: string;
  [key: string]: unknown;
}

export interface SourceDocument {
  doc_id: string;
  title: string;
  type: string;
  author_or_source?: string;
  date_or_period?: string;
  content: string;
  analysis_questions?: SourceAnalysisQuestion[];
  [key: string]: unknown;
}

export interface ComprehensionCheck {
  id: string;
  type: string;
  question: string;
  intended_competency?: string;
  model_answer_bullets?: string[];
  common_misconception?: string;
  [key: string]: unknown;
}

export interface LessonWing {
  situation_id: string;
  unit_id: number;
  title: string;
  pedagogical_hook?: PedagogicalHook;
  core_learning_elements?: WingElement[];
  primary_source_documents?: SourceDocument[];
  causality_and_comprehension_checks?: ComprehensionCheck[];
  linked_terms_ids?: string[];
  linked_personalities_ids?: string[];
  linked_chronology_dates?: string[];
  linked_maps_ids?: string[];
  audit?: AuditInfo;
  [key: string]: unknown;
}

export interface HistoryDatabase {
  metadata: DatabaseMetadata;
  priority_tiers_guide?: PriorityTiersGuide;
  maps_cartography: MapCartography[];
  indirect_exam_questions: IndirectExamQuestion[];
  lesson_summaries: LessonSummary[];
  extended_definitions: CategoryDefinition[];
  flashcards: Flashcard[];
  units: HistoryUnit[];
  terms: Term[];
  personalities: Personality[];
  chronology: ChronologyEvent[];
  bac_archives: BacArchive[];
  lesson_wing?: LessonWing[];
}
