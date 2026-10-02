import { TermsExplorer } from "./TermsExplorer";

export const metadata = {
  title: "معجم المصطلحات | قسم التاريخ",
  description: "41 مصطلحاً وزارياً مع البحث الفوري والتصفية حسب الوحدة التعلمية",
};

export default function HistoryTermsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-black sm:text-3xl">معجم المصطلحات</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
        كل مصطلحات البكالوريا الرسمية بالتعريف الوزاري الكامل — ابحث بالكلمة أو صفِّ حسب الوحدة.
      </p>
      <div className="mt-5">
        <TermsExplorer />
      </div>
    </main>
  );
}
