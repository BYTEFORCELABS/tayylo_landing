"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Logo, Symbol } from "@/components/brand/logo";
import { formatMoney, studio } from "@/content/demo";

const CARD = [
  ["Chest", "42½"],
  ["Shoulder", "18¼"],
  ["Waist", "36"],
  ["Sleeve length", "25"],
  ["Neck", "16½"],
  ["Trouser length", "41"],
];

/** The shareable measurement card in front of a branded receipt, drifting apart on scroll. */
export function DocumentsVisual() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const frontY = useTransform(scrollYProgress, [0, 1], [-10, 30]);

  return (
    <div ref={ref} className="relative mx-auto h-[520px] w-full max-w-[540px] sm:h-[560px]" role="img" aria-label="A Tayylo measurement card shared with a client, in front of a branded receipt">
      {/* Receipt behind */}
      <motion.div style={{ y: backY }} className="absolute right-0 top-0 w-[68%] rotate-[4deg] rounded-[20px] bg-surface-raised p-5 shadow-[var(--shadow-float)] ring-1 ring-border/60">
        <div className="flex items-start justify-between">
          <span className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-olive-soft">
              <Symbol size={14} />
            </span>
            <span className="text-[13px] font-semibold">{studio.name}</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">Receipt</span>
        </div>
        <div className="mt-4 space-y-2 text-[12px]">
          <div className="flex justify-between text-text-tertiary"><span>Received from</span><span className="font-semibold text-ink">John Smith</span></div>
          <div className="flex justify-between text-text-tertiary"><span>Date paid</span><span className="tabular font-semibold text-ink">21 Nov 2026</span></div>
          <div className="flex justify-between text-text-tertiary"><span>Suit</span><span className="tabular font-semibold text-ink">{formatMoney(1850)}</span></div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-divider pt-3">
          <span className="text-[12px] text-text-tertiary">Balance</span>
          <span className="rounded-full bg-success-bg px-2.5 py-0.5 text-[11px] font-semibold text-success">Paid in full</span>
        </div>
      </motion.div>

      {/* Measurement card in front */}
      <motion.div style={{ y: frontY }} className="absolute bottom-0 left-0 w-[86%] -rotate-[2deg] overflow-hidden rounded-[24px] bg-surface shadow-[var(--shadow-dialog)] ring-1 ring-border/70">
        <div className="h-2 bg-olive" />
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <Logo height={16} />
            <span className="text-right text-[10px] font-semibold uppercase leading-tight tracking-[0.2em] text-text-tertiary">Measurement<br />card</span>
          </div>
          <p className="mt-6 text-[24px] font-semibold tracking-[-0.02em]">Claire Moreau</p>
          <p className="mt-1 text-[13.5px] leading-relaxed text-text-secondary">
            Dress measurements taken by <b className="font-semibold text-ink">{studio.name}</b> on 19 Nov 2026.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-x-6 border-t border-divider">
            {CARD.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-b border-divider py-2.5">
                <span className="text-[13px] text-text-secondary">{k}</span>
                <span className="tabular text-[15px] font-semibold">
                  {v} <span className="text-[11px] font-normal text-text-tertiary">in</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-[12px] text-text-tertiary">
            <Symbol size={12} /> Measured and recorded with Tayylo
          </p>
        </div>
      </motion.div>
    </div>
  );
}
