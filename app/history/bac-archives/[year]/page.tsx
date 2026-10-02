import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, PenLine } from "lucide-react";
import { getArchive, getArchives, getPersonalityByName } from "@/lib/history";
import type { SubjectExam } from "@/types/history";

export async function generateStaticParams(): Promise<{ year: string }[]> {
  return getArchives().map((a) => ({ year: String(a.year) }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  return { title: `بكالوريا ${year} | قسم التاريخ` };
}

function SubjectBlock({ subject, index }: { subject: SubjectExam; index: 1 | 2 }) {
  return (
    <section
      aria-label={`الموضوع ${index === 1 ? "الأول" : "الثاني"}`}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="border-b border-zinc-100 bg-zinc-50/70 px-5 py-3.5 font-black dark:border-zinc-800 dark:bg-zinc-900">
        الموضوع {index === 1 ? "الأول" : "الثاني"}: {subject.part_2_essay.topic}
      </h2>
      <div className="space-y-5 px-5 py-4">
        <div>
          <h3 className="text-sm font-black text-[#0F5132] dark:text-emerald-300">
            الجزء الأول — مصطلحات + تواريخ + شخصيات
          </h3>
          <div className="mt-2">
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">المصطلحات:</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {subject.part_1.terms.map((t) => (
                <Link
                  key={t}
                  href="/history/terms"
                  className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-200"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
          <ul className="mt-2 space-y-1.5">
            {subject.part_1.dates.map((d) => (
              <li key={d.date} className="flex flex-wrap items-baseline gap-2 text-sm">
                <span className="rounded-md bg-zinc-900 px-2 py-0.5 text-[11px] font-black text-white tabular-nums dark:bg-zinc-100 dark:text-zinc-900">
                  {d.date}
                </span>
                <span className="font-bold">{d.event}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">الشخصيات:</p>
            <ul className="mt-1 space-y-1">
              {subject.part_1.personalities.map((name) => {
                const p = getPersonalityByName(name);
                return (
                  <li key={name} className="text-sm">
                    <Link href="/history/personalities" className="font-bold hover:text-[#0F5132]">
                      {name}
                    </Link>
                    {p && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {" "}
                        — {p.scoring_criteria.official_role}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
          <h3 className="flex items-center gap-1.5 text-sm font-black">
            <PenLine className="size-4" />
            المقال: {subject.part_2_essay.topic}
          </h3>
          <ol className="mt-2 list-decimal space-y-1 pr-5 text-sm font-bold leading-7">
            {subject.part_2_essay.questions.map((q) => (
              <li key={q.slice(0, 32)}>{q}</li>
            ))}
          </ol>
          <h4 className="mt-3 text-xs font-black text-zinc-500 dark:text-zinc-400">
            النقاط الرسمية للتصحيح:
          </h4>
          <p className="mt-1 text-[13px] leading-7 text-zinc-600 dark:text-zinc-300">
            <span className="font-bold">المقدمة: </span>
            {subject.part_2_essay.official_key_points.introduction}
          </p>
          <ul className="mt-1.5 space-y-1">
            {subject.part_2_essay.official_key_points.question_1_points.map((pt) => (
              <li key={pt.slice(0, 32)} className="flex items-start gap-1.5 text-[13px] leading-6 text-zinc-600 dark:text-zinc-300">
                <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-emerald-600" />
                {pt}
              </li>
            ))}
            {subject.part_2_essay.official_key_points.question_2_points.map((pt) => (
              <li key={pt.slice(0, 32)} className="flex items-start gap-1.5 text-[13px] leading-6 text-zinc-600 dark:text-zinc-300">
                <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-emerald-600" />
                {pt}
              </li>
            ))}
          </ul>
          <p className="mt-1.5 text-[13px] leading-7 text-zinc-600 dark:text-zinc-300">
            <span className="font-bold">الخاتمة: </span>
            {subject.part_2_essay.official_key_points.conclusion}
          </p>
        </div>
      </div>
    </section>
  );
}

export default async function HistoryArchiveYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year } = await params;
  const archive = getArchive(Number(year));
  if (!archive) notFound();
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link
        href="/history/bac-archives"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
      >
        <ArrowRight className="size-4" />
        كل الدورات
      </Link>
      <h1 className="mt-4 text-2xl font-black tabular-nums sm:text-3xl">بكالوريا {archive.year}</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{archive.session}</p>
      <div className="mt-6 space-y-5">
        <SubjectBlock subject={archive.subject_1} index={1} />
        <SubjectBlock subject={archive.subject_2} index={2} />
      </div>
    </main>
  );
}
