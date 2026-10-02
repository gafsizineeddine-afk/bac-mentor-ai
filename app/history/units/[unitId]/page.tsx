import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FileWarning, ScrollText } from "lucide-react";
import { getIndirectQuestions, getLessonSummary, getUnit, getUnits } from "@/lib/history";

export async function generateStaticParams(): Promise<{ unitId: string }[]> {
  return getUnits().map((u) => ({ unitId: String(u.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  const unit = getUnit(Number(unitId));
  return { title: unit ? `${unit.title} | قسم التاريخ` : "الوحدة | قسم التاريخ" };
}

export default async function HistoryUnitPage({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  const unit = getUnit(Number(unitId));
  if (!unit) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/history/units"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
      >
        <ArrowRight className="size-4" />
        كل الوحدات
      </Link>
      <h1 className="mt-4 text-2xl font-black leading-snug sm:text-3xl">{unit.title}</h1>
      <p className="mt-2 text-sm text-zinc-500 tabular-nums dark:text-zinc-400">
        {unit.situations.length} وضعيات تعلمية
      </p>
      <div className="mt-6 space-y-4">
        {unit.situations.map((s, i) => {
          const summary = getLessonSummary(unit.id, s.id);
          const indirect = getIndirectQuestions(unit.id, s.id);
          return (
            <Link
              key={s.id}
              href={`/history/units/${unit.id}/${s.id}`}
              className="focus-ring block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-[#0F5132] hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-[#0F5132] tabular-nums dark:text-emerald-300">
                    الوضعية {i + 1} • {s.id}
                  </p>
                  <h2 className="mt-1 font-black leading-8">{s.title}</h2>
                </div>
                <ArrowLeft className="mt-1 size-5 shrink-0 text-zinc-300" />
              </div>
              <ul className="mt-3 space-y-1.5">
                {s.elements.map((e) => (
                  <li key={e.sub_title} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0F5132]" aria-hidden="true" />
                    {e.sub_title}
                    <span className="text-xs text-zinc-400 tabular-nums">({e.points.length})</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-bold">
                {summary && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <ScrollText className="size-3" />
                    ملخص مركز
                  </span>
                )}
                {indirect.length > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    <FileWarning className="size-3" />
                    أسئلة غير مباشرة
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
