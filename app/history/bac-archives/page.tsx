import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { getArchives } from "@/lib/history";

export const metadata = {
  title: "أرشيف البكالوريا 2015–2026 | قسم التاريخ",
  description: "12 دورة رسمية لشعبة العلوم التجريبية مع الحلول والنقاط الرسمية لكل سؤال",
};

export default function HistoryArchivesPage() {
  const archives = getArchives();
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-black sm:text-3xl">أرشيف البكالوريا 2015–2026</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
        {archives.length} دورات رسمية لشعبة العلوم التجريبية — كل دورة تشمل الموضوعين: الجزء الأول
        (مصطلحات + تواريخ + شخصيات) والمقال (الموضوع + الأسئلة + النقاط الرسمية).
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {archives.map((a) => (
          <Link
            key={a.year}
            href={`/history/bac-archives/${a.year}`}
            className="focus-ring group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0F5132] hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-[#0F5132] dark:bg-emerald-950 dark:text-emerald-300">
              <FileText className="size-5" />
            </span>
            <p className="mt-3 text-3xl font-black tabular-nums">{a.year}</p>
            <p className="mt-1 text-xs font-bold text-zinc-500 dark:text-zinc-400">{a.session}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-black text-[#0F5132] transition group-hover:gap-2 dark:text-emerald-300">
              الموضوعان + الحلول الرسمية
              <ArrowLeft className="size-4" />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
