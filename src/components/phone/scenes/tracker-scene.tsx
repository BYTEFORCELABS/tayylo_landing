"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BadgeCheck, Check, CheckCircle2, Clock, PackageCheck, Ruler, Scissors, Spool, type LucideIcon } from "lucide-react";
import { formatMoney, paymentMethods, productionPath, type OrderStatus } from "@/content/demo";
import { EASE, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AppButton, AppToast, Avatar, ScreenHeader, StatusBar, StatusTag, STROKE, Tap } from "../app-ui";

export const trackerSteps = [1100, 550, 1500, 550, 1600, 550, 1900, 550, 4200] as const;

const ICONS: Record<string, LucideIcon> = {
  pending: Clock,
  cutting: Scissors,
  sewing: Spool,
  fitting: Ruler,
  ready: PackageCheck,
  delivered: BadgeCheck,
};

const PRICE = 1850;
const PAID_BEFORE = 1000;

/** Order detail — the live production tracker and payments. */
export function TrackerScene({ step }: { step: number }) {
  const stage = step >= 4 ? 4 : step >= 2 ? 3 : 2;
  const current = productionPath[stage];
  const Icon = ICONS[current.key];
  const next = productionPath[stage + 1];
  const paidInFull = step >= 8;
  const paid = paidInFull ? PRICE : PAID_BEFORE;

  return (
    <div className="relative h-full overflow-hidden bg-canvas">
      <StatusBar />
      <ScreenHeader eyebrow="John Smith" title="Order #ORD-1009" actions={<StatusTag status={current.key as OrderStatus} />} />

      <div className="space-y-3 px-4">
        {/* Hero */}
        <div className="relative h-[168px] overflow-hidden rounded-[28px] bg-panel">
          <Image src="/images/fabrics/indigo-print.jpg" alt="" fill sizes="360px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <span className="absolute left-3.5 top-3.5 rounded-full bg-black/45 px-3 py-1 text-[12px] font-semibold text-white">
            Fabric <span className="font-normal opacity-80">· Indigo print</span>
          </span>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-[28px] font-semibold leading-none tracking-[-0.02em]">Suit</p>
            <p className="mt-2 flex items-center gap-2 text-[13px]">
              <Avatar name="John Smith" size={22} className="ring-2 ring-white/70" />
              John Smith <span className="opacity-60">·</span> <span className="text-[#F4D9A0]">Due tomorrow</span>
            </p>
          </div>
        </div>

        {/* Production tracker */}
        <div className="rounded-[20px] border border-border/70 bg-surface p-4">
          <div className="flex items-start gap-3.5">
            <span className="relative flex size-[50px] shrink-0 items-center justify-center rounded-full bg-ink text-text-inverse">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-ink"
                animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current.key}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.4, rotate: 30 }}
                  transition={SPRING}
                >
                  <Icon size={22} strokeWidth={STROKE} />
                </motion.span>
              </AnimatePresence>
            </span>
            <div className="min-w-0 flex-1">
              <p className="tabular text-[12.5px] text-text-tertiary">
                Stage {stage + 1} of {productionPath.length}
              </p>
              <div className="relative h-[30px] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={current.key}
                    className="text-[24px] font-semibold leading-[30px] tracking-[-0.02em]"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={SPRING}
                  >
                    {current.label}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="text-[13px] text-text-secondary">{current.line}</p>
            </div>
            <span className="pt-1 text-[12.5px] font-semibold">All statuses</span>
          </div>

          {/* Track */}
          <div className="relative mt-5 px-2">
            <div className="absolute left-4 right-4 top-[11px] h-[3px] rounded-full bg-surface-sunken" />
            <motion.div
              className="absolute left-4 top-[11px] h-[3px] origin-left rounded-full bg-olive"
              style={{ right: 16 }}
              initial={false}
              animate={{ scaleX: stage / (productionPath.length - 1) }}
              transition={SPRING}
            />
            <div className="relative flex justify-between">
              {productionPath.map((s, i) => {
                const done = i < stage;
                const now = i === stage;
                return (
                  <div key={s.key} className="flex w-6 flex-col items-center">
                    <motion.span
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full",
                        done ? "bg-olive text-white" : now ? "bg-ink ring-4 ring-ink/10" : "bg-surface-sunken"
                      )}
                      initial={false}
                      animate={{ scale: now ? 1.12 : 1 }}
                      transition={SPRING}
                    >
                      {done && <Check size={13} strokeWidth={3} />}
                      {now && <span className="size-2 rounded-full bg-white" />}
                    </motion.span>
                    <span className={cn("mt-1.5 text-[10px]", now ? "font-semibold text-ink" : "text-text-tertiary")}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <AppButton className="mt-4 w-full" size="md" pressed={step === 1 || step === 3} icon={undefined}>
            {next ? `Move to ${next.label.toLowerCase()}` : "Delivered"}
            <ArrowRight size={18} strokeWidth={STROKE} />
          </AppButton>
        </div>

        {/* Payments */}
        <div className="rounded-[20px] border border-border/70 bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-[17px] font-semibold">Payments</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={paidInFull ? "paid" : "part"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={cn("rounded-full px-2.5 py-0.5 text-[12px] font-semibold", paidInFull ? "bg-success-bg text-success" : "bg-warning-bg text-warning")}
              >
                {paidInFull ? "Paid in full" : "Part paid"}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="tabular mt-3 grid grid-cols-3 text-[12px] text-text-tertiary">
            <span>Price<b className="block text-[16px] font-semibold text-ink">{formatMoney(PRICE)}</b></span>
            <span>Paid to date<b className="block text-[16px] font-semibold text-ink">{formatMoney(paid)}</b></span>
            <span className="text-right">Balance due<b className={cn("block text-[16px] font-semibold", paidInFull ? "text-success" : "text-ink")}>{formatMoney(PRICE - paid)}</b></span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
            <motion.div className="h-full origin-left rounded-full bg-olive" initial={false} animate={{ scaleX: paid / PRICE }} transition={{ duration: 0.9, ease: EASE.emphasized }} />
          </div>
          <AppButton variant="secondary" size="md" className="mt-3.5 w-full" pressed={step === 5}>
            Record payment
          </AppButton>
        </div>
      </div>

      <Tap x={195} y={512} show={step === 1 || step === 3} />
      <Tap x={195} y={712} show={step === 5} />

      {/* Payment sheet */}
      <AnimatePresence>
        {(step === 6 || step === 7) && (
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
              <p className="mt-5 text-[20px] font-semibold tracking-[-0.01em]">Record payment</p>
              <p className="tabular mt-1 text-[13px] text-text-tertiary">Balance due {formatMoney(PRICE - PAID_BEFORE)}</p>
              <p className="mb-1.5 mt-5 px-1 text-[13px] font-medium text-text-secondary">Amount paid</p>
              <div className="tabular flex h-[54px] items-center rounded-[14px] border border-ink px-4 text-[22px] font-semibold shadow-[0_0_0_3px_rgba(69,79,44,0.12)]">
                {formatMoney(PRICE - PAID_BEFORE)}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {paymentMethods.map((m, i) => (
                  <span key={m} className={cn("rounded-full px-3.5 py-2 text-[13px] font-semibold", i === 0 ? "bg-ink text-text-inverse" : "bg-surface-raised text-text-secondary ring-1 ring-border")}>
                    {m}
                  </span>
                ))}
              </div>
              <AppButton className="mt-6 w-full" pressed={step === 7}>Record payment</AppButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AppToast show={step >= 8}>
        <CheckCircle2 size={20} strokeWidth={2} className="shrink-0 text-olive-pale" />
        <span className="flex-1">Paid in full. Receipt ready for John Smith</span>
      </AppToast>
    </div>
  );
}
