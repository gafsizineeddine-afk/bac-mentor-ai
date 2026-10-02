import type { SubjectKey } from "./subjects";
import type { GradingMode } from "@/lib/grading/engines";

export interface BankQuestion {
  id: string;
  subject: SubjectKey;
  index: number;
  type: string;
  prompt: string;
  points: number;
  officialCorrection: string;
  tip: string;
  grading: GradingMode;
  keywords: string[];
}

const Q = (
  id: string,
  subject: SubjectKey,
  index: number,
  type: string,
  prompt: string,
  points: number,
  officialCorrection: string,
  tip: string,
  grading: GradingMode,
  keywords: string[]
): BankQuestion => ({ id, subject, index, type, prompt, points, officialCorrection, tip, grading, keywords });

export const QUESTION_BANK: BankQuestion[] = [
  // ---------- التاريخ والجغرافيا ----------
  Q("hg-1", "HISTORY_GEOGRAPHY", 1, "تعريف شخصية",
    "عرّف الشخصية التاريخية التالية: مصالي الحاج (1898–1974).",
    1, "زعيم وطني جزائري، مؤسس حزب الشعب الجزائري (1937)، رائد الحركة الوطنية وأب الوطنية الجزائرية.",
    "الاسم + الدور/المنصب + أهم إنجاز + التاريخ إن أمكن.",
    "keywords", ["مصالي الحاج", "حزب الشعب", "1937", "الحركة الوطنية"]),
  Q("hg-2", "HISTORY_GEOGRAPHY", 2, "حدث تاريخي",
    "حدّد الحدث المرتبط بالتاريخ التالي: 1 نوفمبر 1954.",
    1, "اندلاع الثورة التحريرية الجزائرية الكبرى (أول نوفمبر 1954).",
    "التاريخ الدقيق + اسم الحدث الكامل.",
    "keywords", ["الثورة التحريرية", "أول نوفمبر", "1954"]),
  Q("hg-3", "HISTORY_GEOGRAPHY", 3, "تحليل حدث",
    "اذكر أهم نتائج مؤتمر الصومام (20 أوت 1956).",
    2, "توحيد القيادة (لجنة التنسيق والتنفيذ)، تنظيم الجيش (الولايات)، مبدأ القيادة الجماعية وأولوية الداخل على الخارج.",
    "رتّب إجابتك: سياسياً / عسكرياً / تنظيمياً.",
    "keywords", ["الصومام", "لجنة التنسيق", "الولايات", "القيادة الجماعية"]),
  Q("hg-4", "HISTORY_GEOGRAPHY", 4, "توقيع على خريطة",
    "على خريطة الجزائر: وقّع ثلاث ولايات تاريخية للثورة (الأوراس، القبائل، الشمال القسنطيني) مع تسميتها.",
    2, "الولاية الأولى: الأوراس (مصطفى بن بولعيد). الثانية: القبائل (كريم بلقاسم). الثالثة: الشمال القسنطيني (ديدوش مراد).",
    "الموقع الصحيح + التسمية والقائد.",
    "keywords", ["الأوراس", "القبائل", "الشمال القسنطيني"]),
  Q("hg-5", "HISTORY_GEOGRAPHY", 5, "تعليق على جدول",
    "جدول يمثل تطور الإنتاج الزراعي الجزائري (2000–2020). علّق عليه في ثلاثة أسطر وفق المنهجية.",
    2, "ملاحظة عامة (تطور/تذبذب)، تفسير بالأسباب (الدعم الفلاحي، الجفاف)، استنتاج (ضرورة الأمن الغذائي).",
    "المنهجية الثلاثية: ملاحظة → تفسير → استنتاج.",
    "keywords", ["ملاحظة", "تفسير", "استنتاج"]),
  Q("hg-6", "HISTORY_GEOGRAPHY", 6, "تعريف شخصية",
    "عرّف الشخصية التاريخية التالية: العربي بن مهيدي (1923–1957).",
    1, "مناضل جزائري من مجموعة الـ22، قائد الولاية الخامسة (وهران)، شهيد الثورة، استشهد تحت التعذيب سنة 1957.",
    "الدور + الولاية/المنصب + سنة الاستشهاد.",
    "keywords", ["العربي بن مهيدي", "مجموعة 22", "الشهيد", "1957"]),
  Q("hg-7", "HISTORY_GEOGRAPHY", 7, "حدث تاريخي",
    "حدّد الحدث المرتبط بالتاريخ التالي: 20 أوت 1955.",
    1, "هجومات الشمال القسنطيني بقيادة ديدوش مراد.",
    "التاريخ + اسم الحدث + القائد.",
    "keywords", ["هجومات", "الشمال القسنطيني", "ديدوش مراد"]),
  Q("hg-8", "HISTORY_GEOGRAPHY", 8, "تحليل أسباب",
    "اذكر سببين من أسباب اندلاع الثورة التحريرية الكبرى.",
    2, "القمع الاستعماري والتمييز، تدهور الأوضاع الاقتصادية والاجتماعية، نمو الوعي الوطني، فشل العمل السلمي.",
    "سبب سياسي + سبب اقتصادي/اجتماعي = إجابة متوازنة.",
    "keywords", ["القمع", "التمييز", "الوعي الوطني", "فشل"]),
];

export function questionsOf(subject: string): BankQuestion[] {
  return QUESTION_BANK.filter((q) => q.subject === subject).sort((a, b) => a.index - b.index);
}

export function findQuestionById(questionId: string): BankQuestion | undefined {
  return QUESTION_BANK.find((q) => q.id === questionId);
}

export function getQuestion(
  subject: string,
  questionId: string
): { question: BankQuestion; index: number; total: number } {
  const list = questionsOf(subject);
  const total = list.length > 0 ? list.length : 1;
  const byId = findQuestionById(questionId);
  if (byId && byId.subject === subject) {
    return { question: byId, index: byId.index, total };
  }
  const parsed = Number.parseInt(questionId, 10);
  const safe = Number.isNaN(parsed) ? 1 : Math.min(Math.max(parsed, 1), total);
  const fallback: BankQuestion = {
    id: `${subject}-${safe}`,
    subject: (subject as SubjectKey) || "HISTORY_GEOGRAPHY",
    index: safe,
    type: "تدريب حر",
    prompt: "اكتب إجابتك وسيتم تصحيحها وفق معايير ONEC الوزارية.",
    points: 1,
    officialCorrection: "راجع التصحيح الرسمي لموضوع البكالوريا المعني.",
    tip: "اذكر العناصر الأساسية: الأسماء والتواريخ والأماكن بدقة.",
    grading: "keywords",
    keywords: [],
  };
  return { question: list[safe - 1] ?? fallback, index: safe, total };
}
