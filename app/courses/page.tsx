import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import { SUBJECTS } from "@/lib/data/subjects";
import { lessonCount } from "@/lib/data/lessons";
import { questionsOf } from "@/lib/data/questions";

export const metadata = {
  title: "الدروس | BAC Mentor AI",
  description: "دروس وملخصات مادة التاريخ والجغرافيا للبكالوريا",
};

export default function CoursesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#FBFBFA] dark:bg-[#0F1115]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
        >
          <ArrowRight className="size-4" />
          عودة للرئيسية
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#0F5132] text-white shadow-lg shadow-emerald-900/20">
            <GraduationCap className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-black sm:text-3xl">مكتبة الدروس والملخصات</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              دروس مركزة + أسئلة تطبيقية مصححة — التاريخ والجغرافيا
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {SUBJECTS.map((s) => {
            const lessons = lessonCount(s.key);
            const questions = questionsOf(s.key);
            return (
              <div
                key={s.key}
                className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: s.accent }} aria-hidden="true" />
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold text-zinc-400">{s.latinName}</p>
                    <h2 className="text-xl font-black">{s.arName}</h2>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600 tabular-nums dark:bg-zinc-800 dark:text-zinc-300">
                    {lessons} دروس • {questions.length} أسئلة
                  </span>
                </div>
                <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">{s.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/courses/${s.key}`}
                    className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#0F5132] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0a3a24]"
                  >
                    <BookOpen className="size-4" />
                    تصفح الدروس
                  </Link>
                  <Link
                    href={`/practice/${s.key}/1`}
                    className="focus-ring inline-flex items-center gap-2 rounded-xl border-2 border-zinc-200 px-5 py-2.5 text-sm font-bold transition hover:border-[#0F5132] dark:border-zinc-700"
                  >
                    ابدأ الأسئلة
                    <ArrowLeft className="size-4" />
                  </Link>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-400">
                  <Clock className="size-3.5" />
                  <span className="tabular-nums">متوسط الدرس 30 دقيقة — مراجعة يومية تكفي</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
