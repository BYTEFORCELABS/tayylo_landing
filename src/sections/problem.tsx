"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { BellRing, CheckCircle2, History, Images, Pause, Play, Search, Trash2, Wallet, type LucideIcon } from "lucide-react";
import { PhoneFrame } from "@/components/phone/phone-frame";
import { HistoryScene } from "@/components/phone/scenes/history-scene";
import { SectionHeading } from "@/components/ui/section-heading";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { EASE } from "@/lib/motion";

const PAIRS: { note: string; problem: string; icon: LucideIcon; answer: string; detail: string }[] = [
  {
    note: "John S. chest 41½? or 42",
    problem: "Re-measuring returning clients",
    icon: Search,
    answer: "Find any client in two seconds",
    detail: "Search by name, phone, tag or note, from any screen.",
  },
  {
    note: "Kofi senator, use old numbers??",
    problem: "Remakes from outdated numbers",
    icon: History,
    answer: "Every visit kept as a dated version",
    detail: "Compare any two sets and restore an old one. Nothing is overwritten.",
  },
  {
    note: "Ngozi agbada due Fri (which Fri?)",
    problem: "Missed due dates",
    icon: BellRing,
    answer: "Alerts before anything slips",
    detail: "Overdue, due soon and ready for pickup, right on your home screen.",
  },
  {
    note: "Priya paid 100 or was it 150",
    problem: "Forgotten balances",
    icon: Wallet,
    answer: "Balances that count themselves",
    detail: "Record each payment by transfer, cash, card or mobile money.",
  },
  {
    note: "fabric pic somewhere in WhatsApp",
    problem: "Photos lost in chats",
    icon: Images,
    answer: "Photos kept with the client and the order",
    detail: "Fabric, style references and fitting photos in one place.",
  },
];

/*
 * The story in four beats: the notebook arrives, every scribble gets struck
 * out, the page is screwed up and tossed in the bin, and Tayylo rises in its
 * place showing the same client with every number saved and dated.
 */
type Phase = "idle" | "notebook" | "toss" | "app";
const STRIKE_START = 0.6;
const STRIKE_GAP = 0.32;
// How long each beat stays on screen before the next one starts (ms).
const HOLD = { notebook: 3300, toss: 1000, app: 4800 } as const;

/**
 * Loops the story for as long as it is playing. Each beat schedules only the
 * next one, so pausing simply holds the current beat on screen.
 */
function useStory(start: boolean, playing: boolean, reduce: boolean) {
  const [stage, setStage] = React.useState<"notebook" | "toss" | "app">("notebook");
  const [loop, setLoop] = React.useState(0);

  React.useEffect(() => {
    if (!start || reduce || !playing) return;
    const id = setTimeout(() => {
      if (stage === "notebook") setStage("toss");
      else if (stage === "toss") setStage("app");
      else {
        setStage("notebook");
        setLoop(l => l + 1);
      }
    }, HOLD[stage]);
    return () => clearTimeout(id);
  }, [start, playing, reduce, stage]);

  const phase: Phase = !start ? "idle" : reduce ? "app" : stage;
  return { phase, loop };
}

function NotebookPage({ phase }: { phase: Phase }) {
  const struck = phase !== "idle";
  return (
    <div
      className="relative overflow-hidden rounded-[6px] bg-[#FBF7EC] px-4 pb-8 pt-10 shadow-[0_30px_60px_-30px_rgba(30,32,25,0.35),0_2px_6px_rgba(30,32,25,0.06)] sm:px-10"
      style={{
        backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent 47px, rgba(63,97,117,0.18) 47px, rgba(63,97,117,0.18) 48px)",
        backgroundPosition: "0 22px",
      }}
    >
      <span aria-hidden className="absolute inset-y-0 left-10 w-px bg-[#C9624F]/40 sm:left-16" />
      <p className="relative pl-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#3F6175]/70 sm:pl-10">Clients, Book 4</p>
      <ul className="relative mt-3">
        {PAIRS.map((p, i) => (
          <li key={p.note} className="relative flex h-12 items-center pl-8 sm:pl-10">
            <span className="relative whitespace-nowrap font-hand text-[18px] text-[#2B3A55] min-[400px]:text-[20px] sm:text-[25px]">
              {p.note}
              <motion.span
                aria-hidden
                className="absolute left-[-4px] right-[-4px] top-1/2 h-[2px] origin-left rounded-full bg-[#9C3D2C]/80"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: struck ? 1 : 0 }}
                transition={struck ? { duration: 0.5, ease: EASE.out, delay: STRIKE_START + i * STRIKE_GAP } : { duration: 0 }}
              />
            </span>
          </li>
        ))}
      </ul>
      <p className="relative mt-6 pl-8 text-[13px] text-text-tertiary sm:pl-10">
        The real cost: remakes, missed dates, forgotten balances, and a business that can&rsquo;t grow past what you remember.
      </p>
    </div>
  );
}

