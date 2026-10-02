import type { SubjectKey } from "./subjects";

export interface ExamPaper {
  id: string;
  subject: SubjectKey;
  year: number;
  session: "الدورة العادية" | "الدورة الاستثنائية";
  topic: "الموضوع الأول" | "الموضوع الثاني";
  title: string;
  questionIds: string[];
  durationMin: number;
}

const P = (
  id: string,
  subject: SubjectKey,
  year: number,
  session: ExamPaper["session"],
  topic: ExamPaper["topic"],
  title: string,
  questionIds: string[],
  durationMin: number
): ExamPaper => ({ id, subject, year, session, topic, title, questionIds, durationMin });

/**
 * أوراق تدريبية بنمط مواضيع البكالوريا — مبنية من بنك الأسئلة التفاعلي.
 * (محاكاة منهجية للتدريب، وليست نسخاً حرفياً لأوراق ONEC.)
 */
export const EXAM_PAPERS: ExamPaper[] = [
  P("bac2024-hg-1", "HISTORY_GEOGRAPHY", 2024, "الدورة العادية", "الموضوع الأول",
    "الحركة الوطنية والثورة", ["hg-1", "hg-2", "hg-3", "hg-6", "hg-8"], 150),
  P("bac2024-hg-2", "HISTORY_GEOGRAPHY", 2024, "الدورة العادية", "الموضوع الثاني",
    "الشخصيات والمنهجية", ["hg-4", "hg-5", "hg-7", "hg-1", "hg-3"], 150),
];

export function papersOf(subject: string): ExamPaper[] {
  return EXAM_PAPERS.filter((p) => p.subject === subject).sort((a, b) => b.year - a.year);
}

export function findPaper(paperId: string): ExamPaper | undefined {
  return EXAM_PAPERS.find((p) => p.id === paperId);
}
