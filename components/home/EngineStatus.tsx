"use client";
import { useState } from "react";
import { Activity, CircleCheck } from "lucide-react";

/**
 * Replaces the former GET /api/grade link ("فحص حالة المحرك").
 * The ONEC engine runs entirely in the browser, so its status is reported
 * locally instead of hitting a server that no longer exists on a static host.
 */
export function EngineStatus(): React.ReactElement {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setChecked(true)}
        className="focus-ring inline-flex items-center gap-2 rounded-2xl border-2 border-white/40 px-7 py-3.5 font-bold text-white transition hover:border-white hover:bg-white/10"
      >
        <Activity className="size-4" />
        {checked ? "المحرك متصل" : "فحص حالة المحرك"}
      </button>
      {checked ? (
        <p className="animate-fade-up inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">
          <CircleCheck className="size-3.5" />
          ONEC Grading Engine Online • v2.0.0
        </p>
      ) : null}
    </div>
  );
}