function Story() {
  const ref = React.useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const visible = useInView(ref);
  const reduce = useSafeReducedMotion();
  const [paused, setPaused] = React.useState(false);
  const { phase, loop } = useStory(started, visible && !paused, reduce);
  const showNotebook = phase === "idle" || phase === "notebook";
  const showBin = phase === "toss";
  const showApp = phase === "app";

  return (
    <div ref={ref} className="relative">
      <div className="relative h-[560px] sm:h-[640px]">
        {/* Notebook: arrives, gets struck through, then is screwed up and thrown away */}
        <AnimatePresence>
          {showNotebook && (
            <motion.div
              key={`notebook-${loop}`}
              className="absolute inset-x-0 top-6 origin-center"
              initial={{ opacity: 0, rotate: -2.5, y: 30 }}
              animate={phase === "idle" ? { opacity: 0, rotate: -2.5, y: 30 } : { opacity: 1, rotate: -1.2, y: 0 }}
              exit={{
                x: ["0%", "-4%", "-32%"],
                y: [0, -40, 330],
                rotate: [-1.2, 8, -55],
                scale: [1, 0.86, 0.12],
                opacity: [1, 1, 0],
                transition: { duration: 0.95, times: [0, 0.3, 1], ease: "easeIn" },
              }}
              transition={{ duration: 1, ease: EASE.emphasized }}
            >
              <NotebookPage phase={phase} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The bin it lands in */}
        <AnimatePresence>
          {showBin && (
            <motion.div
              key="bin"
              aria-hidden
              className="absolute bottom-2 left-[14%] flex size-16 items-center justify-center rounded-full bg-danger-bg text-danger ring-1 ring-danger/15 sm:size-[72px]"
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: [0, 0, -12, 10, -6, 0] }}
              exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: EASE.emphasized, rotate: { duration: 0.6, delay: 0.75 } }}
            >
              <Trash2 size={28} strokeWidth={1.75} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tayylo rises in its place */}
        <AnimatePresence>
          {showApp && (
            <motion.div
              key="app"
              className="absolute inset-0 flex items-start justify-center font-app"
              initial={reduce ? false : { opacity: 0, y: 160, scale: 0.88, rotate: 6 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.9 }}
            >
              <div className="relative">
                <div aria-hidden className="absolute left-1/2 top-1/2 size-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(169,179,134,0.35),transparent)]" />
                <PhoneFrame className="relative w-[250px] sm:w-[290px]" label="The same client in Tayylo: John Smith's measurements, saved and dated">
                  <HistoryScene step={2} />
                </PhoneFrame>
                <motion.div
                  className="absolute -left-6 bottom-[9%] flex items-center gap-2 rounded-full bg-ink py-2 pl-2.5 pr-4 text-[13px] font-semibold text-text-inverse shadow-[var(--shadow-float)] sm:-left-16"
                  initial={reduce ? false : { opacity: 0, x: -16, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE.emphasized, delay: reduce ? 0 : 0.7 }}
                >
                  <CheckCircle2 size={16} strokeWidth={2} className="text-olive-pale" />
                  Chest 42½ in, saved 11 Mar
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption + pause */}
      <div className="mt-6 flex min-h-11 items-center justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={showApp ? "after" : "before"}
            className="text-[15px] font-semibold"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {showApp ? (
              <span className="text-olive">After: every number saved, dated and one tap away.</span>
            ) : (
              <span className="text-text-secondary">Before: guesses scribbled in a notebook.</span>
            )}
          </motion.p>
        </AnimatePresence>
        {started && !reduce && (
          <button
            type="button"
            onClick={() => setPaused(p => !p)}
            aria-label={paused ? "Play the story" : "Pause the story"}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[13px] font-semibold text-ink ring-1 ring-border-strong transition-colors hover:bg-ink/5"
          >
            {paused ? <Play size={14} strokeWidth={2} /> : <Pause size={14} strokeWidth={2} />}
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
    </div>
  );
}

export function Problem() {
  return (
    <section id="why-tayylo" aria-labelledby="problem-title" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          eyebrow="Why Tayylo"
          lines={["The notebook served you well.", <span key="e" className="text-olive">It’s time it retired.</span>]}
          intro="Client knowledge lives in notebooks, chats, photos and memory. It is slow to find, easy to lose and has no history. Tayylo gives it a proper home."
        />
        <span id="problem-title" className="sr-only">
          Problems Tayylo solves
        </span>

        <div className="mt-16 grid items-center gap-12 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Story />

          {/* The answers */}
          <ol className="divide-y divide-border border-y border-border">
            {PAIRS.map(p => (
              <motion.li
                key={p.answer}
                className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7, ease: EASE.emphasized, delay: 0.15 }}
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-olive-soft text-olive-deep">
                  <p.icon size={21} strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[19px] font-semibold tracking-[-0.01em] sm:text-[21px]">{p.answer}</p>
                  <p className="mt-1 text-[15px] text-text-secondary">{p.detail}</p>
                </div>
                <p className="col-start-2 text-[12.5px] text-text-tertiary line-through decoration-danger/50 sm:col-start-3 sm:text-right">{p.problem}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
