import { FlashcardDeck } from "./FlashcardDeck";

export const metadata = {
  title: "البطاقات التعليمية | قسم التاريخ",
  description: "133 بطاقة اختبار ذاتي للمصطلحات والتواريخ والشخصيات مع تتبع التقدم",
};

export default function HistoryFlashcardsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-black sm:text-3xl">البطاقات التعليمية</h1>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
        اختبر نفسك: اقرأ السؤال، خمّن الإجابة، اكشفها، ثم صنّف البطاقة. يُحفظ تقدمك على جهازك.
      </p>
      <div className="mt-5">
        <FlashcardDeck />
      </div>
    </main>
  );
}
