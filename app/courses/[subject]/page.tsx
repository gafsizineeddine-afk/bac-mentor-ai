import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenText, PenLine } from "lucide-react";
import { getSubject } from "@/lib/data/subjects";
import { lessonsOf } from "@/lib/data/lessons";
import { questionsOf } from "@/lib/data/questions";
import { LessonList } from "@/components/courses/LessonList";

export async function generateStaticParams(): Promise<{ subject: string }[]> {
  return [{ subject: "HISTORY_GEOGRAPHY" }];
}

export default async function SubjectCoursePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  const meta = getSubject(subject);
  const lessons = lessonsOf(subject);
  const questions = questionsOf(subject);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FBFBFA] dark:bg-[#0F1115]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
          >
            <ArrowRight className="size-4" />
            كل الدروس
          </Link>
          <Link
            href={`/practice/${meta.key}/1`}
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#0F5132] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0a3a24]"
          >
            <PenLine className="size-4" />
            اختبر نفسك
          </Link>
        </div>

        <div className="mt-4">
          <p className="text-[11px] font-bold text-zinc-400">{meta.latinName}</p>
          <h1 className="text-2xl font-black sm:text-3xl">دروس {meta.arName}</h1>
          <p className="mt-2 text-sm text-zinc-500 tabular-nums dark:text-zinc-400">
            {lessons.length} دروس • {questions.length} أسئلة تطبيقية مصححة — علّم الدرس كمنجز لتتبع تقدمك
          </p>
        </div>

        <div className="mt-5">
          {meta.key === "HISTORY_GEOGRAPHY" && (
            <Link
              href="/history"
              className="focus-ring mb-4 flex items-center justify-between gap-3 rounded-2xl bg-[#0F5132] p-5 text-white shadow-md transition hover:bg-[#0a3a24]"
            >
              <span>
                <span className="block font-black">قاعدة التاريخ الاحترافية V5</span>
                <span className="mt-1 block text-[13px] leading-6 text-emerald-100">
                  8 دروس مفصلة • 41 مصطلحاً • 27 شخصية بسلم التنقيط • 65 تاريخاً • 6 خرائط • 133 بطاقة
                  مراجعة • أرشيف 2015–2026
                </span>
              </span>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15">
                <BookOpenText className="size-5" />
              </span>
            </Link>
          )}
          <LessonList lessons={lessons} accent={meta.accent} />
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-black">طبّق الدرس: أسئلة {meta.arName}</h2>
          <div className="mt-3 space-y-2">
            {questions.map((q) => (
              <Link
                key={q.id}
                href={`/practice/${meta.key}/${q.index}`}
                className="focus-ring flex items-center justify-between gap-3 rounded-xl border border-zinc-200 px-4 py-3 text-sm transition hover:border-[#0F5132] dark:border-zinc-800"
              >
                <span className="font-bold">
                  <span className="ml-2 text-zinc-400 tabular-nums">{q.index}.</span>
                  {q.prompt.length > 80 ? `${q.prompt.slice(0, 80)}…` : q.prompt}
                </span>
                <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-500 tabular-nums dark:bg-zinc-800 dark:text-zinc-300">
                  {q.points} {q.points > 2 ? "نقاط" : "نقطة"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
