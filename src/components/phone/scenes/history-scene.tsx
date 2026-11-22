"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, MessageCircle, Phone, Ruler, ShoppingCart } from "lucide-react";
import { measurementHistory, measurementSet } from "@/content/demo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AppButton, Avatar, ScreenHeader, StatusBar, STROKE, Tap } from "../app-ui";

export const historySteps = [900, 1000, 1100, 450, 1700, 450, 4400] as const;

const TABS = ["Measurements", "Orders", "Fittings", "Photos", "Notes"];
const COMPARE = [
  { label: "Chest", then: "41½", now: "42½", change: "+1" },
  { label: "Waist", then: "35", now: "36", change: "+1" },
  { label: "Shoulder", then: "18¼", now: "18¼", change: "Same" },
  { label: "Neck", then: "16", now: "16½", change: "+½" },
  { label: "Sleeve length", then: "25", now: "25", change: "Same" },
];

/** Client profile — measurement versions, compare and restore. */
export function HistoryScene({ step }: { step: number }) {
  const showHistory = step >= 4;
  return (
    <div className="relative h-full overflow-hidden bg-canvas">
      <StatusBar />
      <ScreenHeader eyebrow="Clients" title="John Smith" />

      <div className="px-4">
        {/* Profile header */}
        <motion.div
          className="flex items-center gap-4 rounded-[20px] border border-border/70 bg-surface p-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.emphasized }}
        >
          <Avatar name="John Smith" size={60} />
          <div className="min-w-0 flex-1">
            <p className="text-[20px] font-semibold tracking-[-0.01em]">John Smith</p>
            <p className="tabular text-[13px] text-text-secondary">+1 415 555 0142</p>
            <p className="text-[12px] text-text-tertiary">Client since March 2026</p>
          </div>
          <div className="flex gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-surface-raised shadow-[var(--shadow-raised-light)]">
              <Phone size={16} strokeWidth={STROKE} />
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-surface-raised shadow-[var(--shadow-raised-light)]">
              <MessageCircle size={16} strokeWidth={STROKE} />
            </span>
          </div>
        </motion.div>

        <div className="mt-3 flex gap-2.5">
          <AppButton icon={Ruler} size="md" className="flex-1">Measure</AppButton>
          <AppButton icon={ShoppingCart} size="md" variant="secondary" className="flex-1">New order</AppButton>
        </div>

        {/* Tabs */}
        <div className="mt-5 flex gap-5 border-b border-border text-[14px]">
          {TABS.map((t, i) => (
            <span key={t} className={cn("relative pb-2.5", i === 0 ? "font-semibold text-ink" : "text-text-tertiary")}>
              {t}
              {i === 0 && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-ink" />}
            </span>
          ))}
        </div>

        {/* Current | History */}
        <div className="relative mt-4 flex rounded-full bg-surface-sunken p-1 text-[13px] font-semibold">
          <motion.span
            className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full bg-surface-raised shadow-[var(--shadow-xs)]"
            initial={false}
            animate={{ x: showHistory ? "100%" : "0%" }}
            transition={{ type: "spring", stiffness: 400, damping: 34 }}
          />
          <span className={cn("relative flex-1 py-1.5 text-center", !showHistory ? "text-ink" : "text-text-tertiary")}>Current</span>
          <span className={cn("relative flex-1 py-1.5 text-center", showHistory ? "text-ink" : "text-text-tertiary")}>
            History · <span className="tabular">3</span>
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {!showHistory ? (
            <motion.div key="current" exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }}>
              <p className="mt-4 text-[12.5px] text-text-tertiary">Changes are compared with the suit set from 11 Mar 2026.</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {measurementSet.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="rounded-[16px] border border-border/70 bg-surface px-3.5 py-3"
                    initial={false}
                    animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.5, ease: EASE.emphasized, delay: i * 0.05 }}
                  >
                    <p className="text-[12px] text-text-tertiary">{m.label}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="tabular text-[22px] font-semibold tracking-[-0.02em]">{m.value}</span>
                      <span className="text-[13px] text-text-tertiary">in</span>
                      {m.delta && (
                        <motion.span
                          className="tabular ml-auto rounded-full bg-olive-soft px-1.5 text-[11.5px] font-semibold leading-5 text-olive-deep"
                          initial={false}
                          animate={step >= 2 ? { scale: 1, opacity: 1 } : { scale: 0.4, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 20, delay: i * 0.06 }}
                        >
                          {m.delta}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="history" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, ease: EASE.emphasized }}>
              <div className="mt-4 overflow-hidden rounded-[20px] border border-border/70 bg-surface">
                {measurementHistory.map((h, i) => (
                  <div key={h.date} className={cn("flex items-center gap-3 px-4 py-3.5", i > 0 && "border-t border-divider")}>
                    <span className="flex size-10 items-center justify-center rounded-[12px] bg-olive-soft text-olive-deep">
                      <Ruler size={19} strokeWidth={STROKE} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-[15px] font-semibold">
                        {h.template}
                        {h.current && <span className="rounded-full bg-ink px-2 text-[10.5px] font-semibold leading-[18px] text-text-inverse">Current</span>}
                      </p>
                      <p className="tabular text-[12.5px] text-text-tertiary">
                        {h.date} · {h.fields} measurements
                      </p>
                    </div>
                    <ChevronRight size={18} strokeWidth={STROKE} className="text-text-tertiary" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Tap x={292} y={348} show={step === 3} />
      <Tap x={200} y={482} show={step === 5} />

      {/* Compare sheet */}
      <AnimatePresence>
        {step >= 6 && (
          <>
            <motion.div className="absolute inset-0 z-40 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="absolute inset-x-0 bottom-0 z-40 rounded-t-[28px] bg-surface-raised px-5 pb-9 pt-3"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <span className="mx-auto block h-[5px] w-10 rounded-full bg-border-strong" />
              <p className="mt-5 text-[20px] font-semibold tracking-[-0.01em]">Suit · 11 Mar 2026</p>
              <p className="mt-1 text-[13px] text-text-tertiary">Compared with the current set</p>
              <div className="mt-4 overflow-hidden rounded-[16px] border border-border/70">
                <div className="grid grid-cols-[1.6fr_1fr_1fr_0.9fr] bg-surface px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                  <span>Field</span>
                  <span className="text-right">11 Mar</span>
                  <span className="text-right">Now</span>
                  <span className="text-right">Change</span>
                </div>
                {COMPARE.map((r, i) => (
                  <motion.div
                    key={r.label}
                    className="tabular grid grid-cols-[1.6fr_1fr_1fr_0.9fr] border-t border-divider px-3.5 py-2.5 text-[14px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                  >
                    <span className="text-text-secondary">{r.label}</span>
                    <span className="text-right text-text-tertiary">{r.then}</span>
                    <span className="text-right font-semibold">{r.now}</span>
                    <span className={cn("text-right font-semibold", r.change === "Same" ? "text-text-tertiary" : "text-olive")}>{r.change}</span>
                  </motion.div>
                ))}
              </div>
              <AppButton variant="secondary" className="mt-5 w-full">Restore as current set</AppButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
