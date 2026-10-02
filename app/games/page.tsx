import Link from "next/link";
import { ArrowLeft, Gamepad2, Swords } from "lucide-react";

export const metadata = {
  title: "الألعاب التعليمية | BAC Mentor AI",
  description: "ألعاب مراجعة تفاعلية لمواد البكالوريا — تعلم بالمنافسة",
};

const GAMES = [
  {
    href: "/games/knowledge-duel",
    icon: Swords,
    title: "مبارزة المزايدة المعرفية",
    desc: "تحدَّ زميلك: زايدا بالنقاط على الأسئلة غير المباشرة، وأجب متفادياً فخاخ الامتحان. 17 سؤالاً من بنك الأسئلة الوزارية.",
    badge: "التاريخ • لاعبان",
  },
];

export default function GamesPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#FBFBFA] dark:bg-[#0F1115]">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
        >
          عودة للرئيسية
        </Link>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#0F5132] text-white shadow-lg shadow-emerald-900/20">
            <Gamepad2 className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-black sm:text-3xl">الألعاب التعليمية</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              راجع دروسك باللعب والمنافسة — ألعاب جديدة تُضاف تباعاً
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GAMES.map(({ href, icon: Icon, title, desc, badge }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-[#0F5132] dark:bg-emerald-950 dark:text-emerald-300">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-3 font-black">{title}</h2>
              <p className="mt-1 min-h-[66px] text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">
                {desc}
              </p>
              <span className="mt-3 flex items-center justify-between border-t border-dashed border-zinc-200 pt-3 text-xs font-bold dark:border-zinc-800">
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
                  {badge}
                </span>
                <span className="inline-flex items-center gap-1 text-[#0F5132] transition group-hover:gap-2 dark:text-emerald-300">
                  العب الآن
                  <ArrowLeft className="size-3.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
