"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Bookmark, Compass, MessageCircle, Receipt } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const LOOKS = [
  { src: "/images/explore/tweed-three-piece-suit.jpg", label: "Tweed three-piece suit", tag: "Suits", h: "aspect-[3/4]" },
  { src: "/images/explore/indian-embroidered-lehenga.jpg", label: "Embroidered lehenga", tag: "Bridal", h: "aspect-[3/4]" },
  { src: "/images/explore/silk-scarf-collection.jpg", label: "Silk scarf collection", tag: "Accessories", h: "aspect-[4/3]" },
  { src: "/images/explore/japanese-indigo-kimono.jpg", label: "Indigo kimono", tag: "Traditional", h: "aspect-[3/4]" },
  { src: "/images/explore/denim-tailored-jacket.jpg", label: "Tailored denim jacket", tag: "Jackets", h: "aspect-square" },
];

const POINTS = [
  { icon: Compass, title: "Browse Explore", body: "Style inspiration posted by tailors around the world, filtered by country and category." },
  { icon: Bookmark, title: "Keep the looks you love", body: "Save any style to show your tailor exactly what you have in mind." },
  { icon: MessageCircle, title: "Your card on WhatsApp", body: "Tailors using Tayylo can send your measurement card straight to your phone." },
  { icon: Receipt, title: "Clear invoices and receipts", body: "Know what you owe and what you’ve paid, on a document with your tailor’s name on it." },
];

export function ForCustomers() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const colA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const colB = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <section id="for-customers" aria-labelledby="customers-title" className="relative overflow-hidden bg-beige-light py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="For customers"
            lines={["Find your next look.", <span key="e" className="text-olive">Then find the hands to make it.</span>]}
            intro="Clients get their own Tayylo account to browse style inspiration and keep the looks they love, so the first conversation with a tailor starts with a picture, not a guess."
          />
          <span id="customers-title" className="sr-only">For customers</span>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 + i * 0.06}>
                <span className="flex size-11 items-center justify-center rounded-full bg-surface-raised text-olive-deep ring-1 ring-border">
                  <p.icon size={20} strokeWidth={1.75} />
                </span>
                <p className="mt-3 text-[17px] font-semibold">{p.title}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-text-secondary">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Explore wall */}
        <div ref={ref} className="relative grid h-[560px] grid-cols-2 gap-3 overflow-hidden rounded-[28px] sm:h-[640px] sm:gap-4 [mask-image:linear-gradient(180deg,transparent,#000_10%,#000_90%,transparent)]">
          {[LOOKS.slice(0, 3), LOOKS.slice(3)].map((col, c) => (
            <motion.div key={c} style={{ y: c === 0 ? colA : colB }} className={cn("flex flex-col gap-3 sm:gap-4", c === 1 && "pt-16")}>
              {col.map(l => (
                <figure key={l.src} className={cn("group relative overflow-hidden rounded-[22px] bg-surface-sunken", l.h)}>
                  <Image src={l.src} alt={l.label} fill sizes="(min-width: 1024px) 300px, 45vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]" />
                  <figcaption className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-full bg-white/85 py-1.5 pl-3 pr-1.5 text-[12px] font-semibold backdrop-blur">
                    <span className="truncate">{l.label}</span>
                    <span className="flex size-7 items-center justify-center rounded-full bg-ink text-text-inverse">
                      <Bookmark size={13} strokeWidth={2} />
                    </span>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
