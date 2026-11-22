"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Bell, ChevronRight, CircleAlert, Clock, Compass, PackageCheck, Ruler, Search, ShoppingCart } from "lucide-react";
import { TapeRule } from "@/components/brand/tape-rule";
import { categories, formatMoney, orders, studio } from "@/content/demo";
import { EASE } from "@/lib/motion";
import { AppButton, StatusBar, STROKE, TabBar, Tap } from "../app-ui";
import { CountUp } from "../count-up";
import { OrderRow } from "../order-row";

export const todaySteps = [700, 900, 1100, 1500, 450, 4200] as const;

const NOTIFICATIONS = [
  { icon: CircleAlert, tone: "bg-danger-bg text-danger", title: "Agbada for Ngozi Eze is overdue", detail: "Order #ORD-1006 · 2 days overdue" },
  { icon: PackageCheck, tone: "bg-success-bg text-success", title: "Dress is ready for Claire Moreau", detail: `Order #ORD-1004 · ${formatMoney(180)} to collect on pickup` },
  { icon: Clock, tone: "bg-warning-bg text-warning", title: "Suit for John Smith", detail: "Order #ORD-1009 · Due tomorrow" },
];

const rise = (on: boolean, delay = 0) => ({
  initial: false as const,
  animate: on ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
  transition: { duration: 0.6, ease: EASE.emphasized, delay },
});

/** Today — the tailor's home screen. */
export function TodayScene({ step, month = "November", scroll = true }: { step: number; month?: string; scroll?: boolean }) {
  return (
    <div className="relative h-full overflow-hidden bg-canvas">
      <StatusBar solid />

      <motion.div
        className="px-4"
        initial={false}
        animate={{ y: scroll && step >= 2 && step < 4 ? -150 : 0 }}
        transition={{ duration: 1.1, ease: EASE.emphasized }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 pt-2">
          <p className="text-[23px] font-medium leading-tight tracking-[-0.02em]">Good morning, {studio.owner}</p>
          <div className="flex items-center gap-1.5">
            <span className="flex size-[44px] items-center justify-center rounded-full bg-surface-raised shadow-[var(--shadow-raised-light)]">
              <Compass size={21} strokeWidth={STROKE} />
            </span>
            <span className="flex size-[40px] items-center justify-center">
              <Search size={21} strokeWidth={STROKE} />
            </span>
            <span className="relative flex size-[40px] items-center justify-center">
              <Bell size={21} strokeWidth={STROKE} />
              <AnimatePresence>
                {step >= 3 && (
                  <motion.span
                    className="tabular absolute -right-0.5 -top-0.5 flex h-[22px] min-w-[22px] items-center justify-center rounded-full border-2 border-canvas bg-[#D93A2B] px-0.5 text-[10.5px] font-bold text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.25, 1] }}
                    transition={{ duration: 0.45 }}
                  >
                    3
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </div>
        </div>

        {/* Summary panel */}
        <motion.div {...rise(true)} className="rounded-[28px] bg-panel p-2">
          <div className="relative overflow-hidden rounded-[22px] bg-surface-raised px-4 pb-5 pt-8">
            <TapeRule className="absolute left-0 top-0 h-6 text-ink opacity-25" />
            <p className="text-center text-[13px] text-text-secondary">Collected in {month}</p>
            <p className="mt-1 text-center text-[32px] font-semibold leading-10 tracking-[-0.025em]">
              <CountUp value={7150} run format={formatMoney} />
            </p>
          </div>
          <div className="flex gap-1 px-1 pt-1">
            {[
              { label: "Outstanding balance", value: <CountUp value={3780} run format={formatMoney} duration={1.6} /> },
              { label: "In production", value: "4 orders" },
            ].map(s => (
              <div key={s.label} className="min-w-0 flex-1 rounded-[18px] px-3 py-3">
                <p className="flex items-center justify-between text-[12px] text-text-on-panel">
                  {s.label}
                  <ChevronRight size={15} strokeWidth={2} className="opacity-60" />
                </p>
                <p className="mt-1 text-[19px] font-semibold text-text-inverse">{s.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div {...rise(step >= 1)} className="mt-4 flex gap-3">
          <AppButton icon={Ruler} className="flex-1">Measure</AppButton>
          <AppButton icon={ShoppingCart} variant="secondary" className="flex-1">New order</AppButton>
        </motion.div>

        {/* Category */}
        <motion.div {...rise(step >= 1, 0.1)} className="mt-7">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-[17px] font-medium text-text-secondary">Category</p>
            <ChevronRight size={20} strokeWidth={STROKE} className="text-text-tertiary" />
          </div>
          <div className="-mx-4 flex gap-3 overflow-hidden px-4 pb-1">
            {categories.map((c, i) => (
              <motion.div
                key={c.label}
                className="w-[124px] shrink-0 rounded-[18px] border border-border/60 bg-surface-raised p-1.5"
                initial={false}
                animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, ease: EASE.emphasized, delay: 0.15 + i * 0.06 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-[13px]">
                  <Image src={c.image} alt="" fill sizes="112px" className="object-cover" />
                </div>
                <p className="px-1 pb-0.5 pt-1.5 text-[14px] text-text-secondary">{c.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active orders */}
        <motion.div {...rise(step >= 2)} className="mt-7">
          <div className="mb-1 flex items-center justify-between px-1">
            <p className="flex items-center gap-2 text-[17px] font-medium text-text-secondary">
              Active orders
              <span className="tabular rounded-[6px] bg-surface-sunken px-1.5 text-[12px] leading-5">{orders.length}</span>
            </p>
            <ChevronRight size={20} strokeWidth={STROKE} className="text-text-tertiary" />
          </div>
          {orders.map((o, i) => (
            <motion.div
              key={o.number}
              className={i > 0 ? "border-t border-divider/70" : undefined}
              initial={false}
              animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, ease: EASE.emphasized, delay: 0.1 + i * 0.08 }}
            >
              <OrderRow order={o} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <TabBar active={0} />
      <Tap x={358} y={83} show={step === 4} />

      {/* Notifications sheet */}
      <AnimatePresence>
        {step >= 5 && (
          <>
            <motion.div className="absolute inset-0 z-40 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="absolute inset-x-0 bottom-0 z-40 rounded-t-[28px] bg-surface-raised px-5 pb-10 pt-3 shadow-[0_-12px_40px_-12px_rgba(30,32,25,0.18)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <span className="mx-auto block h-[5px] w-10 rounded-full bg-border-strong" />
              <p className="mt-5 text-[20px] font-semibold tracking-[-0.01em]">Notifications</p>
              <div className="mt-4 space-y-1">
                {NOTIFICATIONS.map((n, i) => (
                  <motion.div
                    key={n.title}
                    className="flex items-start gap-3 rounded-[16px] px-1 py-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.09, duration: 0.45, ease: EASE.emphasized }}
                  >
                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-[12px] ${n.tone}`}>
                      <n.icon size={20} strokeWidth={STROKE} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug">{n.title}</span>
                      <span className="tabular mt-0.5 block text-[13px] text-text-tertiary">{n.detail}</span>
                    </span>
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#D93A2B]" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
