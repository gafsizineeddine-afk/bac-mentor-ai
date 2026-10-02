"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchTerms } from "@/lib/history";

const UNIT_FILTERS = [
  { value: 0, label: "كل الوحدات" },
  { value: 1, label: "الوحدة 1: العالم" },
  { value: 2, label: "الوحدة 2: الجزائر" },
  { value: 3, label: "الوحدة 3: العالم الثالث" },
];

const TIER_FILTERS = [
  { value: 0, label: "كل المستويات" },
  { value: 1, label: "1: النواة الصلبة" },
  { value: 2, label: "2: الفهم والسياق" },
  { value: 3, label: "3: شبكة الأمان" },
];

const TIER_STYLES: Record<number, string> = {
  1: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  2: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  3: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
};

export function TermsExplorer() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState(0);
  const [tier, setTier] = useState(0);
  const results = useMemo(
    () => searchTerms(query, unit === 0 ? undefined : unit, tier === 0 ? undefined : tier),
    [query, unit, tier]
  );
  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن مصطلح أو كلمة في التعريف…"
            role="searchbox"
            aria-label="البحث في المصطلحات"
            className="focus-ring w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-3 pr-10 text-sm outline-none placeholder:text-zinc-400 focus:border-[#0F5132] dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <div className="flex gap-1.5 overflow-x-auto" role="group" aria-label="تصفية حسب الوحدة">
          {UNIT_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setUnit(f.value)}
              aria-pressed={unit === f.value}
              className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
                unit === f.value
                  ? "bg-[#0F5132] text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-1.5 overflow-x-auto" role="group" aria-label="تصفية حسب مستوى الأولوية">
        {TIER_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setTier(f.value)}
            aria-pressed={tier === f.value}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${
              tier === f.value
                ? "bg-[#C9A227] text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-zinc-500 tabular-nums dark:text-zinc-400" role="status">
        {results.length} مصطلحاً
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {results.map((t) => (
          <article
            key={t.id}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-black text-[#0F5132] dark:text-emerald-300">{t.term}</h2>
              <span className="flex shrink-0 items-center gap-1.5">
                {t.priority_tier !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-black tabular-nums ${TIER_STYLES[t.priority_tier] ?? ""}`}
                    title={t.tier_info?.study_advice ?? ""}
                  >
                    مستوى {t.priority_tier}
                  </span>
                )}
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-bold text-zinc-500 tabular-nums dark:bg-zinc-800 dark:text-zinc-300">
                  وحدة {t.unit} • {t.id}
                </span>
              </span>
            </div>
            <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{t.definition}</p>
            {t.traps_to_avoid && (
              <p className="mt-2 rounded-lg bg-red-50 p-2.5 text-xs leading-6 text-red-800 dark:bg-red-950/40 dark:text-red-200">
                <span className="font-black">احذر: </span>
                {t.traps_to_avoid}
              </p>
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
