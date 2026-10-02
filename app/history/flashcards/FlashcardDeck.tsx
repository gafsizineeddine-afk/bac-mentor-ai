"use client";
import { useEffect, useMemo, useState } from "react";
import { Check, Eye, RotateCcw, Shuffle, X } from "lucide-react";
import { getFlashcards } from "@/lib/history";
import type { Flashcard, FlashcardType, PersonalityAnswer } from "@/types/history";

const TYPE_FILTERS: { value: FlashcardType | "all"; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "TERM", label: "مصطلحات" },
  { value: "CHRONOLOGY_DATE_TO_EVENT", label: "تواريخ" },
  { value: "PERSONALITY", label: "شخصيات" },
];

const UNIT_FILTERS = [
  { value: 0, label: "كل الوحدات" },
  { value: 1, label: "وحدة 1" },
  { value: 2, label: "وحدة 2" },
  { value: 3, label: "وحدة 3" },
];

const STORAGE_KEY = "bac-history-flashcards-known";

function loadKnown(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function CardBack({ card }: { card: Flashcard }) {
  if (card.type === "PERSONALITY") {
    const b = card.back as PersonalityAnswer;
    return (
      <div className="space-y-2 text-right text-sm leading-7">
        <p>
          <span className="font-black">الجنسية: </span>
          {b.nationality}
        </p>
        <p>
          <span className="font-black">الصفة: </span>
          {b.official_role}
        </p>
        <ul className="space-y-1">
          {b.key_actions.map((a) => (
            <li key={a.slice(0, 28)} className="flex items-start gap-1.5">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/80" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>
        <p className="rounded-lg bg-white/15 p-2 text-[13px]">
          <span className="font-black">تنبيه: </span>
          {b.exam_alert}
        </p>
      </div>
    );
  }
  if (card.type === "CHRONOLOGY_DATE_TO_EVENT") {
    const b = card.back as { exact_event: string };
    return <p className="text-center text-lg font-black leading-9">{b.exact_event}</p>;
  }
  const b = card.back as { ideal_answer: string };
  return <p className="text-center text-[15px] font-bold leading-8">{b.ideal_answer}</p>;
}

export function FlashcardDeck() {
  const [type, setType] = useState<FlashcardType | "all">("all");
  const [unit, setUnit] = useState(0);
  const [tier, setTier] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);

  const cards = useMemo(
    () => getFlashcards(type, unit === 0 ? undefined : unit, tier === 0 ? undefined : tier),
    [type, unit, tier]
  );

  useEffect(() => {
    setKnown(loadKnown());
  }, []);

  useEffect(() => {
    setOrder(cards.map((c) => c.card_id));
    setIndex(0);
    setFlipped(false);
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(known));
    } catch {
      /* ignore */
    }
  }, [known]);

  const ordered = useMemo(
    () =>
      order
        .map((id) => cards.find((c) => c.card_id === id))
        .filter((c): c is Flashcard => c !== undefined),
    [order, cards]
  );
  const current = ordered[index];
  const knownInDeck = ordered.filter((c) => known.includes(c.card_id)).length;
  const progress = ordered.length > 0 ? Math.round((knownInDeck / ordered.length) * 100) : 0;

  const shuffle = () => {
    const shuffled = [...order];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const a = shuffled[i];
      const b = shuffled[j];
      if (a !== undefined && b !== undefined) {
        shuffled[i] = b;
        shuffled[j] = a;
      }
    }
    setOrder(shuffled);
    setIndex(0);
    setFlipped(false);
  };

  const mark = (isKnown: boolean) => {
    if (!current) return;
    setKnown((prev) =>
      isKnown ? [...new Set([...prev, current.card_id])] : prev.filter((id) => id !== current.card_id)
    );
    setFlipped(false);
    setIndex((i) => (ordered.length > 0 ? (i + 1) % ordered.length : 0));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="نوع البطاقات">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setType(f.value)}
            aria-pressed={type === f.value}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
              type === f.value
                ? "bg-[#0F5132] text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="mx-1 hidden w-px bg-zinc-200 sm:inline-block dark:bg-zinc-700" aria-hidden="true" />
        {UNIT_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setUnit(f.value)}
            aria-pressed={unit === f.value}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
              unit === f.value
                ? "bg-[#0EA5E9] text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="مستوى الأولوية">
        {[
          { value: 0, label: "كل المستويات" },
          { value: 1, label: "1: النواة الصلبة" },
          { value: 2, label: "2: الفهم والسياق" },
          { value: 3, label: "3: شبكة الأمان" },
        ].map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setTier(f.value)}
            aria-pressed={tier === f.value}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
              tier === f.value
                ? "bg-[#C9A227] text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <p className="font-bold tabular-nums" role="status">
          البطاقة {ordered.length > 0 ? index + 1 : 0} / {ordered.length} • أتقنت {knownInDeck} ({progress}%)
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={shuffle}
            className="focus-ring inline-flex items-center gap-1 rounded-xl border border-zinc-200 px-3 py-1.5 text-xs font-bold transition hover:border-[#0F5132] dark:border-zinc-700"
          >
            <Shuffle className="size-3.5" />
            خلط
          </button>
          <button
            type="button"
            onClick={() => {
              setKnown([]);
              setIndex(0);
              setFlipped(false);
            }}
            className="focus-ring inline-flex items-center gap-1 rounded-xl border border-zinc-200 px-3 py-1.5 text-xs font-bold transition hover:border-red-400 hover:text-red-500 dark:border-zinc-700"
          >
            <RotateCcw className="size-3.5" />
            تصفير
          </button>
        </div>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      {current ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            aria-label={flipped ? "عرض السؤال" : "عرض الإجابة"}
            className="focus-ring block min-h-[280px] w-full rounded-3xl bg-[#0F5132] p-6 text-white shadow-lg transition active:scale-[0.99] sm:p-8"
          >
            <p className="text-xs font-bold text-emerald-200 tabular-nums">
              {current.card_id} •{" "}
              {current.type === "TERM" ? "مصطلح" : current.type === "PERSONALITY" ? "شخصية" : "تاريخ"}
              {known.includes(current.card_id) ? " • ✓ متقنة" : ""}
            </p>
            {!flipped ? (
              <span className="mt-4 block whitespace-pre-line text-center text-lg font-black leading-9">
                {current.front}
              </span>
            ) : (
              <span className="mt-4 block">
                <CardBack card={current} />
              </span>
            )}
            <span className="mt-4 inline-flex items-center gap-1 text-xs text-emerald-200">
              <Eye className="size-3.5" />
              {flipped ? "اضغط لعرض السؤال" : "اضغط لكشف الإجابة"}
            </span>
          </button>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => mark(false)}
              className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-red-200 bg-white px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:bg-zinc-900 dark:hover:bg-red-950/40"
            >
              <X className="size-4" />
              لم أتقنها بعد
            </button>
            <button
              type="button"
              onClick={() => mark(true)}
              className="focus-ring inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              <Check className="size-4" />
              أتقنتها ✓
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
          لا بطاقات في هذا التحديد — غيّر النوع أو الوحدة.
        </p>
      )}
    </div>
  );
}
