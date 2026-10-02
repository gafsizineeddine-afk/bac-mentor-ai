"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, LayoutDashboard, PencilLine, Save, Target, Timer, Trophy } from "lucide-react";
import { db, getProfile, type ProfileRecord, type SubmissionRecord } from "@/lib/progress/db";
import { SUBJECTS } from "@/lib/data/subjects";
import { LESSONS } from "@/lib/data/lessons";
import { QUESTION_BANK } from "@/lib/data/questions";

function pct(n: number): string {
  return `${Math.round(n * 100)}%`;
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [doneLessons, setDoneLessons] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void (async () => {
      setProfile(await getProfile());
      setSubmissions(await db.submissions.orderBy("createdAt").reverse().toArray());
      setDoneLessons((await db.lessons.toArray()).map((r) => r.lessonId));
    })();
  }, []);

  const stats = useMemo(() => {
    const total = submissions.length;
    const sum = submissions.reduce((a, s) => a + (s.maxScore > 0 ? s.awarded / s.maxScore : 0), 0);
    const avg = total > 0 ? sum / total : 0;
    const full = submissions.filter((s) => s.maxScore > 0 && s.awarded >= s.maxScore).length;
    return { total, avg, full };
  }, [submissions]);

  const perSubject = useMemo(
    () =>
      SUBJECTS.map((s) => {
        const subs = submissions.filter((x) => x.subject === s.key);
        const avg = subs.length > 0 ? subs.reduce((a, x) => a + (x.maxScore > 0 ? x.awarded / x.maxScore : 0), 0) / subs.length : 0;
        const lessons = LESSONS.filter((l) => l.subject === s.key);
        const done = lessons.filter((l) => doneLessons.includes(l.id)).length;
        return { ...s, answered: subs.length, avg, lessonsDone: done, lessonsTotal: lessons.length };
      }),
    [submissions, doneLessons]
  );

  const nextLessons = useMemo(
    () => LESSONS.filter((l) => !doneLessons.includes(l.id)).slice(0, 5),
    [doneLessons]
  );

  const saveProfile = (): void => {
    if (!profile) return;
    void db.profile.put(profile).then(() => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FBFBFA] dark:bg-[#0F1115]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-zinc-500 transition hover:text-[#0F5132]"
        >
          <ArrowRight className="size-4" />
          عودة للرئيسية
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#0F5132] text-white shadow-lg shadow-emerald-900/20">
            <LayoutDashboard className="size-6" />
          </span>
          <div>
            <h1 className="text-2xl font-black sm:text-3xl">
              لوحتي {profile?.name ? `— ${profile.name}` : ""}
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              تقدمك محفوظ على جهازك (يعمل دون إنترنت)
            </p>
          </div>
        </div>

        {/* stat cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: PencilLine, v: String(stats.total), l: "إجابة مصححة" },
            { icon: Target, v: pct(stats.avg), l: "متوسط العلامات" },
            { icon: Trophy, v: String(stats.full), l: "علامات كاملة" },
            { icon: Timer, v: `${doneLessons.length}/${LESSONS.length}`, l: "دروس منجزة" },
          ].map((c) => (
            <div key={c.l} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <c.icon className="size-5 text-[#0F5132] dark:text-emerald-400" />
              <p className="mt-2 text-2xl font-black tabular-nums">{c.v}</p>
              <p className="text-xs text-zinc-500">{c.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {/* mastery */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-black">الإتقان حسب المادة</h2>
            <div className="mt-4 space-y-3">
              {perSubject.map((s) => (
                <div key={s.key}>
                  <div className="flex items-center justify-between text-sm">
                    <Link href={`/courses/${s.key}`} className="font-bold hover:text-[#0F5132]">
                      {s.arName}
                    </Link>
                    <span className="text-xs text-zinc-400 tabular-nums">
                      {s.answered} إجابات • {s.lessonsDone}/{s.lessonsTotal} دروس • {pct(s.avg)}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.round(s.avg * 100)}%`, background: s.accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* profile / revision plan */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="flex items-center gap-2 font-black">
              <CalendarDays className="size-4" />
              حسابي وخطة المراجعة
            </h2>
            {profile ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                <label className="col-span-1 text-xs font-bold">
                  الاسم
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="اسمك"
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-2 text-sm outline-none focus:border-[#0EA5E9] dark:border-zinc-700 dark:bg-zinc-950"
                  />
                </label>
                <label className="col-span-1 text-xs font-bold">
                  هدف الباك
                  <input
                    type="date"
                    value={profile.targetDate}
                    onChange={(e) => setProfile({ ...profile, targetDate: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-2 text-sm outline-none focus:border-[#0EA5E9] dark:border-zinc-700 dark:bg-zinc-950"
                  />
                </label>
                <label className="col-span-1 text-xs font-bold">
                  دقائق/يوم
                  <input
                    type="number"
                    min={10}
                    max={480}
                    value={profile.dailyMinutes}
                    onChange={(e) => setProfile({ ...profile, dailyMinutes: Number(e.target.value) || 60 })}
                    className="mt-1 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-2 text-sm outline-none focus:border-[#0EA5E9] dark:border-zinc-700 dark:bg-zinc-950"
                  />
                </label>
              </div>
            ) : null}
            <button
              type="button"
              onClick={saveProfile}
              className="focus-ring mt-3 inline-flex items-center gap-2 rounded-xl bg-[#0F5132] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0a3a24]"
            >
              <Save className="size-4" />
              {saved ? "تم الحفظ ✓" : "حفظ"}
            </button>
            <h3 className="mt-4 text-sm font-black">التالي في خطتك ({profile?.dailyMinutes ?? 60} دقيقة/يوم):</h3>
            <ul className="mt-2 space-y-1.5">
              {nextLessons.length === 0 ? (
                <li className="text-sm font-bold text-emerald-600">أكملت كل الدروس — راجع الأوراق الآن 🎉</li>
              ) : (
                nextLessons.map((l) => (
                  <li key={l.id} className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    <Link href={`/courses/${l.subject}`} className="font-bold hover:text-[#0F5132]">
                      {l.title}
                    </Link>{" "}
                    <span className="text-xs text-zinc-400 tabular-nums">({l.minutes} د)</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* recent */}
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-black">آخر الإجابات</h2>
          {submissions.length === 0 ? (
            <p className="mt-2 text-sm leading-7 text-zinc-500">
              لا إجابات بعد — <Link href="/#bank" className="font-black text-[#0F5132]">أجب عن أول سؤال</Link> وستُحفظ نتيجتك هنا.
            </p>
          ) : (
            <div className="mt-3 space-y-2">
              {submissions.slice(0, 10).map((s) => {
                const q = QUESTION_BANK.find((x) => x.id === s.questionId);
                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-2.5 text-sm dark:bg-zinc-800/60"
                  >
                    <span className="font-semibold">
                      {q ? (q.prompt.length > 70 ? `${q.prompt.slice(0, 70)}…` : q.prompt) : s.questionId}
                    </span>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-black tabular-nums dark:bg-zinc-900">
                      {s.awarded.toFixed(2)}/{s.maxScore.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
