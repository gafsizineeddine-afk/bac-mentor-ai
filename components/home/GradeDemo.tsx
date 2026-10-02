"use client";
import { useState } from "react";
import { Eraser, Send, Sparkles } from "lucide-react";
import { FeedbackPanel } from "@/components/grading/FeedbackPanel";
import { gradeLocally } from "@/lib/grading/local";

interface GradeResult {
  awarded: number;
  maxScore?: number;
  feedback: string;
  correction: string;
  deductionReason: string | null;
}

const PRESETS = [
  { label: "إجابة كاملة", value: "مصالي الحاج مؤسس حزب الشعب سنة 1937 ورائد الحركة الوطنية" },
  { label: "إجابة ناقصة", value: "مصالي الحاج زعيم وطني جزائري" },
  { label: "إجابة فارغة", value: "مناضل مشهور" },
] as const;

export function GradeDemo() {
  const [answer, setAnswer] = useState<string>("مصالي الحاج مؤسس حزب الشعب سنة 1937 ورائد الحركة الوطنية");
  const [result, setResult] = useState<GradeResult | null>(null);

  const submit = (): void => {
    if (!answer.trim()) return;
    setResult(
      gradeLocally({
        submittedAnswer: answer,
        subject: "HISTORY_GEOGRAPHY",
        questionId: "hg-1",
      })
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* input card */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-[#0F5132] text-white">
            <Sparkles className="size-4" />
          </span>
          <div>
            <h3 className="font-bold">جرّب محرك التصحيح الآن</h3>
            <p className="text-xs text-zinc-500">سؤال تاريخ: عرّف الشخصية — مصالي الحاج — 1 نقطة</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setAnswer(p.value)}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:border-[#0F5132] hover:text-[#0F5132] dark:border-zinc-700 dark:text-zinc-300"
            >
              {p.label}
            </button>
          ))}
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          placeholder="عرّف الشخصية… مثال: مصالي الحاج مؤسس حزب الشعب سنة 1937"
          className="nice-scroll mt-4 w-full resize-none rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 text-[15px] leading-8 outline-none transition placeholder:text-zinc-400 focus:border-[#0EA5E9] focus:bg-white dark:border-zinc-700 dark:bg-zinc-950 dark:focus:bg-zinc-900"
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-zinc-400 tabular-nums">{answer.trim().length} حرف</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setAnswer("");
                setResult(null);
              }}
              className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Eraser className="size-4" />
              مسح
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={!answer.trim()}
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#0F5132] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#0a3a24] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="size-4 -scale-x-100" />
              صحّح إجابتي
            </button>
          </div>
        </div>
      </div>

      {/* result card */}
      <div className="min-h-[320px]">
        {result ? (
          <div className="animate-fade-up">
            <FeedbackPanel
              awarded={result.awarded}
              maxScore={result.maxScore ?? 1}
              feedback={result.feedback}
              correction={result.correction}
              deductionReason={result.deductionReason}
            />
            <p className="mt-3 text-center text-xs text-zinc-400">
              القاعدة الوزارية: كل عنصر أساسي (الاسم، الدور، التاريخ) يمنح جزءاً من العلامة
            </p>
          </div>
        ) : (
          <div className="grid h-full min-h-[320px] place-items-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/60 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
            <div>
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-white shadow-sm dark:bg-zinc-800">
                <Send className="size-5 -scale-x-100 text-[#0EA5E9]" />
              </span>
              <p className="mt-4 font-bold">النتيجة ستظهر هنا</p>
              <p className="mx-auto mt-1 max-w-xs text-sm leading-6 text-zinc-500">
                اكتب إجابتك ثم اضغط «صحّح إجابتي» لتحصل على العلامة والتعليل والتصحيح الوزاري.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
