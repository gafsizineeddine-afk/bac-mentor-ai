"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { db } from "@/lib/progress/db";
import type { Lesson } from "@/lib/data/lessons";

interface Props {
  lessons: Lesson[];
  accent: string;
}

export function LessonList({ lessons, accent }: Props) {
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    void db.lessons
      .toArray()
      .then((rows) => setDoneIds(new Set(rows.map((r) => r.lessonId))))
      .finally(() => setLoaded(true));
  }, []);

  const toggle = (lessonId: string, done: boolean): void => {
    setDoneIds((prev) => {
      const next = new Set(prev);
      if (done) next.add(lessonId);
      else next.delete(lessonId);
      return next;
    });
    if (done) {
      void db.lessons.put({ lessonId, doneAt: Date.now() });
    } else {
      void db.lessons.delete(lessonId);
    }
  };

  const doneCount = lessons.filter((l) => doneIds.has(l.id)).length;
  const pct = lessons.length > 0 ? Math.round((doneCount / lessons.length) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <span className="text-sm font-black tabular-nums">
          أنجزت {doneCount} / {lessons.length} {pct}% {loaded ? "" : "…"}
        </span>
        <div className="h-2 w-40 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: accent }} />
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {lessons.map((lesson, i) => {
          const done = doneIds.has(lesson.id);
          return (
            <details
              key={lesson.id}
              open={i === 0}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm open:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-3">
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-xl text-sm font-black text-white tabular-nums"
                    style={{ background: done ? "#10B981" : accent }}
                  >
                    {done ? <CheckCircle2 className="size-5" /> : i + 1}
                  </span>
                  <div>
                    <h2 className="font-black">{lesson.title}</h2>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      <span className="tabular-nums">{lesson.minutes} دقيقة</span> • {lesson.level}
                    </p>
                  </div>
                </div>
                <ArrowLeft className="size-4 shrink-0 text-zinc-400 transition-transform group-open:-rotate-90" />
              </summary>
              <div className="border-t border-dashed border-zinc-200 px-5 py-4 dark:border-zinc-800">
                {lesson.source ? (
                  <p className="quran-text rounded-xl bg-emerald-50 p-4 text-center text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100">
                    {lesson.source}
                  </p>
                ) : null}
                {lesson.summary.map((para) => (
                  <p key={para.slice(0, 24)} className="mt-3 text-[15px] leading-8 text-zinc-700 dark:text-zinc-200">
                    {para}
                  </p>
                ))}
                <h3 className="mt-4 text-sm font-black">النقاط الأساسية للحفظ:</h3>
                <ul className="mt-2 space-y-1.5">
                  {lesson.keyPoints.map((point) => (
                    <li key={point.slice(0, 24)} className="flex items-start gap-2 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                      <CheckCircle2 className="mt-1.5 size-4 shrink-0" style={{ color: accent }} />
                      {point}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => toggle(lesson.id, !done)}
                  className="focus-ring mt-4 inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition"
                  style={done ? { borderColor: "#10B981", color: "#10B981" } : { borderColor: accent, color: accent }}
                >
                  {done ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                  {done ? "مُنجز — اضغط للتراجع" : "تحديد كمنجز"}
                </button>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}
