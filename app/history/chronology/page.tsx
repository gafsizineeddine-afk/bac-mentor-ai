import { TimelineExplorer } from "./TimelineExplorer";

export const metadata = {
  title: "الخط الزمني | قسم التاريخ",
  description: "65 حدثاً معلمياً من 1944 إلى 1991 مع البحث الفوري والتصفية حسب الوحدة",
};

export default function HistoryChronologyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-black sm:text-3xl">الخط الزمني التفاعلي</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
        كل التواريخ المعلمية للبكالوريا مرتبة زمنياً — الأزرق للوحدة 1، الأخضر للوحدة 2، الذهبي للوحدة 3.
      </p>
      <div className="mt-5">
        <TimelineExplorer />
      </div>
    </main>
  );
}
