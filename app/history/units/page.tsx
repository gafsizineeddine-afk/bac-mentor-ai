import Link from "next/link";
import { ArrowLeft, FileWarning, ListChecks, ScrollText } from "lucide-react";
import { getAllSituations, getIndirectQuestions, getLessonSummary, getUnits } from "@/lib/history";

export const metadata = {
  title: "الوحدات والدروس | قسم التاريخ",
  description: "الوحدات التعلمية الثلاث والوضعيات الثماني بالعناصر الكاملة والملخصات والأسئلة غير المباشرة",
};

export default function HistoryUnitsPage() {
  const units = getUnits();
  const situations = getAllSituations();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-black sm:text-3xl">الوحدات والدروس المفصلة</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
        {units.length} وحدات • {situations.length} وضعيات تعلمية — كل وضعية تشمل الدرس الكامل بالعناصر،
        ملخصاً مركزاً، والأسئلة غير المباشرة مع فخاخ الامتحان.
      </p>
      <div className="mt-6 space-y-6">
        {units.map((u) => (
          <section
            key={u.id}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 bg-zinc-50/60 p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="flex items-center gap-2.5 font-black">
                <span className="grid size-9 place-items-center rounded-xl bg-[#0F5132] text-sm font-black text-white tabular-nums">
                  {u.id}
                </span>
                {u.title}
              </h2>
              <Link
                href={`/history/units/${u.id}`}
                className="focus-ring inline-flex items-center gap-1 text-sm font-black text-[#0F5132] dark:text-emerald-300"
              >
                صفحة الوحدة
                <ArrowLeft className="size-4" />
              </Link>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {u.situations.map((s) => {
                const summary = getLessonSummary(u.id, s.id);
                const indirect = getIndirectQuestions(u.id, s.id);
                return (
                  <Link
                    key={s.id}
                    href={`/history/units/${u.id}/${s.id}`}
                    className="focus-ring group rounded-xl border border-zinc-200 p-4 transition hover:border-[#0F5132] hover:shadow-sm dark:border-zinc-800"
                  >
                    <h3 className="font-black leading-7 group-hover:text-[#0F5132] dark:group-hover:text-emerald-300">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
                      {s.elements.length} عناصر • {s.elements.reduce((n, e) => n + e.points.length, 0)} نقطة
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-bold">
                      {summary && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          <ScrollText className="size-3" />
                          ملخص مركز
                        </span>
                      )}
                      {indirect.length > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                          <FileWarning className="size-3" />
                          {indirect[0]?.deceptive_phrasings.length ?? 0} أسئلة غير مباشرة
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                        <ListChecks className="size-3" />
                        درس كامل
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
