"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Eraser,
  Eye,
  EyeOff,
  Lightbulb,
  Loader2,
  Send,
} from "lucide-react";
import { FeedbackPanel } from "@/components/grading/FeedbackPanel";
import { getSubject } from "@/lib/data/subjects";
import { getQuestion } from "@/lib/data/questions";
import { gradeLocally } from "@/lib/grading/local";
import { db } from "@/lib/progress/db";

interface GradeResult {
  awarded: number;
  maxScore?: number;
  feedback: string;
  correction: string;
  deductionReason: string | null;
}

export function PracticeClient({ subject, questionId }: { subject: string; questionId: string }) {
  const meta = getSubject(subject);
  const { question, index, total } = getQuestion(subject, questionId);

  const [answer, setAnswer] = useState<string>("");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [showOfficial, setShowOfficial] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const resetFor = (): void => {
    setAnswer("");
    setResult(null);
    setShowOfficial(false);
  };

  const handleSubmit = (): void => {
    if (!answer.trim() || loading) return;
    setLoading(true);
    try {
      const data = gradeLocally({ submittedAnswer: answer, subject, questionId: question.id });
      setResult(data);
      setShowOfficial(true);
      // Persist to local history (offline-first, Dexie).
      const scored = typeof data.maxScore === "number" ? data.maxScore : question.points;
      void db.submissions
        .add({
          questionId: question.id,
          subject,
          answer: answer.trim().slice(0, 500),
          awarded: data.awarded,
          maxScore: scored,
          createdAt: Date.now(),
        })
        .catch(() => {});
    } finally {
      setLoading(false);
    }
  };

  const prevHref = index > 1 ? `/practice/${subject}/${index - 1}` : null;
  const nextHref = index < total ? `/practice/${subject}/${index + 1}` : null;

  return (
    <div dir="rtl" className="min-h-screen bg-[#FBFBFA] dark:bg-[#0F1115]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/#bank"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
          >
            <ArrowRight className="size-4" />
            بنك الأسئلة
          </Link>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600 tabular-nums dark:bg-zinc-800 dark:text-zinc-300">
            السؤال {index} / {total}
          </span>
        </div>

        {/* question card */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="absolute inset-x-0 top-0 h-1" style={{ background: meta.accent }} aria-hidden="true" />
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-black"
              style={{ background: `${meta.accent}1a`, color: meta.accent }}
            >
              {question.type}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600 tabular-nums dark:bg-zinc-800 dark:text-zinc-300">
              {question.points} {question.points > 2 ? "نقاط" : "نقطة"}
            </span>
            <span className="text-xs font-bold text-zinc-400">{meta.arName}</span>
          </div>
          <p className="mt-4 text-[17px] font-bold leading-9">{question.prompt}</p>
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-sky-50 p-3 text-[13px] leading-7 text-sky-900 dark:bg-sky-950/40 dark:text-sky-100">
            <Lightbulb className="mt-1 size-4 shrink-0" />
            <span>
              <span className="font-black">توجيه: </span>
              {question.tip}
            </span>
          </p>
        </div>

        {/* answer card */}
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <label htmlFor="answer" className="text-sm font-black">
            إجابتك
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)}
            placeholder="اكتب إجابتك هنا…"
            rows={6}
            className="nice-scroll mt-2 w-full resize-none rounded-xl border-2 border-zinc-200 bg-zinc-50 p-4 text-[15px] leading-8 outline-none transition placeholder:text-zinc-400 focus:border-[#0EA5E9] focus:bg-white dark:border-zinc-700 dark:bg-zinc-950 dark:focus:bg-zinc-900"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-400 tabular-nums">{answer.trim().length} حرف</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={resetFor}
                className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <Eraser className="size-4" />
                مسح
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !answer.trim()}
                className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#0F5132] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#0a3a24] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4 -scale-x-100" />}
                {loading ? "جاري التصحيح…" : "تصحيح الإجابة"}
              </button>
            </div>
          </div>
        </div>

        {/* grading result */}
        {result ? (
          <div className="animate-fade-up mt-4">
            <FeedbackPanel
              awarded={result.awarded}
              maxScore={result.maxScore ?? question.points}
              feedback={result.feedback}
              correction={result.correction}
              deductionReason={result.deductionReason}
            />
          </div>
        ) : null}

        {/* official correction */}
        <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-5 dark:border-zinc-700 dark:bg-zinc-900/50">
          <button
            type="button"
            onClick={() => setShowOfficial((v) => !v)}
            className="focus-ring inline-flex items-center gap-2 text-sm font-black text-[#0F5132] dark:text-emerald-400"
          >
            {showOfficial ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {showOfficial ? "إخفاء التصحيح الرسمي" : "عرض التصحيح الرسمي"}
          </button>
          {showOfficial ? (
            <p className="animate-fade-up mt-3 border-r-4 border-[#C9A227] pr-3 text-[15px] font-bold leading-8">
              {question.officialCorrection}
            </p>
          ) : (
            <p className="mt-2 text-xs leading-6 text-zinc-400">
              حاول الإجابة أولاً قبل كشف التصحيح — هكذا يكون التدريب فعّالاً.
            </p>
          )}
        </div>

        {/* prev / next */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {prevHref ? (
            <Link
              href={prevHref}
              onClick={resetFor}
              className="focus-ring inline-flex items-center gap-2 rounded-xl border-2 border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold transition hover:border-[#0F5132] dark:border-zinc-700 dark:bg-zinc-900"
            >
              <ArrowRight className="size-4" />
              السؤال السابق
            </Link>
          ) : (
            <span />
          )}
          <Link
            href={`/courses/${subject}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
          >
            <BookOpen className="size-4" />
            راجع الدرس أولاً؟
          </Link>
          {nextHref ? (
            <Link
              href={nextHref}
              onClick={resetFor}
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#0F5132] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0a3a24]"
            >
              السؤال التالي
              <ArrowLeft className="size-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
