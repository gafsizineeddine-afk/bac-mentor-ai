import Link from "next/link";
import {
  BookOpenCheck,
  FileText,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  Link2,
  Quote,
  Target,
} from "lucide-react";
import { getMap, getPersonalityById, getTermById } from "@/lib/history";
import type { LessonWing } from "@/types/history";

export function LessonWingSection({ wing }: { wing: LessonWing }) {
  const linkedTerms = (wing.linked_terms_ids ?? [])
    .map((id) => getTermById(id))
    .filter((t) => t !== undefined);
  const linkedPersonalities = (wing.linked_personalities_ids ?? [])
    .map((id) => getPersonalityById(id))
    .filter((p) => p !== undefined);
  const linkedMaps = (wing.linked_maps_ids ?? [])
    .map((id) => getMap(id))
    .filter((m) => m !== undefined);
  const hasLinks =
    linkedTerms.length > 0 ||
    linkedPersonalities.length > 0 ||
    (wing.linked_chronology_dates?.length ?? 0) > 0 ||
    linkedMaps.length > 0;

  return (
    <section
      aria-label="جناح الدرس البيداغوجي"
      className="mt-6 overflow-hidden rounded-2xl border-2 border-[#0F5132]/30 bg-white shadow-sm dark:border-emerald-900 dark:bg-zinc-900"
    >
      <h2 className="flex items-center gap-2 bg-[#0F5132] px-5 py-3.5 font-black text-white">
        <BookOpenCheck className="size-5" />
        جناح الدرس: {wing.title}
      </h2>

      {wing.pedagogical_hook && (
        <div className="border-b border-dashed border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <p className="text-[15px] leading-8 text-zinc-700 dark:text-zinc-200">
            {wing.pedagogical_hook.problematic_narrative}
          </p>
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-[15px] font-bold leading-8 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
            <HelpCircle className="mt-1 size-5 shrink-0" />
            {wing.pedagogical_hook.key_question}
          </p>
        </div>
      )}

      {(wing.core_learning_elements?.length ?? 0) > 0 && (
        <div className="border-b border-dashed border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h3 className="flex items-center gap-1.5 text-sm font-black">
            <Target className="size-4 text-[#0F5132] dark:text-emerald-300" />
            العناصر التعلمية الأساسية بأهدافها
          </h3>
          <div className="mt-3 space-y-3">
            {wing.core_learning_elements?.map((el) => (
              <article key={el.sub_title.slice(0, 32)} className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
                <p className="font-black leading-7">{el.sub_title}</p>
                {el.pedagogical_objective && (
                  <p className="mt-1 text-xs leading-6 text-[#0F5132] dark:text-emerald-300">
                    <span className="font-black">الهدف: </span>
                    {el.pedagogical_objective}
                  </p>
                )}
                <ul className="mt-2 space-y-1.5">
                  {el.points.map((pt) => (
                    <li key={pt.slice(0, 32)} className="flex items-start gap-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C9A227]" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}

      {(wing.primary_source_documents?.length ?? 0) > 0 && (
        <div className="border-b border-dashed border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h3 className="flex items-center gap-1.5 text-sm font-black">
            <FileText className="size-4 text-[#0F5132] dark:text-emerald-300" />
            وثائق المصدر الأول ({wing.primary_source_documents?.length})
          </h3>
          <div className="mt-3 space-y-3">
            {wing.primary_source_documents?.map((doc) => (
              <article key={doc.doc_id} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
                <p className="font-black leading-7">{doc.title}</p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  {[doc.author_or_source, doc.date_or_period, doc.type].filter(Boolean).join(" • ")}
                </p>
                <blockquote className="mt-2 rounded-lg bg-zinc-50 p-3 text-sm leading-7 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200">
                  <Quote className="mb-1 size-4 text-zinc-400" aria-hidden="true" />
                  {doc.content.length > 600 ? `${doc.content.slice(0, 600)}…` : doc.content}
                </blockquote>
                {(doc.analysis_questions?.length ?? 0) > 0 && (
                  <ul className="mt-2 space-y-1">
                    {doc.analysis_questions?.map((q, i) => (
                      <li key={`${doc.doc_id}-q${i}`} className="text-[13px] leading-6 text-zinc-600 dark:text-zinc-300">
                        <span className="font-black text-[#0EA5E9]">سؤال تحليل: </span>
                        {q.question}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {(wing.causality_and_comprehension_checks?.length ?? 0) > 0 && (
        <div className="border-b border-dashed border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <h3 className="flex items-center gap-1.5 text-sm font-black">
            <FlaskConical className="size-4 text-[#0F5132] dark:text-emerald-300" />
            اختبارات السببية والفهم ({wing.causality_and_comprehension_checks?.length})
          </h3>
          <div className="mt-3 space-y-3">
            {wing.causality_and_comprehension_checks?.map((chk) => (
              <article key={chk.id} className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
                <p className="font-bold leading-7">{chk.question}</p>
                {(chk.model_answer_bullets?.length ?? 0) > 0 && (
                  <ul className="mt-2 space-y-1">
                    {chk.model_answer_bullets?.map((b) => (
                      <li key={b.slice(0, 32)} className="flex items-start gap-1.5 text-[13px] leading-6 text-zinc-700 dark:text-zinc-200">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {chk.common_misconception && (
                  <p className="mt-2 flex items-start gap-2 rounded-lg bg-red-50 p-2.5 text-[13px] leading-6 text-red-800 dark:bg-red-950/40 dark:text-red-200">
                    <Lightbulb className="mt-0.5 size-4 shrink-0" />
                    <span>
                      <span className="font-black">فهم خاطئ شائع: </span>
                      {chk.common_misconception}
                    </span>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {hasLinks && (
        <div className="px-5 py-4">
          <h3 className="flex items-center gap-1.5 text-sm font-black">
            <Link2 className="size-4 text-[#0F5132] dark:text-emerald-300" />
            الربط الشبكي لهذه الوضعية
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {linkedTerms.slice(0, 12).map((t) => (
              <Link
                key={t.id}
                href="/history/terms"
                className="rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-bold text-zinc-600 transition hover:border-[#0F5132] hover:text-[#0F5132] dark:border-zinc-700 dark:text-zinc-300"
              >
                {t.term}
              </Link>
            ))}
            {linkedPersonalities.slice(0, 8).map((p) => (
              <Link
                key={p.id}
                href="/history/personalities"
                className="rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-bold text-zinc-600 transition hover:border-[#0F5132] hover:text-[#0F5132] dark:border-zinc-700 dark:text-zinc-300"
              >
                {p.name}
              </Link>
            ))}
            {(wing.linked_chronology_dates ?? []).slice(0, 8).map((d) => (
              <Link
                key={d}
                href="/history/chronology"
                className="rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-black text-white tabular-nums dark:bg-zinc-100 dark:text-zinc-900"
              >
                {d}
              </Link>
            ))}
            {linkedMaps.map((m) => (
              <Link
                key={m.id}
                href="/history/maps"
                className="rounded-full bg-[#0F5132] px-2.5 py-1 text-[11px] font-black text-white"
              >
                {m.id}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
