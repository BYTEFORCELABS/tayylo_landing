"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { GarmentGlyph } from "@/components/brand/garment-glyph";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { starterTemplates } from "@/content/templates";

// Facts taken from the product itself — nothing here is a marketing estimate.
const FACTS = [
  { value: "15", label: "starter measurement templates, from shirts and suits to agbada, kurta and saree blouse" },
  { value: "72", label: "illustrated measurement points, so everyone measures the same way" },
  { value: "6", label: "production stages, from pending to delivered, plus alterations" },
  { value: "4", label: "ways to record payment: transfer, cash, card / POS and mobile money" },
];

export function ForTailors() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);

  return (
    <section id="for-tailors" aria-labelledby="tailors-title" className="relative bg-surface pb-24 pt-10 sm:pb-32 sm:pt-16 lg:pt-20">
      {/* Editorial image */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div ref={ref} className="relative h-[520px] overflow-hidden rounded-[28px] bg-panel sm:h-[620px] lg:h-[680px]">
          <motion.div className="absolute inset-[-8%]" style={{ y: imgY, scale: imgScale }}>
            <Image
              src="/images/garments/atelier_banner.jpg"
              alt="A tailor fitting a charcoal jacket on a dress form in a wood-panelled atelier"
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              quality={80}
              className="object-cover object-[60%_center]"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-olive-ink/95 via-olive-ink/40 to-transparent sm:bg-gradient-to-r sm:from-olive-ink/90 sm:via-olive-ink/45 sm:to-transparent" />
          <div className="on-dark absolute inset-x-0 bottom-0 p-6 sm:inset-y-0 sm:right-auto sm:flex sm:max-w-xl sm:flex-col sm:justify-center sm:p-14">
            <Reveal y={12}>
              <p className="eyebrow flex items-center gap-3 text-olive-pale">
                For tailors
              </p>
            </Reveal>
            <LineReveal
              lines={["Built for the people", <span key="e" className="text-olive-pale">behind the clothing.</span>]}
              className="display mt-5 text-[2.1rem] text-text-inverse sm:text-[2.9rem] lg:text-[3.4rem]"
              as="h2"
            />
            <span id="tailors-title" className="sr-only">For tailors</span>
            <Reveal delay={0.15} y={14}>
              <p className="mt-5 text-[16.5px] leading-relaxed text-text-on-panel sm:text-[18px]">
                For tailors, dressmakers, bespoke studios and alteration shops who run their business from a phone. Tayylo brings the structure of a well-run atelier to every order, without getting between you and the work.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Facts */}
        <dl className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal key={f.value + f.label} delay={i * 0.08} className="border-t border-ink/80 pt-5">
              <dt className="display tabular text-[4rem] text-olive">{f.value}</dt>
              <dd className="mt-3 text-[15.5px] leading-relaxed text-text-secondary">{f.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Template marquee — tailoring as a global craft */}
      <div className="mt-20 lg:mt-24">
        <Reveal>
          <p className="mx-auto max-w-7xl px-4 text-[15px] text-text-secondary sm:px-8">
            Starter templates for traditions from Savile Row to Lagos to Lahore, each with the fields that garment needs.
          </p>
        </Reveal>
        <div className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="marquee-track flex w-max gap-3" aria-label="Starter measurement templates">
            {[...starterTemplates, ...starterTemplates].map((t, i) => (
              <li
                key={`${t.name}-${i}`}
                aria-hidden={i >= starterTemplates.length}
                className="flex items-center gap-3 rounded-full border border-border bg-canvas py-2.5 pl-3 pr-5 text-ink"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-surface-raised ring-1 ring-border/70">
                  <GarmentGlyph icon={t.icon} size={26} className="text-olive-deep" />
                </span>
                <span className="whitespace-nowrap text-[15px] font-medium">{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
