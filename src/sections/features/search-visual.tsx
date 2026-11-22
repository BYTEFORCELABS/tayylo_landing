"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Search } from "lucide-react";
import { GarmentGlyph } from "@/components/brand/garment-glyph";
import { Avatar, StatusTag } from "@/components/phone/app-ui";
import { clients } from "@/content/demo";
import { useTimeline } from "@/hooks/use-timeline";
import { EASE } from "@/lib/motion";

const QUERY = "ngo";
// pause · n · g · o · hold
const STEPS = [1200, 260, 260, 260, 6000];

/** Search typing a few letters and narrowing to the right client and order. */
export function SearchVisual() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const { step } = useTimeline(STEPS, { playing: inView, holdAfter: 0 });
  const typed = QUERY.slice(0, Math.max(0, Math.min(step, 3)));
  const searching = typed.length > 0;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[520px]">
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[40px] bg-beige-light" />
      <div className="rounded-[28px] bg-surface-raised p-5 shadow-[var(--shadow-dialog)] ring-1 ring-border/60 sm:p-6" role="img" aria-label="Tayylo search finding Ngozi Eze after typing three letters">
        <div className="flex h-[54px] items-center gap-3 rounded-[16px] bg-surface-sunken px-4">
          <Search size={20} strokeWidth={1.75} className="text-text-tertiary" />
          <span className="text-[17px]">
            {typed ? <span className="font-medium">{typed}</span> : <span className="text-text-tertiary">Search client, order or garment</span>}
            <motion.span
              aria-hidden
              className="ml-px inline-block h-5 w-[2px] translate-y-[3px] bg-olive"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </span>
        </div>

        <div className="mt-5 min-h-[272px]">
          <AnimatePresence mode="wait" initial={false}>
            {!searching ? (
              <motion.div key="recent" exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Recent clients</p>
                <ul className="mt-2">
                  {clients.slice(0, 4).map(c => (
                    <li key={c.name} className="flex items-center gap-3 rounded-[14px] px-1 py-2.5">
                      <Avatar name={c.name} size={40} rounded />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold">{c.name}</span>
                        <span className="tabular block text-[13px] text-text-tertiary">{c.phone}</span>
                      </span>
                      <span className="text-[12px] text-text-tertiary">{c.last}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE.emphasized }}>
                <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Clients</p>
                <div className="mt-2 flex items-center gap-3 rounded-[14px] bg-olive-soft/60 px-3 py-2.5">
                  <Avatar name="Ngozi Eze" size={40} rounded />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold">
                      <mark className="rounded-[3px] bg-olive/15 text-ink">Ngo</mark>zi Eze
                    </span>
                    <span className="tabular block text-[13px] text-text-tertiary">+234 803 555 0192</span>
                  </span>
                  <span className="text-[12px] text-text-tertiary">Measured 2 weeks ago</span>
                </div>
                <p className="mt-5 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Orders</p>
                <div className="mt-2 flex items-center gap-3 rounded-[14px] px-3 py-2.5">
                  <span className="flex size-10 items-center justify-center rounded-[10px] bg-surface-sunken">
                    <GarmentGlyph icon="agbada" size={26} className="text-ink/80" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold">Agbada</span>
                    <span className="tabular block text-[13px] text-text-tertiary">#ORD-1006 · Ngozi Eze</span>
                  </span>
                  <StatusTag status="overdue" size="sm" />
                </div>
                <motion.p
                  className="mt-6 px-1 text-[13px] text-text-tertiary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step >= 4 ? 1 : 0 }}
                >
                  2 results · searching names, phones, tags, notes and orders
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
