"use client";

import { AnimatePresence, motion } from "motion/react";
import { Delete, LayoutGrid } from "lucide-react";
import { captureFields } from "@/content/demo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AppButton, ScreenHeader, StatusBar, STROKE, SuccessMark } from "../app-ui";

const METHODS: Record<string, string> = {
  chest: "Around the fullest part of the chest, under the arms and across the shoulder blades, tape level.",
  waist: "Around the natural waist: the narrowest part of the torso, usually just above the navel.",
  shoulder: "Across the back from one shoulder point (the bony tip of the shoulder) to the other.",
};
const NEXT_LABEL = ["Next · Waist", "Next · Shoulder", "Next · Sleeve length"];
const TOTAL_FIELDS = 18;

type Beat =
  | { kind: "enter"; field: number }
  | { kind: "key"; field: number; key: number }
  | { kind: "next"; field: number }
  | { kind: "fill" }
  | { kind: "saved" };

const BEATS: Beat[] = [];
captureFields.forEach((f, i) => {
  BEATS.push({ kind: "enter", field: i });
  f.value.forEach((_, k) => BEATS.push({ kind: "key", field: i, key: k }));
  BEATS.push({ kind: "next", field: i });
});
BEATS.push({ kind: "fill" }, { kind: "saved" });

const DURATION: Record<Beat["kind"], number> = { enter: 900, key: 420, next: 420, fill: 1500, saved: 4200 };
export const measureSteps = BEATS.map(b => DURATION[b.kind]);

const KEYS = [
  ["1", "2", "3", "¼"],
  ["4", "5", "6", "½"],
  ["7", "8", "9", "¾"],
  [".", "0", "⌫", "Skip"],
];

/** Record measurements — one field in focus, the tape keypad and live progress. */
export function MeasureScene({ step }: { step: number }) {
  const beat = BEATS[Math.min(step, BEATS.length - 1)];
  const saved = beat.kind === "saved";
  const filling = beat.kind === "fill" || saved;

  // Which field is showing and how many keys of it are typed.
  const fieldIndex = "field" in beat ? beat.field : captureFields.length - 1;
  const field = captureFields[fieldIndex];
  const typed = beat.kind === "key" ? beat.key + 1 : beat.kind === "enter" ? 0 : field.value.length;
  const value = field.value.slice(0, typed).join("");
  const pressedKey = beat.kind === "key" ? field.value[beat.key] : null;

  const recorded = filling ? TOTAL_FIELDS : fieldIndex + (beat.kind === "next" ? 1 : 0);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-canvas">
      <StatusBar />
      <ScreenHeader
        eyebrow="John Smith"
        title="Suit"
        actions={
          <span className="flex size-[42px] items-center justify-center rounded-full text-text-secondary">
            <LayoutGrid size={21} strokeWidth={STROKE} />
          </span>
        }
      />

      {/* One segment per measurement point */}
      <div className="flex h-1 gap-[3px] px-4">
        {Array.from({ length: TOTAL_FIELDS }, (_, i) => (
          <motion.span
            key={i}
            className="h-full flex-1 rounded-full"
            initial={false}
            animate={{ backgroundColor: !filling && i === fieldIndex ? "#1E2019" : i < recorded ? "#454F2C" : "#ECE9E1" }}
            transition={{ duration: 0.25, delay: filling ? (i - 3) * 0.05 : 0 }}
          />
        ))}
      </div>

      {/* Field in focus */}
      <div className="relative flex-1 px-4">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={field.key}
            className="pt-6"
            initial={{ opacity: 0, x: 72 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -72 }}
            transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.9 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="relative h-[212px] w-[128px] shrink-0 overflow-hidden rounded-[20px] border border-border/70 bg-surface-raised"
                initial={{ scale: 0.94, rotate: 2 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static vector artwork */}
                <img src="/art/body/male-front.svg" alt="" className="absolute inset-0 m-auto h-[196px] w-auto opacity-90" />
                {/* eslint-disable-next-line @next/next/no-img-element -- static vector artwork */}
                <img src={`/art/overlays/${field.overlay}.svg`} alt="" className="absolute inset-0 m-auto h-[196px] w-auto" />
              </motion.div>
              <div className="min-w-0 flex-1 pt-1">
                <span className="inline-flex rounded-full bg-surface-sunken px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  {field.group} · {fieldIndex + 1}/{TOTAL_FIELDS}
                </span>
                <p className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em]">{field.label}</p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <motion.span
                    key={value || "empty"}
                    className={cn("tabular text-[60px] font-semibold leading-[60px] tracking-[-0.02em]", value ? "text-ink" : "text-border-strong")}
                    style={{ transformOrigin: "left bottom" }}
                    initial={value ? { scale: 0.9, y: 4 } : false}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 600, damping: 26 }}
                  >
                    {value || "0"}
                  </motion.span>
                  <span className="text-[18px] font-medium text-text-tertiary">in</span>
                </div>
                <p className="mt-2 text-[13px] text-text-tertiary">
                  Last time <span className="tabular font-semibold text-text-secondary">{field.last} in</span> · 11 Mar
                </p>
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-[330px] text-center text-[12px] leading-snug text-text-tertiary">{METHODS[field.key]}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tape keypad */}
      <div className="space-y-3 px-4 pb-9">
        <div className="space-y-2">
          {KEYS.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map(k => {
                const fraction = k === "¼" || k === "½" || k === "¾";
                const utility = k === "⌫" || k === "Skip";
                const down = pressedKey === k;
                return (
                  <motion.span
                    key={k}
                    animate={{ scale: down ? 0.93 : 1 }}
                    transition={{ type: "spring", stiffness: 700, damping: 28 }}
                    className={cn(
                      "flex h-[54px] flex-1 items-center justify-center rounded-[12px] transition-colors duration-150",
                      utility ? (down ? "bg-surface-sunken" : "") : fraction ? (down ? "bg-[#DCE0CC]" : "bg-olive-soft") : down ? "bg-beige-light" : "bg-surface-raised shadow-[var(--shadow-xs)]"
                    )}
                  >
                    {k === "⌫" ? (
                      <Delete size={22} strokeWidth={STROKE} className="text-text-secondary" />
                    ) : utility ? (
                      <span className="text-[13px] font-semibold text-text-secondary">{k}</span>
                    ) : (
                      <span className={cn("text-[22px]", fraction ? "font-semibold text-olive-deep" : "font-medium")}>{k}</span>
                    )}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex gap-2.5">
          <AppButton variant="secondary" className="flex-1" size="md">Previous</AppButton>
          <AppButton className="flex-[1.6]" size="md" pressed={beat.kind === "next"}>
            {NEXT_LABEL[fieldIndex]}
          </AppButton>
        </div>
      </div>

      {/* Saved dialog */}
      <AnimatePresence>
        {saved && (
          <>
            <motion.div className="absolute inset-0 z-40 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="absolute inset-x-4 bottom-8 z-40 rounded-[28px] bg-surface-raised px-6 pb-6 pt-8 text-center shadow-[var(--shadow-dialog)]"
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE.emphasized }}
            >
              <SuccessMark size={72} />
              <p className="mt-5 text-[22px] font-semibold tracking-[-0.01em]">Measurements saved</p>
              <p className="mx-auto mt-2 max-w-[290px] text-[14px] leading-relaxed text-text-secondary">
                Suit for John Smith is saved as a dated version (19 Nov 2026). Earlier versions are kept.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <AppButton>Create order</AppButton>
                <AppButton variant="secondary">View client</AppButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
