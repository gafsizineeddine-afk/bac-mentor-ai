import Link from "next/link";
import {
  Archive,
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Gamepad2,
  Layers,
  Library,
  Map as MapIcon,
  Sparkles,
  Users,
} from "lucide-react";
import { getPriorityTiers, getStats, getUnits } from "@/lib/history";

const SECTIONS = [
  {
    href: "/history/units",
    icon: BookOpen,
    title: "الوحدات والدروس المفصلة",
    desc: "3 وحدات • 8 وضعيات تعلمية بالعناصر الكاملة + جناح الدرس البيداغوجي (مدخل، وثائق، اختبارات سببية)",
    stat: (s: ReturnType<typeof getStats>) => `${s.units} وحدات • ${s.situations} وضعيات`,
  },
  {
    href: "/history/terms",
    icon: Library,
    title: "معجم المصطلحات",
    desc: "70 مصطلحاً وزارياً بمستويات الأولوية + فخاخ الامتحان، مع بحث وتصفية حسب الوحدة والمستوى",
    stat: (s: ReturnType<typeof getStats>) => `${s.terms} مصطلحاً`,
  },
  {
    href: "/history/personalities",
    icon: Users,
    title: "بطاقات الشخصيات",
    desc: "41 شخصية مفككة حسب سلم التنقيط: الجنسية + الصفة + الأعمال، مع تنبيهات الامتحان والربط الشبكي",
    stat: (s: ReturnType<typeof getStats>) => `${s.personalities} شخصية`,
  },
  {
    href: "/history/chronology",
    icon: CalendarDays,
    title: "الخط الزمني التفاعلي",
    desc: "145 حدثاً معلمياً بدلالاتها التاريخية، قابل للتصفية حسب الوحدة ومستوى الأولوية",
    stat: (s: ReturnType<typeof getStats>) => `${s.events} حدثاً`,
  },
  {
    href: "/history/maps",
    icon: MapIcon,
    title: "الخرائط والتوقيعات الصماء",
    desc: "6 خرائط موحدة مع سلم التنقيط الرباعي (العنوان + المفتاح + الاتجاه + الدقة) والمفتاح اللوني",
    stat: (s: ReturnType<typeof getStats>) => `${s.maps} خرائط`,
  },
  {
    href: "/history/flashcards",
    icon: Layers,
    title: "البطاقات التعليمية",
    desc: "256 بطاقة اختبار ذاتي (مصطلحات • تواريخ • شخصيات) بمستويات الأولوية مع تتبع التقدم",
    stat: (s: ReturnType<typeof getStats>) => `${s.flashcards} بطاقة`,
  },
  {
    href: "/history/bac-archives",
    icon: Archive,
    title: "أرشيف البكالوريا 2015–2026",
    desc: "12 دورة رسمية لشعبة العلوم التجريبية مع الحلول والنقاط الرسمية لكل سؤال",
    stat: (s: ReturnType<typeof getStats>) => `${s.archives} دورات`,
  },
];

