import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileWarning, Lightbulb, ScrollText, Siren } from "lucide-react";
import { getAllSituations, getIndirectQuestions, getLessonSummary, getLessonWing, getSituation, getUnit } from "@/lib/history";
import { LessonWingSection } from "@/components/history/LessonWingSection";

export async function generateStaticParams(): Promise<{ unitId: string; situationId: string }[]> {
  return getAllSituations().map(({ unit, situation }) => ({
    unitId: String(unit.id),
    situationId: situation.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unitId: string; situationId: string }>;
}) {
  const { unitId, situationId } = await params;
  const situation = getSituation(Number(unitId), situationId);
  return { title: situation ? `${situation.title} | قسم التاريخ` : "الدرس | قسم التاريخ" };
}

export default async function HistorySituationPage({
  params,
}: {
  params: Promise<{ unitId: string; situationId: string }>;
}) {
  const { unitId, situationId } = await params;
  const unit = getUnit(Number(unitId));
  const situation = getSituation(Number(unitId), situationId);
  if (!unit || !situation) notFound();
  const summary = getLessonSummary(unit.id, situation.id);
  const indirect = getIndirectQuestions(unit.id, situation.id);
  const wing = getLessonWing(unit.id, situation.id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href={`/history/units/${unit.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
        >
          <ArrowRight className="size-4" />
          {unit.title.split(":")[0]}
        </Link>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 tabular-nums dark:bg-emerald-950 dark:text-emerald-300">
          الوضعية {situation.id}
        </span>
      </div>

      <h1 className="mt-4 text-2xl font-black leading-snug sm:text-3xl">{situation.title}</h1>

      {/* full lesson elements */}
      <section aria-label="الدرس الكامل" className="mt-6 space-y-4">
        {situation.elements.map((el, i) => (
          <article
            key={el.sub_title}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="flex items-center gap-2.5 border-b border-zinc-100 bg-zinc-50/70 px-5 py-3.5 font-black leading-7 dark:border-zinc-800 dark:bg-zinc-900">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#0F5132] text-xs font-black text-white tabular-nums">
                {i + 1}
              </span>
              {el.sub_title}
            </h2>
            <ul className="space-y-2.5 px-5 py-4">
              {el.points.map((pt) => (
                <li key={pt.slice(0, 32)} className="flex items-start gap-2 text-[15px] leading-8 text-zinc-700 dark:text-zinc-200">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#C9A227]" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {/* lesson wing (V5 pedagogical engine) */}
      {wing && <LessonWingSection wing={wing} />}

      {/* condensed summary */}
      {summary && (
        <section
          aria-label="الملخص المركز"
          className="mt-6 overflow-hidden rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/30"
        >
          <h2 className="flex items-center gap-2 border-b border-emerald-200/70 px-5 py-3.5 font-black dark:border-emerald-900">
            <ScrollText className="size-5 text-[#0F5132] dark:text-emerald-300" />
            {summary.title}
          </h2>
          <div className="px-5 py-4">
            <p className="rounded-xl bg-white p-4 text-[15px] font-bold leading-8 text-emerald-900 dark:bg-zinc-900 dark:text-emerald-100">
              الفكرة المحورية: {summary.key_concept}
            </p>
            <ul className="mt-3 space-y-2">
              {summary.core_ideas.map((idea) => (
                <li key={idea.slice(0, 32)} className="flex items-start gap-2 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0F5132]" aria-hidden="true" />
                  {idea}
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm leading-7 text-amber-900 dark:bg-amber-950/50 dark:text-amber-100">
              <Lightbulb className="mt-1 size-4 shrink-0" />
              <span>
                <span className="font-black">نصيحة البكالوريا: </span>
                {summary.bac_exam_tips}
              </span>
            </p>
          </div>
        </section>
      )}

      {/* indirect questions + traps */}
      {indirect.map((q) => (
        <section
          key={`${q.unit}-${q.situation_id}-${q.standard_topic}`}
          aria-label="الأسئلة غير المباشرة"
          className="mt-6 overflow-hidden rounded-2xl border-2 border-amber-200 bg-white dark:border-amber-900 dark:bg-zinc-900"
        >
          <h2 className="flex items-center gap-2 border-b border-amber-200/70 bg-amber-50/60 px-5 py-3.5 font-black dark:border-amber-900 dark:bg-amber-950/30">
            <FileWarning className="size-5 text-amber-600 dark:text-amber-400" />
            أسئلة غير مباشرة: {q.standard_topic}
          </h2>
          <div className="space-y-4 px-5 py-4">
            {q.deceptive_phrasings.map((d) => (
              <article key={d.bac_question.slice(0, 32)} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="font-bold leading-8 text-zinc-900 dark:text-zinc-100">«{d.bac_question}»</p>
                <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                  <span className="font-black text-[#0F5132] dark:text-emerald-300">المقصود: </span>
                  {d.intended_concept}
                </p>
                <p className="mt-2 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm leading-7 text-red-800 dark:bg-red-950/40 dark:text-red-200">
                  <Siren className="mt-1 size-4 shrink-0" />
                  <span>
                    <span className="font-black">فخ الامتحان: </span>
                    {d.traps_to_avoid}
                  </span>
                </p>
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* cross links */}
      <nav aria-label="روابط ذات صلة" className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { href: "/history/terms", label: "راجع المصطلحات" },
          { href: "/history/personalities", label: "راجع الشخصيات" },
          { href: "/history/chronology", label: "راجع التواريخ" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="focus-ring rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-bold transition hover:border-[#0F5132] dark:border-zinc-800 dark:bg-zinc-900"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
