"use client";

import * as React from "react";
import { animate } from "motion/react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";

/** Counts from `from` to `value` when `run` turns true. Text only — no layout work. */
export function CountUp({
  value,
  from = 0,
  run = true,
  format = (n: number) => String(Math.round(n)),
  duration = 1.4,
}: {
  value: number;
  from?: number;
  run?: boolean;
  format?: (n: number) => string;
  duration?: number;
}) {
  const reduce = useSafeReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const fmt = React.useRef(format);
  React.useEffect(() => {
    fmt.current = format;
  });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!run || reduce) {
      el.textContent = fmt.current(run || reduce ? value : from);
      return;
    }
    const controls = animate(from, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: v => {
        el.textContent = fmt.current(v);
      },
    });
    return () => controls.stop();
  }, [value, from, run, reduce, duration]);

  return (
    <span ref={ref} className="tabular">
      {format(reduce ? value : from)}
    </span>
  );
}