export default function HistoryHubPage() {
  const stats = getStats();
  const units = getUnits();
  const tiers = getPriorityTiers();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="animate-fade-up overflow-hidden rounded-3xl bg-[#0F5132] p-6 text-white sm:p-10">
        <div className="bg-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
            <Sparkles className="size-3.5" />
            V5 Lesson Wing — المنهاج الرسمي + سلم ONEC
          </p>
          <h1 className="mt-3 text-2xl font-black leading-snug sm:text-4xl">
            قاعدة التاريخ الاحترافية
            <br />
            <span className="text-emerald-200">كل البكالوريا في مكان واحد</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/90 sm:text-base">
            دروس مفصلة بالعناصر، ملخصات مركزة، أسئلة غير مباشرة بفخاخها، مصطلحات، شخصيات بسلم
            التنقيط، تواريخ، خرائط صماء، 133 بطاقة مراجعة، وأرشيف 12 دورة مع الحلول الرسمية.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold tabular-nums">
            {[
              `${stats.situations} وضعيات`,
              `${stats.terms} مصطلحاً`,
              `${stats.personalities} شخصية`,
              `${stats.events} حدثاً`,
              `${stats.flashcards} بطاقة`,
            ].map((chip) => (
              <span key={chip} className="rounded-full bg-white/15 px-3 py-1.5">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-black">الفهرس الرئيسي</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ href, icon: Icon, title, desc, stat }, i) => (
          <Link
            key={href}
            href={href}
            className={`focus-ring group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 animate-fade-up-${Math.min(i % 4, 3)}`}
          >
            <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-[#0F5132] dark:bg-emerald-950 dark:text-emerald-300">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-3 font-black">{title}</h3>
            <p className="mt-1 min-h-[66px] text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">{desc}</p>
            <span className="mt-3 flex items-center justify-between border-t border-dashed border-zinc-200 pt-3 text-xs font-bold dark:border-zinc-800">
              <span className="text-[#0F5132] tabular-nums dark:text-emerald-300">{stat(stats)}</span>
              <span className="inline-flex items-center gap-1 text-zinc-400 transition group-hover:gap-2 group-hover:text-[#0F5132]">
                ادخل
                <ArrowLeft className="size-3.5" />
              </span>
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-black">مصفوفة الأولويات البيداغوجية</h2>
      <p className="mt-1 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
        نظام V5 لحماية وقتك من التشتت: ابدأ بالنواة الصلبة (80–90% من الأسئلة)، ثم الفهم والسياق،
        واترك شبكة الأمان للاطلاع فقط.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {tiers.map((t, i) => (
          <div
            key={t.tier_id}
            className={`rounded-2xl border-2 p-5 shadow-sm dark:bg-zinc-900 ${
              i === 0
                ? "border-red-300 bg-red-50/60 dark:border-red-900"
                : i === 1
                  ? "border-amber-300 bg-amber-50/60 dark:border-amber-900"
                  : "border-sky-300 bg-sky-50/60 dark:border-sky-900"
            }`}
          >
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-black tabular-nums ${
                i === 0
                  ? "bg-red-600 text-white"
                  : i === 1
                    ? "bg-amber-500 text-white"
                    : "bg-sky-600 text-white"
              }`}
            >
              المستوى {t.tier_id}
            </span>
            <h3 className="mt-2 font-black leading-7">{t.label}</h3>
            <p className="mt-1 text-xs font-bold text-zinc-500 dark:text-zinc-400">{t.badge}</p>
            <p className="mt-2 text-[13px] leading-6 text-zinc-600 dark:text-zinc-300">
              {t.exam_frequency}
            </p>
            <p className="mt-2 rounded-xl bg-white/70 p-2.5 text-[13px] leading-6 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <span className="font-black">طريقة المراجعة: </span>
              {t.study_advice}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-lg font-black">الوحدات التعلمية</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {units.map((u) => (
          <Link
            key={u.id}
            href={`/history/units/${u.id}`}
            className="focus-ring rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-[#0F5132] dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[#0F5132] text-sm font-black text-white tabular-nums">
              {u.id}
            </span>
            <h3 className="mt-3 text-[15px] font-black leading-7">{u.title}</h3>
            <p className="mt-1 text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
              {u.situations.length} وضعيات تعلمية
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/games/knowledge-duel"
        className="focus-ring group mt-8 flex items-center justify-between gap-4 overflow-hidden rounded-3xl bg-zinc-900 p-6 text-white shadow-lg transition hover:shadow-xl dark:bg-zinc-800 sm:p-8"
      >
        <span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-black text-amber-300">
            <Gamepad2 className="size-3.5" />
            تحدَّ زميلك
          </span>
          <span className="mt-2 block text-xl font-black">مبارزة المزايدة المعرفية</span>
          <span className="mt-1 block text-sm leading-7 text-zinc-300">
            زايدا بالنقاط على الأسئلة غير المباشرة وأجب متفادياً الفخاخ — لعبة لاعبَيْن من بنك الامتحان
          </span>
        </span>
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#0F5132] transition group-hover:scale-105">
          <ArrowLeft className="size-5" />
        </span>
      </Link>
    </main>
  );
}
