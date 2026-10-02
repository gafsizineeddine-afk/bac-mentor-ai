"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Siren } from "lucide-react";
import { getPersonalityCategories, searchPersonalities } from "@/lib/history";

export function PersonalitiesExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [tier, setTier] = useState(0);
  const categories = useMemo(() => getPersonalityCategories(), []);
  const results = useMemo(
    () => searchPersonalities(query, category === "all" ? undefined : category, tier === 0 ? undefined : tier),
    [query, category, tier]
  );
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث باسم الشخصية أو صفتها أو أعمالها…"
            role="searchbox"
            aria-label="البحث في الشخصيات"
            className="focus-ring w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-3 pr-10 text-sm outline-none placeholder:text-zinc-400 focus:border-[#0F5132] dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="تصفية حسب الفئة"
          className="focus-ring rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm font-bold outline-none dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="all">كل الفئات</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={tier}
          onChange={(e) => setTier(Number(e.target.value))}
          aria-label="تصفية حسب مستوى الأولوية"
          className="focus-ring rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm font-bold outline-none dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value={0}>كل المستويات</option>
          <option value={1}>1: النواة الصلبة</option>
          <option value={2}>2: الفهم والسياق</option>
          <option value={3}>3: شبكة الأمان</option>
        </select>
      </div>
      <p className="mt-3 text-xs text-zinc-500 tabular-nums dark:text-zinc-400" role="status">
        {results.length} شخصية
      </p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        {results.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-black">{p.name}</h2>
                <p className="mt-0.5 text-xs font-bold text-zinc-500 dark:text-zinc-400">{p.category}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5">
                {p.priority_tier !== undefined && (
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-black tabular-nums ${
                      p.priority_tier === 1
                        ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                        : p.priority_tier === 2
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
                    }`}
                    title={p.tier_info?.study_advice ?? ""}
                  >
                    مستوى {p.priority_tier}
                  </span>
                )}
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-700 tabular-nums dark:bg-emerald-950 dark:text-emerald-300">
                  {p.id} • 1 ن
                </span>
              </span>
            </div>
            <dl className="mt-3 space-y-2 text-sm leading-7">
              <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60">
                <dt className="text-xs font-black text-zinc-500 dark:text-zinc-400">الجنسية (0.25 ن)</dt>
                <dd className="font-bold">{p.scoring_criteria.nationality}</dd>
              </div>
              <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60">
                <dt className="text-xs font-black text-zinc-500 dark:text-zinc-400">الصفة الرسمية (0.25 ن)</dt>
                <dd className="font-bold">{p.scoring_criteria.official_role}</dd>
              </div>
              <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/60">
                <dt className="text-xs font-black text-zinc-500 dark:text-zinc-400">الأعمال التاريخية (0.25 ن)</dt>
                <dd>
                  <ul className="mt-1 space-y-1">
                    {p.scoring_criteria.key_actions.map((a) => (
                      <li key={a.slice(0, 28)} className="flex items-start gap-1.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0F5132]" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-[13px] leading-6 text-red-800 dark:bg-red-950/40 dark:text-red-200">
              <Siren className="mt-0.5 size-4 shrink-0" />
              <span>
                <span className="font-black">تنبيه الامتحان: </span>
                {p.exam_alert}
              </span>
            </p>
            {p.related_terms.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.related_terms.map((t) => (
                  <Link
                    key={t}
                    href={`/history/terms`}
                    className="rounded-full border border-zinc-200 px-2.5 py-1 text-[11px] font-bold text-zinc-500 transition hover:border-[#0F5132] hover:text-[#0F5132] dark:border-zinc-700 dark:text-zinc-400"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
        {results.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
            لا نتائج مطابقة — جرّب كلمة أخرى أو أزل التصفية.
          </p>
        )}
      </div>
    </div>
  );
}
