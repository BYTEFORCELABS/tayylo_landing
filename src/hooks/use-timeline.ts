"use client";

import * as React from "react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/**
 * Drives a scripted scene: returns the current step index, advancing after
 * each step's duration while `playing`. Restarts from 0 when `runKey`
 * changes. With reduced motion it jumps straight to the final step and
 * holds, so every demo still shows its finished state.
 */
export function useTimeline(
  durations: readonly number[],
  { playing = true, runKey = 0, onDone, holdAfter = 2400 }: { playing?: boolean; runKey?: number | string; onDone?: () => void; holdAfter?: number } = {}
) {
  const reduce = useSafeReducedMotion();
  const last = durations.length - 1;
  const [rawStep, setStep] = React.useState(0);
  const [prevKey, setPrevKey] = React.useState(runKey);
  // Restart on a new run (state reset during render, React's recommended pattern).
  if (prevKey !== runKey) {
    setPrevKey(runKey);
    setStep(0);
  }
  const step = reduce ? last : rawStep;

  const doneRef = React.useRef(onDone);
  React.useEffect(() => {
    doneRef.current = onDone;
  });

  React.useEffect(() => {
    if (!playing) return;
    if (reduce) {
      const t = setTimeout(() => doneRef.current?.(), 7000);
      return () => clearTimeout(t);
    }
    if (step >= last) {
      const t = setTimeout(() => doneRef.current?.(), durations[last] + holdAfter);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(s => Math.min(s + 1, last)), durations[step]);
    return () => clearTimeout(t);
  }, [step, playing, reduce, last, durations, holdAfter]);

  return { step, reduce: Boolean(reduce) };
}
