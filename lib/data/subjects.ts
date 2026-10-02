export type SubjectKey = "HISTORY_GEOGRAPHY";

export interface SubjectMeta {
  key: SubjectKey;
  arName: string;
  latinName: string;
  description: string;
  questionCount: number;
  totalPoints: number;
  accent: string;
  softBg: string;
}

export const SUBJECTS: SubjectMeta[] = [
  {
    key: "HISTORY_GEOGRAPHY",
    arName: "التاريخ والجغرافيا",
    latinName: "History & Geography",
    description: "الشخصيات، التواريخ، التوقيع على الخرائط والتعليق على الجداول بالمنهجية الرسمية.",
    questionCount: 8,
    totalPoints: 20,
    accent: "#0EA5E9",
    softBg: "bg-sky-50 dark:bg-sky-950/40",
  },
];

export function getSubject(key: string): SubjectMeta {
  const found = SUBJECTS.find((s) => s.key === key);
  return found ?? SUBJECTS[0] as SubjectMeta;
}
