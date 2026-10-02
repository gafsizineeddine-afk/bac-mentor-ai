import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, Timer } from "lucide-react";
import { SUBJECTS, getSubject } from "@/lib/data/subjects";
import { EXAM_PAPERS } from "@/lib/data/exams";
import { findQuestionById } from "@/lib/data/questions";

export const metadata = {
  title: "أوراق بنمط البكالوريا | BAC Mentor AI",
  description: "أوراق تدريبية بنمط مواضيع البكالوريا في التاريخ والجغرافيا",
};

export default function ExamsPage() {
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

        <div className="mt-4">
          <h1 className="text-2xl font-black sm:text-3xl">أوراق بنمط البكالوريا</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
            أوراق تدريبية تحاكي منهجية مواضيع البكالوريا — كل سؤال فيها تفاعلي ومصحح فورياً.
            (محاكاة للتدريب، وليست نسخاً رسمية لأوراق ONEC.)
          </p>
        </div>

        <div className="mt-6 space-y-8">
          {SUBJECTS.map((s) => {
            const papers = EXAM_PAPERS.filter((p) => p.subject === s.key);
            const meta = getSubject(s.key);
            return (
              <section key={s.key}>
                <h2 className="flex items-center gap-2 font-black">
                  <span className="size-2.5 rounded-full" style={{ background: meta.accent }} />
                  {meta.arName}
                </h2>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {papers.map((p) => {
                    const totalPts = p.questionIds.reduce(
                      (acc, id) => acc + (findQuestionById(id)?.points ?? 0),
                      0
                    );
                    return (
                      <Link
                        key={p.id}
                        href={`/exams/${p.id}`}
                        className="focus-ring group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="grid size-11 place-items-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                            <FileText className="size-5" />
                          </span>
                          <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-500 tabular-nums dark:bg-zinc-800 dark:text-zinc-300">
                            بكالوريا {p.year} • {p.session}
                          </span>
                        </div>
                        <h3 className="mt-3 font-black">{p.topic}: {p.title}</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-400">
                          <Timer className="size-3.5" />
                          <span className="tabular-nums">
                            {p.questionIds.length} أسئلة • {totalPts} نقاط • {p.durationMin} دقيقة
                          </span>
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-black transition group-hover:gap-2" style={{ color: meta.accent }}>
                          ابدأ الورقة
                          <ArrowLeft className="size-4" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
