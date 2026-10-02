import Link from "next/link";
import { ArrowLeft, ArrowRight, Timer } from "lucide-react";
import { getSubject } from "@/lib/data/subjects";
import { EXAM_PAPERS, findPaper } from "@/lib/data/exams";
import { findQuestionById } from "@/lib/data/questions";

export async function generateStaticParams(): Promise<{ paperId: string }[]> {
  return EXAM_PAPERS.map((p) => ({ paperId: p.id }));
}

export default async function ExamPaperPage({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) {
  const { paperId } = await params;
  const paper = findPaper(paperId);

  if (!paper) {
    return (
      <div dir="rtl" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-xl font-black">الورقة غير موجودة</p>
        <Link href="/exams" className="mt-4 inline-block font-bold text-[#0F5132]">
          عودة للأوراق
        </Link>
      </div>
    );
  }

  const meta = getSubject(paper.subject);
  const questions = paper.questionIds
    .map((id) => findQuestionById(id))
    .filter((q) => q !== undefined);
  const totalPts = questions.reduce((acc, q) => acc + q.points, 0);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FBFBFA] dark:bg-[#0F1115]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          href="/exams"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
        >
          <ArrowRight className="size-4" />
          كل الأوراق
        </Link>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="absolute inset-x-0 top-0 h-1" style={{ background: meta.accent }} aria-hidden="true" />
          <p className="text-xs font-black text-zinc-400 tabular-nums">
            بكالوريا {paper.year} • {paper.session} • {paper.topic}
          </p>
          <h1 className="mt-1 text-2xl font-black">{meta.arName}: {paper.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <Timer className="size-4" />
            <span className="tabular-nums">
              {questions.length} أسئلة • المجموع {totalPts} نقاط • المدة المقترحة {paper.durationMin} دقيقة
            </span>
          </p>
          <p className="mt-2 text-xs leading-6 text-zinc-400">
            نصيحة الامتحان: أجب عن الأسئلة بالترتيب وبمؤقت، ثم صحح كل إجابة على حدة.
          </p>
        </div>

        <div className="mt-4 space-y-3">
          {questions.map((q, i) => (
            <Link
              key={q.id}
              href={`/practice/${meta.key}/${q.index}`}
              className="focus-ring flex items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-[#0F5132] dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <p className="text-xs font-black text-zinc-400">
                  السؤال {i + 1} • {q.type} • <span className="tabular-nums">{q.points} {q.points > 2 ? "نقاط" : "نقطة"}</span>
                </p>
                <p className="mt-1.5 font-bold leading-8">
                  {q.prompt.length > 120 ? `${q.prompt.slice(0, 120)}…` : q.prompt}
                </p>
              </div>
              <span
                className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-xl px-4 py-2 text-sm font-bold text-white"
                style={{ background: meta.accent }}
              >
                أجب
                <ArrowLeft className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
