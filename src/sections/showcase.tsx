"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Pause, Play } from "lucide-react";
import { PhoneFrame } from "@/components/phone/phone-frame";
import { scenes } from "@/components/phone/scenes";
import { SectionHeading } from "@/components/ui/section-heading";
import { TapeRule } from "@/components/brand/tape-rule";
import { useTimeline } from "@/hooks/use-timeline";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HOLD = 2400;

export function Showcase() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [index, setIndex] = React.useState(0);
  const [run, setRun] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const playing = inView && !paused;

  const scene = scenes[index];
  const select = (i: number) => {
    setIndex(i);
    setRun(r => r + 1);
  };
  const { step, reduce } = useTimeline(scene.steps, {
    playing,
    runKey: `${index}-${run}`,
    holdAfter: HOLD,
    onDone: () => select((index + 1) % scenes.length),
  });
  const Scene = scene.Component;

  // Progress follows the timeline step by step, so pausing freezes it in place.
  const total = scene.steps.reduce((a, b) => a + b, 0) + HOLD;
  const last = scene.steps.length - 1;
  const before = scene.steps.slice(0, step).reduce((a, b) => a + b, 0);
  const progress = playing ? (step >= last ? 1 : (before + scene.steps[step]) / total) : before / total;
  const progressDuration = playing ? (step >= last ? scene.steps[last] + HOLD : scene.steps[step]) / 1000 : 0.2;

  return (
    <section id="features" aria-labelledby="showcase-title" className="on-dark relative overflow-hidden bg-panel text-text-inverse">
      <TapeRule units={40} unit={96} scale={1.5} className="absolute left-0 top-0 h-[42px] w-[3900px] text-text-inverse/35" />
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-8 lg:pb-32 lg:pt-36">
        <SectionHeading
          tone="dark"
          eyebrow="See it at work"
          lines={["Watch a whole job,", <span key="e" className="text-olive-pale">start to finish.</span>]}
          intro="These are the real Tayylo screens. Pick a step and watch it play, or let the whole job run from the first measurement to the invoice."
        />
        <span id="showcase-title" className="sr-only">
          Tayylo app demonstrations
        </span>

        <div ref={ref} className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 xl:gap-28">
          {/* Chapter list */}
          <div role="tablist" aria-label="Demonstrations" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
            {scenes.map((s, i) => {
              const on = i === index;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={on}
                  aria-controls="showcase-phone"
                  onClick={() => select(i)}
                  className={cn(
                    "group relative shrink-0 overflow-hidden rounded-full text-left transition-colors duration-300 lg:rounded-[20px]",
                    "px-4 py-2.5 lg:px-5 lg:py-4",
                    on ? "bg-text-inverse/10" : "hover:bg-text-inverse/5"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={cn("tabular text-[12px] font-semibold", on ? "text-olive-pale" : "text-text-on-panel/60")}>0{i + 1}</span>
                    <span className={cn("whitespace-nowrap text-[15px] font-semibold lg:text-[17px]", on ? "text-text-inverse" : "text-text-on-panel/80")}>
                      <span className="lg:hidden">{s.kicker}</span>
                      <span className="hidden lg:inline">{s.title}</span>
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        className="hidden overflow-hidden pl-[34px] text-[14.5px] leading-relaxed text-text-on-panel lg:block"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE.emphasized }}
                      >
                        <span className="block pt-2">{s.body}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {on && !reduce && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-text-inverse/10">
                      <motion.span
                        key={`${index}-${run}`}
                        className="block h-full origin-left bg-olive-pale"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: progress }}
                        transition={{ duration: progressDuration, ease: "linear" }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Phone */}
          <div className="relative mx-auto">
            <div aria-hidden className="absolute left-1/2 top-1/2 size-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(169,179,134,0.22),transparent)]" />
            <PhoneFrame className="relative w-[272px] sm:w-[318px] lg:w-[340px]" label={`${scene.title}: ${scene.body}`}>
              <div id="showcase-phone" role="tabpanel" className="h-full">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={`${index}-${run}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: EASE.out }}
                  >
                    <Scene step={step} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </PhoneFrame>
            <button
              onClick={() => setPaused(p => !p)}
              className="absolute -bottom-14 left-1/2 inline-flex h-10 -translate-x-1/2 items-center gap-2 rounded-full px-4 text-[13px] font-semibold text-text-on-panel ring-1 ring-text-inverse/20 transition-colors hover:bg-text-inverse/10"
              aria-label={paused ? "Play demonstration" : "Pause demonstration"}
            >
              {paused ? <Play size={14} strokeWidth={2} /> : <Pause size={14} strokeWidth={2} />}
              {paused ? "Play" : "Pause"}
            </button>
          </div>

          {/* Caption (current chapter) */}
          <div className="mt-8 text-center lg:hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE.emphasized }}
                className="mx-auto max-w-sm"
              >
                <p className="eyebrow text-olive-pale">{scene.kicker}</p>
                <p className="display mt-3 text-[1.7rem] sm:text-[2rem]">{scene.title}</p>
                <p className="mt-4 text-[16px] leading-relaxed text-text-on-panel">{scene.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
