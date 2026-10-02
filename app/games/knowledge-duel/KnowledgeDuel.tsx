"use client";
import { useMemo, useState } from "react";
import { Coins, RotateCcw, Swords, Trophy } from "lucide-react";
import type { DuelQuestion } from "./page";

type Phase = "BIDDING" | "ANSWERING" | "RESULT" | "END";
type Bidder = 1 | 2;
type RoundResult = "CORRECT" | "TRAP";

const BID_AMOUNTS = [10, 20, 50, 100] as const;

/** Deterministic seeded shuffle so server and client render identically. */
function seededOrder(seed: number): [0 | 1, 0 | 1] {
  let s = seed * 9301 + 49297;
  s = (s * 9301 + 49297) % 233280;
  const r = s / 233280;
  return r < 0.5 ? [0, 1] : [1, 0];
}

export function KnowledgeDuel({ questions }: { questions: DuelQuestion[] }) {
  const [gameId, setGameId] = useState(0);
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("BIDDING");
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [bids, setBids] = useState({ player1: 0, player2: 0 });
  const [activeBidder, setActiveBidder] = useState<Bidder>(1);
  const [highestBidder, setHighestBidder] = useState<Bidder | null>(null);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  const totalRounds = questions.length;
  const current = questions[roundIndex];
  // Shuffle correct-vs-trap option order per round (seeded, hydration-safe).
  const optionOrder = useMemo(() => seededOrder(gameId * 100 + roundIndex + 7), [gameId, roundIndex]);

  if (!current) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
        لا توجد أسئلة متاحة حالياً.
      </p>
    );
  }

  const handleBid = (amount: number) => {
    if (phase !== "BIDDING") return;
    if (activeBidder === 1) {
      setBids((prev) => ({ ...prev, player1: amount }));
      setActiveBidder(2);
    } else {
      // Player 2 bids last: higher bid wins, ties go to player 1.
      const winner: Bidder = bids.player1 >= amount ? 1 : 2;
      setBids((prev) => ({ ...prev, player2: amount }));
      setHighestBidder(winner);
      setPhase("ANSWERING");
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (phase !== "ANSWERING" || highestBidder === null) return;
    const bet = highestBidder === 1 ? bids.player1 : bids.player2;
    const key = highestBidder === 1 ? "player1" : "player2";
    setScores((prev) => ({ ...prev, [key]: prev[key] + (isCorrect ? bet : -bet) }));
    setRoundResult(isCorrect ? "CORRECT" : "TRAP");
    setPhase("RESULT");
  };

  const nextRound = () => {
    if (roundIndex + 1 < totalRounds) {
      setRoundIndex((i) => i + 1);
      setBids({ player1: 0, player2: 0 });
      setActiveBidder(1);
      setHighestBidder(null);
      setRoundResult(null);
      setPhase("BIDDING");
    } else {
      setPhase("END");
    }
  };

  const restart = () => {
    setGameId((g) => g + 1);
    setRoundIndex(0);
    setScores({ player1: 0, player2: 0 });
    setBids({ player1: 0, player2: 0 });
    setActiveBidder(1);
    setHighestBidder(null);
    setRoundResult(null);
    setPhase("BIDDING");
  };

  const bet = highestBidder === 1 ? bids.player1 : bids.player2;

  if (phase === "END") {
    const winner: Bidder | 0 =
      scores.player1 > scores.player2 ? 1 : scores.player2 > scores.player1 ? 2 : 0;
    return (
      <div className="animate-fade-up rounded-3xl bg-[#0F5132] p-6 text-center text-white shadow-xl sm:p-8">
        <Trophy className="mx-auto size-10 text-amber-300" />
        <h2 className="mt-3 text-2xl font-black">
          {winner === 0 ? "تعادل مثير!" : `الفائز: اللاعب ${winner} 🎉`}
        </h2>
        <div className="mx-auto mt-5 flex max-w-xs justify-around text-xl font-black tabular-nums">
          <span className={winner === 1 ? "text-amber-300" : "text-emerald-100"}>
            اللاعب 1: {scores.player1}
          </span>
          <span className={winner === 2 ? "text-amber-300" : "text-emerald-100"}>
            اللاعب 2: {scores.player2}
          </span>
        </div>
        <button
          type="button"
          onClick={restart}
          className="focus-ring mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-[#0F5132] transition hover:bg-emerald-50"
        >
          <RotateCcw className="size-4" />
          العب مجدداً
        </button>
      </div>
    );
  }

  const options = [
    { label: "المفهوم الدقيق", text: current.correctConcept, correct: true },
    { label: "الفخ الامتحاني", text: current.trap, correct: false },
  ];
  const orderedOptions = [options[optionOrder[0]]!, options[optionOrder[1]]!];

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* scoreboard */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50/70 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div
          className={`text-sm font-black tabular-nums transition ${
            activeBidder === 1 && phase === "BIDDING"
              ? "text-[#0F5132] dark:text-emerald-300"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          اللاعب 1: {scores.player1}
          {bids.player1 > 0 && <span className="text-xs font-bold"> (رهان {bids.player1})</span>}
        </div>
        <div className="text-center">
          <p className="inline-flex items-center gap-1 text-xs font-black text-zinc-400 tabular-nums">
            <Swords className="size-3.5" />
            الجولة {roundIndex + 1} / {totalRounds}
          </p>
          <div className="mx-auto mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-[#0F5132] transition-all"
              style={{ width: `${Math.round(((roundIndex + 1) / totalRounds) * 100)}%` }}
            />
          </div>
        </div>
        <div
          className={`text-sm font-black tabular-nums transition ${
            activeBidder === 2 && phase === "BIDDING"
              ? "text-[#0F5132] dark:text-emerald-300"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          اللاعب 2: {scores.player2}
          {bids.player2 > 0 && <span className="text-xs font-bold"> (رهان {bids.player2})</span>}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {phase === "BIDDING" && (
          <div key={`bid-${gameId}-${roundIndex}`} className="animate-fade-up text-center">
            <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              سؤال غير مباشر • {current.topic}
            </span>
            <h3 className="mt-3 text-xl font-black leading-9">{current.question}</h3>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              دور <span className="font-black text-zinc-900 dark:text-zinc-100">اللاعب {activeBidder}</span>{" "}
              للمزايدة بالنقاط
              {activeBidder === 2 && bids.player1 > 0 && (
                <span> — رهان اللاعب 1: <span className="font-black tabular-nums">{bids.player1}</span> (تعادلُه يكسبه المزاد)</span>
              )}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3" role="group" aria-label="مبالغ المزايدة">
              {BID_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleBid(val)}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-[#0F5132] px-6 py-3 font-mono text-lg font-black text-white tabular-nums transition hover:bg-[#0a3a24] active:scale-95"
                >
                  <Coins className="size-4" />
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "ANSWERING" && highestBidder !== null && (
          <div key={`ans-${gameId}-${roundIndex}`} className="animate-fade-up">
            <div className="text-center">
              <h3 className="text-lg font-black leading-8 text-zinc-700 dark:text-zinc-200">
                {current.question}
              </h3>
              <p className="mt-2 inline-block rounded-full bg-[#0F5132] px-4 py-1.5 text-sm font-black text-white tabular-nums">
                اللاعب {highestBidder} يجيب — الرهان: {bet} نقطة
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-3" role="group" aria-label="خيارات الإجابة">
              {orderedOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => handleAnswer(opt.correct)}
                  className="focus-ring rounded-xl border-2 border-zinc-200 p-4 text-right transition hover:border-[#0F5132] hover:bg-emerald-50/50 active:scale-[0.99] dark:border-zinc-700 dark:hover:bg-emerald-950/30"
                >
                  <span className="block text-xs font-bold text-zinc-400">{opt.label}:</span>
                  <span className="mt-1 block text-[15px] font-bold leading-8">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "RESULT" && (
          <div key={`res-${gameId}-${roundIndex}`} className="animate-fade-up text-center" role="status" aria-live="polite">
            {roundResult === "CORRECT" ? (
              <div>
                <div className="text-5xl" aria-hidden="true">🎯</div>
                <h3 className="mt-3 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  إجابة دقيقة! +{bet}
                </h3>
                <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  المفهوم الصحيح: {current.correctConcept}
                </p>
              </div>
            ) : (
              <div>
                <div className="text-5xl" aria-hidden="true">🪤</div>
                <h3 className="mt-3 text-2xl font-black text-red-500">وقعت في الفخ! {bet}-</h3>
                <p className="mx-auto mt-3 max-w-md rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-7 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                  {current.trap}
                </p>
                <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                  الصواب: {current.correctConcept}
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={nextRound}
              className="focus-ring mt-5 rounded-xl bg-zinc-900 px-8 py-3 text-sm font-black text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            >
              {roundIndex + 1 < totalRounds ? "الجولة التالية" : "النتيجة النهائية"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
