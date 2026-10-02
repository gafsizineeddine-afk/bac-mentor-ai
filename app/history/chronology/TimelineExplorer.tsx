"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { searchChronology } from "@/lib/history";

const UNIT_FILTERS = [
  { value: 0, label: "كل الوحدات" },
  { value: 1, label: "الوحدة 1" },
  { value: 2, label: "الوحدة 2" },
  { value: 3, label: "الوحدة 3" },
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

const UNIT_COLORS: Record<number, string> = {
  1: "#0EA5E9",
  2: "#0F5132",
  3: "#C9A227",
};

export function TimelineExplorer() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState(0);
  const [tier, setTier] = useState(0);
  const results = useMemo(
    () => searchChronology(query, unit === 0 ? undefined : unit, tier === 0 ? undefined : tier),
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
            placeholder="ابحث بحدث أو بتاريخ (مثال: 1954 أو الصومام)…"
            role="searchbox"
            aria-label="البحث في التواريخ"
            className="focus-ring w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-3 pr-10 text-sm outline-none placeholder:text-zinc-400 focus:border-[#0F5132] dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
        <div className="flex gap-1.5" role="group" aria-label="تصفية حسب الوحدة">
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
      <div className="mt-2 flex gap-1.5" role="group" aria-label="تصفية حسب مستوى الأولوية">
        {[
          { value: 0, label: "كل المستويات" },
          { value: 1, label: "1: النواة" },
          { value: 2, label: "2: السياق" },
          { value: 3, label: "3: الأمان" },
        ].map((f) => (
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
        {results.length} حدثاً — مرتبة زمنياً من 1944 إلى 1991
      </p>
      <ol className="relative mt-4 space-y-0 border-r-2 border-zinc-200 pr-0 dark:border-zinc-800">
        {results.map((e) => (
          <li key={`${e.date}-${e.event.slice(0, 20)}`} className="relative flex gap-3 pb-4 pr-6">
            <span
              className="absolute right-[-7px] top-1.5 size-3 rounded-full border-2 border-white dark:border-zinc-900"
              style={{ background: UNIT_COLORS[e.unit] ?? "#0F5132" }}
              aria-hidden="true"
            />
            <div className="flex-1 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-black text-white tabular-nums dark:bg-zinc-100 dark:text-zinc-900">
                  {formatDate(e.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  {e.priority_tier !== undefined && (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-black tabular-nums dark:bg-zinc-800 dark:text-zinc-300">
                      مستوى {e.priority_tier}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-zinc-400 tabular-nums">وحدة {e.unit}</span>
                </span>
              </div>
              <p className="mt-2 text-sm font-bold leading-7">{e.event}</p>
              {e.historical_significance && (
                <p className="mt-1.5 text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">
                  <span className="font-black">الدلالة: </span>
                  {e.historical_significance}
                </p>
              )}
            </div>
          </li>
        ))}
        {results.length === 0 && (
          <p className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
            لا نتائج مطابقة — جرّب كلمة أخرى أو أزل التصفية.
          </p>
        )}
      </ol>
    </div>
  );
}
