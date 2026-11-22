"use client";

import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, Printer, Send, Share2 } from "lucide-react";
import { Symbol } from "@/components/brand/logo";
import { formatMoney, studio } from "@/content/demo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AppButton, Avatar, ScreenHeader, StatusBar, STROKE, Tap } from "../app-ui";

export const shareSteps = [900, 1300, 1200, 500, 4600] as const;

function Row({ k, v, strong, show, i }: { k: string; v: string; strong?: boolean; show: boolean; i: number }) {
  return (
    <motion.div
      className={cn("tabular flex justify-between py-1.5 text-[13px]", strong ? "font-semibold text-ink" : "text-text-secondary")}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: 0.4, delay: i * 0.07, ease: EASE.emphasized }}
    >
      <span>{k}</span>
      <span>{v}</span>
    </motion.div>
  );
}

/** Branded invoice, sent to the client on WhatsApp. */
export function ShareScene({ step }: { step: number }) {
  const lines = step >= 1;
  return (
    <div className="relative h-full overflow-hidden bg-surface-sunken">
      <StatusBar />
      <div className="bg-surface-sunken">
        <ScreenHeader
          eyebrow="Order #ORD-1009"
          title="Invoice"
          actions={
            <div className="flex gap-2">
              <motion.span
                animate={{ scale: step === 3 ? 0.88 : 1 }}
                className="flex size-[38px] items-center justify-center rounded-full bg-surface-raised shadow-[var(--shadow-raised-light)]"
              >
                <MessageCircle size={18} strokeWidth={STROKE} />
              </motion.span>
              <span className="flex size-[38px] items-center justify-center rounded-full bg-surface-raised shadow-[var(--shadow-raised-light)]">
                <Share2 size={18} strokeWidth={STROKE} />
              </span>
              <span className="flex size-[38px] items-center justify-center rounded-full bg-olive text-text-inverse shadow-[var(--shadow-raised)]">
                <Printer size={18} strokeWidth={STROKE} />
              </span>
            </div>
          }
        />
      </div>

      <motion.div
        className="mx-4 mt-1 overflow-hidden rounded-[20px] bg-surface-raised shadow-[var(--shadow-float)]"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE.emphasized }}
      >
        <div className="h-1.5 bg-olive" />
        <div className="px-5 pb-5 pt-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-[12px] bg-olive-soft">
                <Symbol size={18} />
              </span>
              <div>
                <p className="text-[15px] font-semibold leading-tight">{studio.name}</p>
                <p className="text-[11.5px] text-text-tertiary">{studio.owner} · Tailoring studio</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">Invoice</p>
              <p className="tabular text-[13px] font-semibold">#ORD-1009</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-y border-divider py-3 text-[11px] text-text-tertiary">
            <span>Bill to<b className="block text-[13px] font-semibold text-ink">John Smith</b></span>
            <span>Issued<b className="tabular block text-[13px] font-semibold text-ink">19 Nov 2026</b></span>
            <span>Ready by<b className="tabular block text-[13px] font-semibold text-ink">20 Nov 2026</b></span>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
              <span>Item</span>
              <span>Amount</span>
            </div>
            <motion.div
              className="tabular mt-2 flex justify-between text-[14px]"
              initial={false}
              animate={lines ? { opacity: 1 } : { opacity: 0 }}
            >
              <span>
                <span className="font-semibold">Suit</span>
                <span className="block text-[12px] text-text-tertiary">Navy two-piece, half lining</span>
              </span>
              <span className="font-semibold">{formatMoney(1850)}</span>
            </motion.div>
          </div>

          <div className="mt-4 border-t border-divider pt-2">
            <Row k="Total" v={formatMoney(1850)} show={lines} i={0} />
            <Row k="Paid to date" v={formatMoney(1000)} show={lines} i={1} />
            <Row k="Balance due" v={formatMoney(850)} strong show={lines} i={2} />
          </div>

          <motion.div
            className="mt-4 rounded-[14px] bg-canvas px-3.5 py-3"
            initial={false}
            animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: EASE.emphasized }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">Pay by transfer</p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[13px]">
                <span className="font-semibold">{studio.name}</span>
                <span className="tabular block text-text-secondary">Account •••• 4821</span>
              </span>
              <span className="rounded-full bg-surface-raised px-3 py-1 text-[12px] font-semibold ring-1 ring-border">Copy</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Tap x={234} y={83} show={step === 3} />

      {/* WhatsApp handoff */}
      <AnimatePresence>
        {step >= 4 && (
          <>
            <motion.div className="absolute inset-0 z-40 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="absolute inset-x-0 bottom-0 z-40 rounded-t-[28px] bg-surface-raised px-5 pb-9 pt-3"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <span className="mx-auto block h-[5px] w-10 rounded-full bg-border-strong" />
              <p className="mt-5 text-[20px] font-semibold tracking-[-0.01em]">Send to client on WhatsApp</p>
              <p className="mt-1 text-[13px] text-text-tertiary">Sent as a branded image card, with the text included.</p>
              <div className="mt-4 flex items-center gap-3 rounded-[16px] border border-border/70 bg-surface p-3">
                <Avatar name="John Smith" size={44} />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold">John Smith</p>
                  <p className="tabular text-[13px] text-text-tertiary">+1 415 555 0142</p>
                </div>
                <span className="h-12 w-9 rounded-[6px] bg-surface-raised shadow-[var(--shadow-float)] ring-1 ring-border">
                  <span className="block h-1 rounded-t-[6px] bg-olive" />
                </span>
              </div>
              <AppButton className="mt-5 w-full !bg-[#25D366] !shadow-none">
                <Send size={18} strokeWidth={STROKE} />
                Send invoice
              </AppButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
