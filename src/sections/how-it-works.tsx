"use client";

import { motion } from "motion/react";
import { ClipboardList, PackageCheck, Ruler, UserPlus, type LucideIcon } from "lucide-react";
import { Avatar, StatusTag } from "@/components/phone/app-ui";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatMoney } from "@/content/demo";
import { EASE } from "@/lib/motion";

const STEPS: { icon: LucideIcon; title: string; body: string; vignette: React.ReactNode }[] = [
  {
    icon: UserPlus,
    title: "Add a client",
    body: "Name and phone number is all you need. Add fit notes, tags and photos whenever you like.",
    vignette: (
      <div className="flex items-center gap-3">
        <Avatar name="Nadia Haddad" size={40} />
        <div>
          <p className="text-[14px] font-semibold">Nadia Haddad</p>
          <p className="tabular text-[12px] text-text-tertiary">+971 50 555 0133</p>
        </div>
      </div>
    ),
  },
  {
    icon: Ruler,
    title: "Record measurements",
    body: "Pick a template and use the tape keypad. A full set takes about a minute.",
    vignette: (
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] text-text-tertiary">Waist</span>
        <span className="tabular text-[28px] font-semibold tracking-[-0.02em]">
          30¾ <span className="text-[13px] font-normal text-text-tertiary">in</span>
        </span>
      </div>
    ),
  },
  {
    icon: ClipboardList,
    title: "Create the order",
    body: "Garment, fabric, price, deposit and the date it’s due, all in one place.",
    vignette: (
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14px] font-semibold">Dress</p>
          <p className="tabular text-[12px] text-text-tertiary">#ORD-1015 · Due 18 Dec</p>
        </div>
        <span className="tabular text-[15px] font-semibold">{formatMoney(420)}</span>
      </div>
    ),
  },
  {
    icon: PackageCheck,
    title: "Fit, finish, deliver",
    body: "Log fittings, move it through production and record the final payment on pickup.",
    vignette: (
      <div className="flex items-center justify-between">
        <StatusTag status="ready" />
        <span className="text-[12px] font-semibold text-success">Paid in full</span>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          lines={["Four steps you", <span key="e" className="text-olive">already know by heart.</span>]}
          intro="Tayylo follows the job you already do: a client walks in, you measure, you make, they collect. Setup takes three questions: your studio name, inches or centimetres, and what you make."
        />
        <span id="how-title" className="sr-only">
          How Tayylo works
        </span>

        <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {/* Connecting thread (desktop) */}
          <span aria-hidden className="absolute left-14 right-[calc(25%-3.5rem)] top-[27px] hidden border-t border-dashed border-olive/35 lg:block" />
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative flex h-full flex-col"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: EASE.emphasized, delay: i * 0.15 }}
            >
              <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                <span className="relative flex size-14 items-center justify-center rounded-full bg-olive text-text-inverse shadow-[var(--shadow-raised)]">
                  <s.icon size={22} strokeWidth={1.75} />
                </span>
                <span className="tabular text-[13px] font-bold uppercase tracking-[0.14em] text-text-tertiary lg:mt-6">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-text-secondary">{s.body}</p>
              <div className="mt-6 flex min-h-[76px] flex-col justify-center rounded-[18px] border border-border/70 bg-surface-raised p-4 shadow-[var(--shadow-xs)] lg:mt-auto">
                {s.vignette}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
