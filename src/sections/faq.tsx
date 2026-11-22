"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = React.useState<number | null>(0);
  const baseId = React.useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" lines={["Questions,", <span key="e" className="text-olive">answered plainly.</span>]} />
          <span id="faq-title" className="sr-only">Frequently asked questions</span>
        </div>

        <ul className="border-t border-border">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li key={item.q} className="border-b border-border">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={cn("text-[18px] font-semibold tracking-[-0.01em] transition-colors sm:text-[20px]", isOpen ? "text-ink" : "text-ink/85 group-hover:text-ink")}>
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 ease-[var(--ease-emphasized)]",
                        isOpen ? "rotate-45 bg-olive text-text-inverse" : "bg-surface-raised text-ink ring-1 ring-border group-hover:bg-beige-light"
                      )}
                    >
                      <Plus size={18} strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE.emphasized }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-12 text-[16px] leading-relaxed text-text-secondary">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
