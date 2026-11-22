"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { TapeRule } from "@/components/brand/tape-rule";
import { useTimeline } from "@/hooks/use-timeline";
import { cn } from "@/lib/utils";

// Typing 4 · 2 · ½ on the tape keypad, with the tape drawing around the chest.
const SEQ = ["4", "2", "½"];
const STEPS = [900, 420, 420, 420, 6000];
const KEYS = ["1", "2", "3", "¼", "4", "5", "6", "½", "7", "8", "9", "¾"];

export function MeasureVisual() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const { step } = useTimeline(STEPS, { playing: inView, holdAfter: 0 });
  const typed = Math.max(0, Math.min(step, 3));
  const value = SEQ.slice(0, typed).join("");
  const pressed = step >= 1 && step <= 3 ? SEQ[step - 1] : null;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px]" role="img" aria-label="Recording a chest measurement of 42 and a half inches with Tayylo's tape keypad">
      <div className="relative overflow-hidden rounded-[32px] bg-surface-raised shadow-[var(--shadow-dialog)] ring-1 ring-border/60">
        <TapeRule className="absolute left-0 top-0 h-7 text-ink/25" />
        <div className="grid grid-cols-[0.8fr_1fr] gap-2 px-5 pb-6 pt-12 sm:px-8">
          {/* Body figure with the tape drawing on */}
          <div className="relative">
            <svg viewBox="0 0 240 520" className="h-auto w-full" aria-hidden>
              <image href="/art/body/male-front.svg" width="240" height="520" opacity="0.9" />
              <g fill="none" stroke="#B8693A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M160 150L159.66 149.11L158.64 148.24L156.96 147.4L154.64 146.6L151.73 145.86L148.28 145.19L144.35 144.61L140 144.11L135.31 143.72L130.35 143.43L125.22 143.26L120 143.2L114.78 143.26L109.65 143.43L104.69 143.72L100 144.11L95.65 144.61L91.72 145.19L88.27 145.86L85.36 146.6L83.04 147.4L81.36 148.24L80.34 149.11L80 150"
                  strokeDasharray="6 5"
                  strokeOpacity=".75"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                />
                <motion.path
                  d="M80 150L80.34 150.89L81.36 151.76L83.04 152.6L85.36 153.4L88.27 154.14L91.72 154.81L95.65 155.39L100 155.89L104.69 156.28L109.65 156.57L114.78 156.74L120 156.8L125.22 156.74L130.35 156.57L135.31 156.28L140 155.89L144.35 155.39L148.28 154.81L151.73 154.14L154.64 153.4L156.96 152.6L158.64 151.76L159.66 150.89L160 150"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: inView ? 1 : 0 }}
                  transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
                <circle cx="80" cy="150" r="3.8" fill="#B8693A" stroke="none" />
              </g>
            </svg>
          </div>

          {/* Value + keypad */}
          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-surface-sunken px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary">Torso · 1/18</span>
            <p className="mt-3 text-[22px] font-semibold tracking-[-0.02em] sm:text-[26px]">Chest</p>
            <p className="mt-1 flex items-baseline gap-1.5">
              <motion.span
                key={value || "0"}
                className={cn("tabular text-[56px] font-semibold leading-none tracking-[-0.03em] sm:text-[76px]", value ? "text-ink" : "text-border-strong")}
                style={{ transformOrigin: "left bottom" }}
                initial={value ? { scale: 0.9, y: 4 } : false}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 26 }}
              >
                {value || "0"}
              </motion.span>
              <span className="text-[18px] font-medium text-text-tertiary">in</span>
            </p>
            <p className="mt-2 text-[13px] text-text-tertiary">
              Last time <b className="tabular font-semibold text-text-secondary">41½ in</b> · 11 Mar
            </p>
            <div className="mt-5 grid grid-cols-4 gap-1.5 sm:gap-2">
              {KEYS.map(k => {
                const fraction = k === "¼" || k === "½" || k === "¾";
                const down = pressed === k;
                return (
                  <motion.span
                    key={k}
                    animate={{ scale: down ? 0.9 : 1 }}
                    transition={{ type: "spring", stiffness: 700, damping: 28 }}
                    className={cn(
                      "flex h-10 items-center justify-center rounded-[10px] text-[17px] transition-colors duration-150 sm:h-12 sm:text-[19px]",
                      fraction
                        ? down
                          ? "bg-[#DCE0CC] font-semibold text-olive-deep"
                          : "bg-olive-soft font-semibold text-olive-deep"
                        : down
                          ? "bg-beige-light font-medium"
                          : "bg-surface font-medium shadow-[var(--shadow-xs)] ring-1 ring-border/60"
                    )}
                  >
                    {k}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
