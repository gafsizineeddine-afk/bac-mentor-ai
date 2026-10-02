"use client";
import { AlertCircle, CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  awarded: number;
  maxScore?: number;
  feedback: string;
  correction: string;
  deductionReason?: string | null;
};

export function FeedbackPanel({
  awarded,
  maxScore = 1,
  feedback,
  correction,
  deductionReason,
}: Props) {
  const passed = awarded >= maxScore * 0.5;
  const full = awarded >= maxScore;
  const pct = maxScore > 0 ? Math.min(100, Math.round((awarded / maxScore) * 100)) : 0;

  return (
    <div
      dir="rtl"
      className={cn(
        "overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-zinc-900",
        full
          ? "border-emerald-200 dark:border-emerald-900"
          : passed
            ? "border-amber-200 dark:border-amber-900"
            : "border-red-200 dark:border-red-900"
      )}
    >
      {/* header */}
      <div
        className={cn(
          "flex items-center justify-between gap-4 px-5 py-4",
          full
            ? "bg-emerald-50 dark:bg-emerald-950/50"
            : passed
              ? "bg-amber-50 dark:bg-amber-950/30"
              : "bg-red-50 dark:bg-red-950/30"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-10 place-items-center rounded-full",
              full
                ? "bg-emerald-600 text-white"
                : passed
                  ? "bg-amber-500 text-white"
                  : "bg-red-500 text-white"
            )}
          >
            {full ? (
              <CheckCircle2 className="size-5" />
            ) : passed ? (
              <AlertCircle className="size-5" />
            ) : (
              <XCircle className="size-5" />
            )}
          </span>
          <div>
            <p className="text-sm font-bold">
              {full ? "إجابة مطابقة للتصحيح الوزاري" : passed ? "إجابة جزئية — تحتاج ضبط" : "إجابة مرفوضة وزارياً"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">محرك ONEC الصارم • دقة حرفية</p>
          </div>
        </div>
        <div className="text-left">
          <p className="text-2xl font-black tabular-nums">
            {awarded.toFixed(2)}
            <span className="text-sm font-semibold text-zinc-400"> / {maxScore.toFixed(2)}</span>
          </p>
          <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                full ? "bg-emerald-500" : passed ? "bg-amber-500" : "bg-red-500"
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* body */}
      <div className="space-y-3 px-5 py-4">
        <p className="border-r-4 border-[#0EA5E9] pr-3 text-sm leading-7 text-zinc-700 dark:text-zinc-200">
          {feedback}
        </p>

        <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm leading-7 text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          <Lightbulb className="mt-1 size-4 shrink-0" />
          <p>
            <span className="font-bold">التصحيح الوزاري: </span>
            {correction}
          </p>
        </div>

        {deductionReason ? (
          <p className="rounded-xl bg-red-50 p-3 text-xs leading-6 text-red-700 dark:bg-red-950/40 dark:text-red-200">
            <span className="font-bold">سبب الخصم: </span>
            {deductionReason}
          </p>
        ) : null}
      </div>
    </div>
  );
}
