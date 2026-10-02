import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  FileText,
  GraduationCap,
  ListChecks,
  ShieldCheck,
  Sparkles,
  WifiOff,
  Zap,
} from "lucide-react";
import { GradeDemo } from "@/components/home/GradeDemo";
import { EngineStatus } from "@/components/home/EngineStatus";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SUBJECTS } from "@/lib/data/subjects";
import { QUESTION_BANK } from "@/lib/data/questions";
import { LESSONS } from "@/lib/data/lessons";

const STATS = [
  { value: "8", label: "أسئلة تفاعلية مصححة" },
  { value: "6", label: "دروس وملخصات مركزة" },
  { value: "133", label: "مصطلحاً وشخصية وتاريخاً" },
  { value: "12", label: "دورة بكالوريا مؤرشفة" },
] as const;

const STEPS = [
  {
    n: "01",
    title: "اختر السؤال",
    text: "أسئلة مصنفة حسب دليل ONEC: تعريف شخصيات، تواريخ، توقيع خرائط، تعليق جداول وتحليل أحداث.",
  },
  {
    n: "02",
    title: "اكتب إجابتك بحرية",
    text: "محرر عربي مريح مع أمثلة وزارية جاهزة، يعمل حتى دون اتصال بالإنترنت.",
  },
  {
    n: "03",
    title: "استلم تصحيحاً وزارياً",
    text: "علامة دقيقة، تعليل، تصحيح نموذجي وسبب الخصم — كما يصحح الأستاذ الحقيقي.",
  },
] as const;

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "صرامة ONEC الحرفية",
    text: "كل عنصر أساسي (اسم، تاريخ، دور) يمنح جزءاً من العلامة — بلا مجاملة، كما في قاعات التصحيح.",
  },
  {
    icon: WifiOff,
    title: "يعمل دون إنترنت",
    text: "محرك حتمي مدمج + تخزين Dexie.js للمراجعة في المناطق ضعيفة التغطية.",
  },
  {
    icon: Zap,
    title: "تصحيح فوري",
    text: "نتيجة في أقل من ثانية في الوضع الحتمي، وتدقيق AI عند توفر المفتاح.",
  },
  {
    icon: ListChecks,
    title: "شبكات تقييم جاهزة",
    text: "مؤشرات ونقاط مخصصة لكل سؤال: تعريف، تسلسل زمني، تعليق على جدول، مقالة.",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ---------- NAV ---------- */}
      <header className="glass sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-[#0F5132] text-white shadow-lg shadow-emerald-900/20">
              <GraduationCap className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-black">BAC Mentor AI</span>
              <span className="block text-[11px] font-semibold text-[#0F5132] dark:text-emerald-400">
                مدرّس التاريخ الذكي
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-600 md:flex dark:text-zinc-300">
            <Link href="/history" className="transition hover:text-[#0F5132]">
              قاعدة التاريخ
            </Link>
            <Link href="/courses" className="transition hover:text-[#0F5132]">
              الدروس
            </Link>
            <Link href="/exams" className="transition hover:text-[#0F5132]">
              الأوراق
            </Link>
            <Link href="/dashboard" className="transition hover:text-[#0F5132]">
              لوحتي
            </Link>
            <a href="#bank" className="transition hover:text-[#0F5132]">
              بنك الأسئلة
            </a>
            <a href="#demo" className="transition hover:text-[#0F5132]">
              جرّب التصحيح
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:inline-flex dark:bg-emerald-950/60 dark:text-emerald-300">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              المحرك يعمل
            </span>
            <Link
              href="/dashboard"
              className="focus-ring hidden rounded-xl border-2 border-zinc-200 px-4 py-2 text-sm font-bold transition hover:border-[#0F5132] sm:inline-block dark:border-zinc-700"
            >
              لوحتي
            </Link>
            <Link
              href="#demo"
              className="focus-ring rounded-xl bg-[#0F5132] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0a3a24]"
            >
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div className="bg-grid-light dark:bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div
          className="animate-blob absolute -top-24 right-[10%] size-72 rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-900/40"
          aria-hidden="true"
        />
        <div
          className="animate-blob absolute top-32 left-[5%] size-72 rounded-full bg-sky-200/50 blur-3xl [animation-delay:4s] dark:bg-sky-900/30"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-1.5 text-xs font-bold text-[#0F5132] shadow-sm dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-300">
              <BadgeCheck className="size-4" />
              قاعدة V5 (جناح الدروس) — مطابق لدليل ONEC 2025
            </p>
            <h1 className="animate-fade-up-1 text-balance mt-5 text-4xl font-black leading-[1.25] sm:text-5xl sm:leading-[1.25]">
              أتقن <span className="text-[#0F5132] dark:text-emerald-400">تاريخ البكالوريا</span>:
              دروس، مصطلحات، شخصيات وتواريخ
            </h1>
            <p className="animate-fade-up-2 mx-auto mt-4 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg sm:leading-9 dark:text-zinc-300">
              منصة مجانية لمراجعة التاريخ والجغرافيا: تدرّب على أسئلة الباك، واحصل على علامة
              وتعليل وتصحيح نموذجي — حتى دون اتصال بالإنترنت.
            </p>
            <div className="animate-fade-up-3 mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/history"
                className="focus-ring group inline-flex items-center gap-2 rounded-2xl bg-[#0F5132] px-7 py-3.5 font-bold text-white shadow-xl shadow-emerald-900/20 transition hover:bg-[#0a3a24]"
              >
                <Sparkles className="size-4" />
                استكشف قاعدة التاريخ
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="#demo"
                className="focus-ring inline-flex items-center gap-2 rounded-2xl border-2 border-zinc-200 bg-white px-7 py-3 font-bold transition hover:border-[#0F5132] dark:border-zinc-700 dark:bg-zinc-900"
              >
                <BookOpen className="size-4" />
                جرّب التصحيح الفوري
              </Link>
            </div>

            {/* stats */}
            <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-zinc-200/80 bg-white/80 px-3 py-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80"
                >
                  <dt className="order-2 mt-1 block text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                    {s.label}
                  </dt>
                  <dd className="text-xl font-black text-[#0F5132] dark:text-emerald-400">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- HISTORY DATABASE ---------- */}
      <section id="subjects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black tracking-wide text-[#0EA5E9]">قاعدة البيانات</p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">قاعدة التاريخ V5 الاحترافية</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-500 dark:text-zinc-400">
            دروس مفصلة بالعناصر، ملخصات مركزة، أسئلة غير مباشرة بفخاخها، مصطلحات وشخصيات بسلم
            التنقيط، تواريخ، خرائط صماء، بطاقات مراجعة وأرشيف 2015–2026.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            href="/history/units"
            className="focus-ring group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="inline-grid size-11 place-items-center rounded-xl bg-sky-50 dark:bg-sky-950/40">
              <BookOpen className="size-5 text-[#0EA5E9]" />
            </span>
            <h3 className="mt-4 text-lg font-black">8 دروس مفصلة</h3>
            <p className="mt-2 text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">
              3 وحدات و8 وضعيات بالعناصر الكاملة + ملخصات مركزة ونصائح البكالوريا لكل درس.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0EA5E9] transition group-hover:gap-2">
              ابدأ الدروس
              <ArrowLeft className="size-3.5" />
            </span>
          </Link>
          <Link
            href="/history/flashcards"
            className="focus-ring group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="inline-grid size-11 place-items-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
              <ListChecks className="size-5 text-[#0F5132] dark:text-emerald-400" />
            </span>
            <h3 className="mt-4 text-lg font-black">133 بطاقة مراجعة</h3>
            <p className="mt-2 text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">
              41 مصطلحاً + 65 تاريخاً + 27 شخصية — اختبر نفسك بالتقليب مع تتبع التقدم.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0F5132] transition group-hover:gap-2 dark:text-emerald-400">
              راجع بالبطاقات
              <ArrowLeft className="size-3.5" />
            </span>
          </Link>
          <Link
            href="/history/bac-archives"
            className="focus-ring group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="inline-grid size-11 place-items-center rounded-xl bg-amber-50 dark:bg-amber-950/30">
              <FileText className="size-5 text-[#C9A227]" />
            </span>
            <h3 className="mt-4 text-lg font-black">أرشيف 2015–2026</h3>
            <p className="mt-2 text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">
              12 دورة بكالوريا رسمية بالموضوعين والحلول والنقاط الرسمية لكل سؤال.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#C9A227] transition group-hover:gap-2">
              تصفح الأرشيف
              <ArrowLeft className="size-3.5" />
            </span>
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/history"
            className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-[#0F5132] px-7 py-3 font-bold text-white shadow-lg transition hover:bg-[#0a3a24]"
          >
            ادخل قاعدة التاريخ الكاملة
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </section>

      {/* ---------- QUESTION BANK ---------- */}
      <section id="bank" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black tracking-wide text-[#0EA5E9]">بنك الأسئلة</p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">8 أسئلة حقيقية بانتظار إجابتك</h2>
          </div>
          <div className="flex gap-2">
          <Link
            href="/exams"
            className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#0F5132] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0a3a24]"
          >
            <FileText className="size-4" />
            أوراق بنمط البكالوريا
          </Link>
          <Link
            href="/courses"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border-2 border-zinc-200 bg-white px-5 py-2.5 text-sm font-bold transition hover:border-[#0F5132] dark:border-zinc-700 dark:bg-zinc-900"
          >
            <BookOpen className="size-4" />
            راجع الدروس أولاً
          </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {SUBJECTS.map((s) => {
            const qs = QUESTION_BANK.filter((q) => q.subject === s.key).slice(0, 3);
            const lessons = LESSONS.filter((l) => l.subject === s.key).length;
            return (
              <div
                key={s.key}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-black">{s.arName}</h3>
                  <span className="text-xs font-bold text-zinc-400 tabular-nums">
                    {lessons} دروس • {QUESTION_BANK.filter((q) => q.subject === s.key).length} أسئلة
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {qs.map((q) => (
                    <Link
                      key={q.id}
                      href={`/practice/${s.key}/${q.index}`}
                      className="focus-ring flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3 text-sm transition hover:bg-emerald-50 dark:bg-zinc-800/60 dark:hover:bg-emerald-950/40"
                    >
                      <span className="font-semibold">
                        <span className="ml-2 rounded-md bg-white px-1.5 py-0.5 text-[11px] font-black text-[#0F5132] tabular-nums dark:bg-zinc-900 dark:text-emerald-400">
                          {q.type}
                        </span>
                        {q.prompt.length > 64 ? `${q.prompt.slice(0, 64)}…` : q.prompt}
                      </span>
                      <ArrowLeft className="size-4 shrink-0 text-zinc-400" />
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href={`/practice/${s.key}/1`}
                    className="text-xs font-black transition"
                    style={{ color: s.accent }}
                  >
                    ابدأ من السؤال الأول ←
                  </Link>
                  <span className="text-xs text-zinc-300">|</span>
                  <Link href={`/courses/${s.key}`} className="text-xs font-black text-zinc-500 transition hover:text-[#0F5132]">
                    دروس {s.arName} ←
                  </Link>
                  <span className="text-xs text-zinc-300">|</span>
                  <Link href="/history" className="text-xs font-black text-[#0F5132] transition hover:underline dark:text-emerald-300">
                    قاعدة التاريخ V5: دروس + مصطلحات + تواريخ + أرشيف ←
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- LIVE DEMO ---------- */}
      <section id="demo" className="scroll-mt-20 border-y border-zinc-200/70 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-black tracking-wide text-[#0EA5E9]">تجربة حية</p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">عرّف شخصية تاريخية وشاهد الصرامة الوزارية</h2>
            <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
              هذا تصحيح حقيقي عبر <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">ONEC ENGINE</code> يعمل داخل متصفحك —
              جرّب إجابة كاملة العناصر وإجابة ناقصة، ولاحظ كيف تُحتسب العلامة عنصراً بعنصر.
            </p>
          </div>
          <div className="mt-6">
            <GradeDemo />
          </div>
        </div>
      </section>

      {/* ---------- HOW ---------- */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
        <h2 className="text-center text-2xl font-black sm:text-3xl">كيف يعمل؟ ثلاث خطوات فقط</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="text-4xl font-black text-zinc-100 tabular-nums dark:text-zinc-800">{s.n}</span>
              <h3 className="mt-2 font-black">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-[#0F5132] dark:bg-emerald-950/60 dark:text-emerald-300">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-3 text-[15px] font-black">{f.title}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#0F5132] px-6 py-12 text-center text-white shadow-2xl shadow-emerald-900/30 sm:px-12">
          <div className="bg-grid-dark absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="animate-float-slow absolute -left-10 -top-10 size-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="animate-float-slow absolute -bottom-12 -right-10 size-56 rounded-full bg-[#C9A227]/30 blur-2xl [animation-delay:2s]" aria-hidden="true" />
          <div className="relative">
            <p className="quran-text mx-auto max-w-xl text-white/95">
              ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
            </p>
            <h2 className="mx-auto mt-3 max-w-xl text-2xl font-black leading-snug sm:text-3xl">
              ابدأ أول تصحيح وزاري لك — مجاناً وبدون حساب
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/practice/HISTORY_GEOGRAPHY/1"
                className="focus-ring inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-black text-[#0F5132] transition hover:bg-emerald-50"
              >
                <BookOpen className="size-4" />
                تدريب التاريخ والجغرافيا
              </Link>
              <EngineStatus />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-500 sm:px-6 dark:text-zinc-400">
          <p className="font-bold">BAC Mentor AI © 2026 — منصة مجانية لمراجعة تاريخ البكالوريا</p>
          <p className="tabular-nums" dir="ltr">
            PWA Offline: Dexie.js • Vector: pgvector 1536 • ONEC 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
