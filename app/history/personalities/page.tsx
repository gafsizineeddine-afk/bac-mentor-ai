import { PersonalitiesExplorer } from "./PersonalitiesExplorer";

export const metadata = {
  title: "بطاقات الشخصيات | قسم التاريخ",
  description: "27 شخصية مفككة حسب سلم التنقيط الوزاري مع تنبيهات الامتحان والربط بالمصطلحات والتواريخ",
};

export default function HistoryPersonalitiesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-black sm:text-3xl">بطاقات الشخصيات</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
        كل بطاقة مفككة حسب سلم ONEC: الجنسية (0.25) + الصفة الرسمية (0.25) + الأعمال التاريخية (0.25) —
        إغفال أي حقل يعني فقدان ربع نقطة فوراً.
      </p>
      <div className="mt-5">
        <PersonalitiesExplorer />
      </div>
    </main>
  );
}
