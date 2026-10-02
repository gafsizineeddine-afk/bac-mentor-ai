import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDatabase } from "@/lib/history";
import { KnowledgeDuel } from "./KnowledgeDuel";

export interface DuelQuestion {
  id: string;
  unit: number;
  situationId: string;
  topic: string;
  question: string;
  correctConcept: string;
  trap: string;
}

export const metadata = {
  title: "مبارزة المزايدة المعرفية | الألعاب",
  description: "لعبة مزايدة ثنائية على الأسئلة غير المباشرة في التاريخ — زايد، أجب، وتفادَ الفخاخ",
};

export default function KnowledgeDuelPage() {
  const db = getDatabase();
  const questions: DuelQuestion[] = db.indirect_exam_questions.flatMap((entry, ei) =>
    entry.deceptive_phrasings.map((d, di) => ({
      id: `DUEL-${entry.unit}-${entry.situation_id}-${di + 1}-${ei}`,
      unit: entry.unit,
      situationId: entry.situation_id,
      topic: entry.standard_topic,
      question: d.bac_question,
      correctConcept: d.intended_concept,
      trap: d.traps_to_avoid,
    }))
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#FBFBFA] dark:bg-[#0F1115]">
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/games"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
          >
            <ArrowRight className="size-4" />
            كل الألعاب
          </Link>
          <Link
            href="/history/units"
            className="text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
          >
            راجع الدروس أولاً
          </Link>
        </div>
        <h1 className="mt-4 text-2xl font-black sm:text-3xl">مبارزة المزايدة المعرفية</h1>
        <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
          {questions.length} سؤالاً غير مباشر من بنك الامتحانات — زايدا بالنقاط، ثم أجب متجنباً الفخ
          الوزاري. أعلى رصيد يفوز!
        </p>
        <div className="mt-5">
          <KnowledgeDuel questions={questions} />
        </div>
      </main>
    </div>
  );
}
