import { validateRulingVsBenefit } from "./islamic-sciences.engine";
import { essayStructureScore, keywordScore, normalizeArabic, round2 } from "./arabic";
import type { BankQuestion } from "@/lib/data/questions";

export type GradingMode = "ruling" | "keywords" | "essay" | "arabic";

export interface GradeBreakdown {
  mode: GradingMode;
  matchedKeywords?: string[];
  missingKeywords?: string[];
  criteria?: { label: string; present: boolean }[];
}

export interface EngineGrade {
  awarded: number;
  maxScore: number;
  feedback: string;
  deductionReason: string | null;
  breakdown: GradeBreakdown;
}

function inferMode(q: BankQuestion | undefined, _subject: string): GradingMode {
  if (q?.grading) return q.grading;
  return "keywords";
}

function gradeRuling(answer: string, maxScore: number): EngineGrade {
  const { isRuling } = validateRulingVsBenefit(answer);
  const awarded = isRuling ? maxScore : 0;
  return {
    awarded,
    maxScore,
    feedback: isRuling
      ? "حكم شرعي صحيح — يبدأ بلفظ الحكم الوزاري."
      : "خطأ: الحكم يجب أن يبدأ بـ وجوب / تحريم / استحباب / كراهة / جواز.",
    deductionReason: isRuling ? null : "عدم بدء الجملة بلفظ الحكم",
    breakdown: { mode: "ruling" },
  };
}

function gradeKeywords(answer: string, q: BankQuestion | undefined, maxScore: number): EngineGrade {
  const keywords = q?.keywords ?? [];
  if (keywords.length === 0 || normalizeArabic(answer).length < 3) {
    return {
      awarded: 0,
      maxScore,
      feedback: "إجابة فارغة أو قصيرة جداً — اذكر العناصر الأساسية المطلوبة في السؤال.",
      deductionReason: "غياب العناصر الأساسية",
      breakdown: { mode: "keywords", matchedKeywords: [], missingKeywords: keywords },
    };
  }
  const { score, matched, missing } = keywordScore(answer, keywords, maxScore);
  const full = missing.length === 0;
  return {
    awarded: score,
    maxScore,
    feedback: full
      ? `إجابة كاملة — تضمنت كل العناصر الأساسية (${matched.length}/${matched.length + missing.length}).`
      : `إجابة جزئية — وُجد ${matched.length} من ${matched.length + missing.length} عناصر. ينقص: ${missing.join("، ")}.`,
    deductionReason: full ? null : `عناصر ناقصة: ${missing.join("، ")}`,
    breakdown: { mode: "keywords", matchedKeywords: matched, missingKeywords: missing },
  };
}

function gradeEssay(answer: string, q: BankQuestion | undefined, maxScore: number): EngineGrade {
  const norm = normalizeArabic(answer);
  if (norm.length < 10) {
    return {
      awarded: 0,
      maxScore,
      feedback: "الإجابة فارغة — المقالة الفلسفية تتطلب بناءً من ثلاث مراحل على الأقل.",
      deductionReason: "غياب البناء المنهجي",
      breakdown: { mode: "essay", criteria: [] },
    };
  }
  const { score, criteria, longEnough } = essayStructureScore(answer, maxScore);
  // Bonus for mentioning expected key terms (up to +10%, capped at maxScore).
  let bonus = 0;
  const matched: string[] = [];
  for (const kw of q?.keywords ?? []) {
    if (norm.includes(normalizeArabic(kw))) matched.push(kw);
  }
  if ((q?.keywords?.length ?? 0) > 0 && matched.length > 0) {
    bonus = round2(Math.min(maxScore * 0.1, (maxScore * 0.1 * matched.length) / (q?.keywords?.length ?? 1)));
  }
  const awarded = Math.min(maxScore, round2(score + bonus));
  const present = criteria.filter((c) => c.present).map((c) => c.label);
  const absent = criteria.filter((c) => !c.present).map((c) => c.label);
  return {
    awarded,
    maxScore,
    feedback:
      absent.length === 0
        ? `بناء منهجي مكتمل (${present.join("، ")})${longEnough ? "" : " — لكن الإجابة قصيرة، وسّع التحليل"}.`
        : `بنية جزئية — متوفر: ${present.length > 0 ? present.join("، ") : "لا شيء"}. ينقص: ${absent.join("، ")}.`,
    deductionReason: absent.length === 0 ? null : `غياب مراحل منهجية: ${absent.join("، ")}`,
    breakdown: {
      mode: "essay",
      matchedKeywords: matched,
      criteria: criteria.map((c) => ({ label: c.label, present: c.present })),
    },
  };
}

function gradeArabic(answer: string, q: BankQuestion | undefined, maxScore: number): EngineGrade {
  // Arabic answers: keyword core (70%) + minimal length/structure (30%).
  const keywords = q?.keywords ?? [];
  const kw = keywordScore(answer, keywords, round2(maxScore * 0.7));
  const normLen = normalizeArabic(answer).length;
  const structureBonus = normLen >= 60 ? round2(maxScore * 0.3) : normLen >= 20 ? round2(maxScore * 0.15) : 0;
  const awarded = Math.min(maxScore, round2(kw.score + structureBonus));
  const full = awarded >= maxScore;
  return {
    awarded,
    maxScore,
    feedback: full
      ? "إجابة وافية — المصطلحات الدقيقة حاضرة مع شرح كافٍ."
      : `وجد ${kw.matched.length} من ${kw.matched.length + kw.missing.length} مصطلحات. ${kw.missing.length > 0 ? `ينقص: ${kw.missing.join("، ")}.` : ""} ${structureBonus === 0 ? "والشرح قصير جداً." : ""}`,
    deductionReason: full ? null : "نقص في المصطلحات أو في الشرح",
    breakdown: { mode: "arabic", matchedKeywords: kw.matched, missingKeywords: kw.missing },
  };
}

export function gradeAnswer(answer: string, question: BankQuestion | undefined, subject: string): EngineGrade {
  const maxScore = question?.points ?? 1;
  const mode = inferMode(question, subject);
  switch (mode) {
    case "ruling":
      return gradeRuling(answer, maxScore);
    case "essay":
      return gradeEssay(answer, question, maxScore);
    case "arabic":
      return gradeArabic(answer, question, maxScore);
    case "keywords":
    default:
      return gradeKeywords(answer, question, maxScore);
  }
}
