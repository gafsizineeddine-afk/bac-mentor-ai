import Link from "next/link";
import { BadgeCheck, Compass, KeyRound, Map as MapIcon, Ruler, Tag } from "lucide-react";
import { getMaps } from "@/lib/history";

export const metadata = {
  title: "الخرائط والتوقيعات الصماء | قسم التاريخ",
  description: "الخرائط الست الموحدة وزارياً مع سلم التنقيط الرباعي وأدلة التوقيع الملونة",
};

function rubricTotal(m: { title_points: number; legend_points: number; orientation_points: number; accuracy_points: number }): number {
  return m.title_points + m.legend_points + m.orientation_points + m.accuracy_points;
}

export default function HistoryMapsPage() {
  const maps = getMaps();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-black sm:text-3xl">الخرائط والتوقيعات الصماء</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
        الخرائط الست الموحدة وزارياً — سلم التنقيط الرباعي: العنوان (0.25) + المفتاح (0.25) +
        الاتجاه (0.25) + الدقة (1.25) = 2 نقاط. الألوان المقترحة للمفتاح مذكورة لكل عنصر.
      </p>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {maps.map((m) => (
          <article
            key={m.id}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="flex items-start gap-2 font-black leading-7">
                <MapIcon className="mt-1 size-5 shrink-0 text-[#0F5132] dark:text-emerald-300" />
                {m.title}
              </h2>
              <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-bold text-zinc-500 tabular-nums dark:bg-zinc-800 dark:text-zinc-300">
                {m.id}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              وحدة {m.unit_id} • وضعية {m.situation_id} •{" "}
              <Link
                href={`/history/units/${m.unit_id}/${m.situation_id}`}
                className="font-bold text-[#0F5132] hover:underline dark:text-emerald-300"
              >
                درس الوضعية ←
              </Link>
            </p>

            <div className="mt-3 grid grid-cols-4 gap-1.5 text-center text-[11px] font-black tabular-nums">
              <span className="flex items-center justify-center gap-1 rounded-lg bg-emerald-50 px-1 py-1.5 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <Tag className="size-3" />
                {m.rubric_points.title_points}
              </span>
              <span className="flex items-center justify-center gap-1 rounded-lg bg-sky-50 px-1 py-1.5 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                <KeyRound className="size-3" />
                {m.rubric_points.legend_points}
              </span>
              <span className="flex items-center justify-center gap-1 rounded-lg bg-violet-50 px-1 py-1.5 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                <Compass className="size-3" />
                {m.rubric_points.orientation_points}
              </span>
              <span className="flex items-center justify-center gap-1 rounded-lg bg-amber-50 px-1 py-1.5 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <Ruler className="size-3" />
                {m.rubric_points.accuracy_points}
              </span>
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
              <BadgeCheck className="size-3.5 text-[#0F5132] dark:text-emerald-300" />
              المجموع {rubricTotal(m.rubric_points)} نقاط — لا تنسَ عنوان الخريطة واتجاه الشمال
            </p>

            <h3 className="mt-3 text-sm font-black">عناصر التوقيع والمفتاح اللوني:</h3>
            <ul className="mt-2 space-y-2">
              {m.features.map((f) => (
                <li
                  key={f.id}
                  className="flex items-start gap-2.5 rounded-xl bg-zinc-50 p-3 text-sm leading-7 dark:bg-zinc-800/60"
                >
                  <span
                    className="mt-1.5 size-4 shrink-0 rounded border border-black/10"
                    style={{ background: f.color_code }}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-black">{f.label}</span>
                    <span className="mt-0.5 block text-[11px] text-zinc-500 dark:text-zinc-400">
                      {f.category} • اللون المقترح{" "}
                      <span className="font-mono tabular-nums" dir="ltr">
                        {f.color_code}
                      </span>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
