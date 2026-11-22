"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Camera, Check, CheckCircle2, ImagePlus } from "lucide-react";
import { GarmentGlyph } from "@/components/brand/garment-glyph";
import { formatMoney } from "@/content/demo";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AppButton, AppToast, Avatar, ScreenHeader, StatusBar, STROKE, Tap } from "../app-ui";
import { CountUp } from "../count-up";

export const orderSteps = [900, 750, 800, 1100, 1000, 900, 550, 4200] as const;

const GARMENTS = [
  { label: "Suit", icon: "two-piece-suit" },
  { label: "Agbada", icon: "agbada" },
  { label: "Senator", icon: "senator-wear" },
  { label: "Kaftan", icon: "kaftan" },
  { label: "Dress", icon: "midi-dress" },
  { label: "Shirt", icon: "corporate-shirt" },
];

function Overline({ children }: { children: React.ReactNode }) {
  return <p className="mb-2.5 mt-6 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">{children}</p>;
}

function Field({ label, hint, value, active }: { label: string; hint?: string; value: React.ReactNode; active?: boolean }) {
  return (
    <div className="flex-1">
      <p className="mb-1.5 flex justify-between px-1 text-[13px] font-medium text-text-secondary">
        {label}
        {hint && <span className="font-normal text-text-tertiary">{hint}</span>}
      </p>
      <div
        className={cn(
          "tabular flex h-[50px] items-center rounded-[14px] border bg-surface-raised px-4 text-[17px] font-semibold transition-[border-color,box-shadow] duration-200",
          active ? "border-ink shadow-[0_0_0_3px_rgba(69,79,44,0.12)]" : "border-border"
        )}
      >
        {value}
      </div>
    </div>
  );
}

/** New order — garment, fabric, price, deposit and delivery date. */
export function OrderScene({ step }: { step: number }) {
  const garment = step >= 1 ? "Agbada" : null;
  const fabric = step >= 2;
  const scroll = step >= 5 ? -330 : step >= 3 ? -190 : 0;

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-canvas">
      <StatusBar solid />
      <div className="relative z-10 bg-canvas">
        <ScreenHeader eyebrow="Ngozi Eze" title="New order" />
      </div>

      <motion.div className="flex-1 px-4" initial={false} animate={{ y: scroll }} transition={{ duration: 0.9, ease: EASE.emphasized }}>
        <div className="flex items-center gap-3 rounded-[20px] border border-border/70 bg-surface p-3">
          <Avatar name="Ngozi Eze" size={44} />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold">Ngozi Eze</p>
            <p className="tabular text-[13px] text-text-tertiary">+234 803 555 0192</p>
          </div>
          <span className="px-2 text-[13px] font-semibold">Change</span>
        </div>

        <Overline>Garment</Overline>
        <div className="grid grid-cols-3 gap-2">
          {GARMENTS.map(g => {
            const on = garment === g.label;
            return (
              <motion.div
                key={g.label}
                animate={{ scale: on && step === 1 ? [1, 0.94, 1] : 1 }}
                transition={{ duration: 0.35 }}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-[16px] border py-3 transition-colors duration-200",
                  on ? "border-ink bg-surface-raised shadow-[0_0_0_1px_#1E2019]" : "border-border/70 bg-surface"
                )}
              >
                <GarmentGlyph icon={g.icon} size={34} className={on ? "text-ink" : "text-ink/70"} />
                <span className={cn("text-[13px]", on ? "font-semibold" : "text-text-secondary")}>{g.label}</span>
              </motion.div>
            );
          })}
        </div>

        <Overline>Fabric and style</Overline>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative h-[118px] overflow-hidden rounded-[18px] border border-dashed border-border-strong bg-surface">
            <motion.div className="absolute inset-0" initial={false} animate={{ opacity: fabric ? 1 : 0, scale: fabric ? 1 : 1.08 }} transition={{ duration: 0.6, ease: EASE.emphasized }}>
              <Image src="/images/fabrics/aso-oke.jpg" alt="" fill sizes="170px" className="object-cover" />
              <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white">Fabric · Aso-oke</span>
            </motion.div>
            {!fabric && (
              <div className="flex h-full flex-col items-center justify-center gap-1.5 text-text-secondary">
                <Camera size={22} strokeWidth={STROKE} />
                <span className="text-[13px] font-medium">Fabric</span>
              </div>
            )}
          </div>
          <div className="flex h-[118px] flex-col items-center justify-center gap-1.5 rounded-[18px] border border-dashed border-border-strong bg-surface text-text-secondary">
            <ImagePlus size={22} strokeWidth={STROKE} />
            <span className="text-[13px] font-medium">Style</span>
          </div>
        </div>

        <Overline>Price and payment</Overline>
        <div className="flex gap-2.5">
          <Field label="Price" active={step === 3} value={step >= 3 ? <CountUp value={950} run format={formatMoney} duration={0.8} /> : <span className="text-border-strong">0</span>} />
          <Field label="Deposit" hint="Optional" active={step === 4} value={step >= 4 ? <CountUp value={400} run format={formatMoney} duration={0.7} /> : <span className="text-border-strong">0</span>} />
        </div>

        <Overline>Delivery</Overline>
        <p className="mb-1.5 px-1 text-[13px] font-medium text-text-secondary">Ready by</p>
        <div className="flex gap-2">
          {["Today", "Tomorrow", "Fri 12 Dec"].map(d => {
            const on = step >= 5 && d === "Fri 12 Dec";
            return (
              <span
                key={d}
                className={cn(
                  "rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors duration-200",
                  on ? "bg-ink text-text-inverse" : "bg-surface-raised text-text-secondary ring-1 ring-border"
                )}
              >
                {d}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Sticky footer */}
      <div className="relative z-10 flex items-center gap-3 border-t border-border/70 bg-surface-raised px-4 pb-9 pt-3">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] text-text-tertiary">Balance on delivery</p>
          <p className="tabular text-[17px] font-semibold">{step >= 4 ? formatMoney(550) : step >= 3 ? formatMoney(950) : formatMoney(0)}</p>
        </div>
        <AppButton icon={Check} pressed={step === 6}>Create order</AppButton>
      </div>

      <Tap x={195} y={step >= 1 ? 304 : 0} show={step === 1} />
      <Tap x={102} y={465} show={step === 2} />
      <Tap x={300} y={790} show={step === 6} />

      <AppToast show={step >= 7}>
        <CheckCircle2 size={20} strokeWidth={2} className="shrink-0 text-olive-pale" />
        <span className="flex-1">Order #ORD-1014 created, invoice ready</span>
        <span className="font-semibold text-olive-pale">View</span>
      </AppToast>
    </div>
  );
}
