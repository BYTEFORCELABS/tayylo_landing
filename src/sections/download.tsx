"use client";

import { motion } from "motion/react";
import { Monitor, Smartphone } from "lucide-react";
import { PhoneFrame } from "@/components/phone/phone-frame";
import { HistoryScene } from "@/components/phone/scenes/history-scene";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { StoreBadges } from "@/components/ui/store-badges";
import { links } from "@/config/site";
import { EASE } from "@/lib/motion";

export function Download() {
  return (
    <section id="download" aria-labelledby="download-title" className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="relative grid items-center gap-14 overflow-hidden rounded-[32px] bg-canvas px-6 py-14 ring-1 ring-border sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-0">
          <div className="lg:py-20">
            <Reveal y={12}>
              <p className="eyebrow flex items-center gap-3 text-olive">
                Get the app
              </p>
            </Reveal>
            <LineReveal
              as="h2"
              lines={["Your whole studio,", <span key="e" className="text-olive">in your pocket.</span>]}
              className="display mt-5 text-[2.15rem] text-ink sm:text-[2.9rem] lg:text-[3.4rem]"
            />
            <span id="download-title" className="sr-only">Download Tayylo</span>
            <Reveal delay={0.12} y={14}>
              <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-text-secondary">
                Tayylo is made for the phone in your hand while the tape is round a client&rsquo;s shoulders. Download it for iPhone or Android, and use the web app when you&rsquo;re at a desk.
              </p>
            </Reveal>
            <Reveal delay={0.2} y={14}>
              <StoreBadges className="mt-9" />
            </Reveal>
            <Reveal delay={0.28} y={10}>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-text-secondary">
                <li className="flex items-center gap-2">
                  <Smartphone size={17} strokeWidth={1.75} className="text-olive" /> iPhone and Android
                </li>
                <li className="flex items-center gap-2">
                  <Monitor size={17} strokeWidth={1.75} className="text-olive" />
                  {links.webApp ? (
                    <a href={links.webApp} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline decoration-olive/40 underline-offset-4 hover:decoration-olive">
                      Open the web app
                    </a>
                  ) : (
                    "Web app for your desktop"
                  )}
                </li>
              </ul>
            </Reveal>
          </div>

          <motion.div
            className="relative mx-auto lg:-mb-24 lg:mt-12"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: EASE.emphasized }}
          >
            <PhoneFrame className="w-[250px] sm:w-[290px]" label="A client profile in Tayylo showing current measurements and what changed since the last visit" shadow={false}>
              <HistoryScene step={2} />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
