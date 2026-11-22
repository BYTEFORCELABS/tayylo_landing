"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { ArrowDown, ArrowRight, Clock, PackageCheck } from "lucide-react";
import { TapeRule } from "@/components/brand/tape-rule";
import { PhoneFrame } from "@/components/phone/phone-frame";
import { TodayScene, todaySteps } from "@/components/phone/scenes/today-scene";
import { ButtonLink } from "@/components/ui/button";
import { CTA_GRID, StoreBadges } from "@/components/ui/store-badges";
import { getStartedHref } from "@/config/site";
import { useTimeline } from "@/hooks/use-timeline";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

// The hero plays the opening of the Today scene and stops on the alert badge.
const HERO_STEPS = [1500, ...todaySteps.slice(0, 3), 99999];

const noopSubscribe = () => () => {};
/** The visitor's current month on the client; a fixed month during prerender. */
function useMonth() {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString("en-GB", { month: "long" }),
    () => "November"
  );
}

// The last line of the headline cycles through what Tayylo does for a tailor.
const WORDS = ["Remembered.", "Organised.", "Tracked.", "Kept safe.", "On time."];
const WORD_HOLD = 2600;

/**
 * Rolls the headline's last word upward through WORDS. Screen readers get
 * the first word only, so the heading never changes under them.
 */
function RotatingWord() {
  const reduce = useSafeReducedMotion();
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    let id: ReturnType<typeof setInterval>;
    // Start once the headline has finished rising in.
    const start = setTimeout(() => {
      setI(n => (n + 1) % WORDS.length);
      id = setInterval(() => setI(n => (n + 1) % WORDS.length), WORD_HOLD);
    }, WORD_HOLD);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [reduce]);

  return (
    <>
      <span className="sr-only">{WORDS[0]}</span>
      <span aria-hidden className="grid">
        <AnimatePresence initial={false}>
          <motion.span
            key={WORDS[i]}
            className="block [grid-area:1/1]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE.emphasized }}
          >
            {WORDS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE.emphasized, delay },
});

export function Hero() {
  const reduce = useSafeReducedMotion();
  const month = useMonth();
  const { step } = useTimeline(HERO_STEPS, { holdAfter: 0 });
  const sceneStep = Math.max(0, step - 1);

  // Subtle pointer-driven tilt (desktop pointers only).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 120, damping: 20 });
  const cardX = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 90, damping: 20 });
  const cardY = useSpring(useTransform(my, [-1, 1], [-8, 8]), { stiffness: 90, damping: 20 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section aria-labelledby="hero-title" className="grain relative overflow-hidden pb-24 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-12 lg:pt-0">
      {/* Warm light behind the product */}
      <div aria-hidden className="pointer-events-none absolute right-[-20%] top-[-10%] h-[90vh] w-[90vh] rounded-full bg-[radial-gradient(closest-side,rgba(216,203,181,0.55),transparent)] lg:right-[-6%]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
        {/* Copy */}
        <div className="relative z-10 lg:py-32">
          <motion.p {...fadeUp(0.1)} className="eyebrow text-olive">
            The modern tailor&rsquo;s notebook
          </motion.p>

          <h1 id="hero-title" className="display mt-6 text-[2.55rem] text-ink min-[400px]:text-[2.8rem] sm:text-[3.8rem] lg:text-[3.4rem] xl:text-[4.1rem]">
            {["Every client.", "Every measurement."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE.emphasized, delay: 0.2 + i * 0.1 }}>
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="block text-olive" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE.emphasized, delay: 0.4 }}>
                <RotatingWord />
              </motion.span>
            </span>
          </h1>

          <motion.p {...fadeUp(0.6)} className="mt-7 max-w-xl text-[17px] leading-relaxed text-text-secondary sm:text-[19px]">
            Tayylo keeps your clients, their measurements and every order in one calm place on your phone. Find anyone in seconds, measure with a keypad built for the tape, and follow each garment from cutting to collection.
          </motion.p>

          {/* Same two equal columns as the store badges below, so the rows line up */}
          <motion.div {...fadeUp(0.72)} className={cn(CTA_GRID, "mt-9")}>
            <ButtonLink
              href={getStartedHref}
              size="sm"
              className="w-full sm:h-13 sm:px-5 sm:text-base"
              iconRight={<ArrowRight size={17} strokeWidth={2} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />}
            >
              {getStartedHref.startsWith("/#") ? "Get the app" : "Get started"}
            </ButtonLink>
            <ButtonLink href="#features" size="sm" variant="secondary" className="w-full sm:h-13 sm:px-5 sm:text-base" iconRight={<ArrowDown size={17} strokeWidth={2} />}>
              See it at work
            </ButtonLink>
          </motion.div>

          <motion.div {...fadeUp(0.84)} className="mt-10">
            <StoreBadges tone="light" />
            <p className="mt-4 text-[13px] text-text-tertiary">For iPhone and Android, with a full web app for your desktop.</p>
          </motion.div>
        </div>

        {/* Product */}
        <div className="relative flex justify-center font-app lg:h-full lg:items-center" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} style={{ perspective: 1600 }}>
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, y: 120, rotateX: 18, rotateY: -22, rotateZ: 4 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0 }}
            transition={{ duration: 1.6, ease: EASE.emphasized, delay: 0.35 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}>
              <PhoneFrame className="w-[270px] sm:w-[310px] lg:w-[340px] xl:w-[360px]" label="Tayylo home screen: this month's takings, outstanding balances and active orders">
                <TodayScene step={sceneStep} month={month} scroll={false} />
              </PhoneFrame>
            </motion.div>

            {/* Floating callouts */}
            <motion.div style={{ x: cardX, y: cardY }} className="absolute -left-[58%] top-[30%] hidden sm:block lg:hidden xl:block">
              <motion.div initial={reduce ? false : { opacity: 0, x: -20, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, ease: EASE.emphasized, delay: 2.4 }}>
                <div className="w-[230px] rounded-[20px] bg-surface-raised/95 p-4 shadow-[var(--shadow-float)] ring-1 ring-border/70 backdrop-blur">
                  <p className="text-[12px] text-text-tertiary">Chest · Suit</p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="tabular text-[34px] font-semibold leading-none tracking-[-0.02em]">42½</span>
                    <span className="text-[14px] text-text-tertiary">in</span>
                    <span className="tabular ml-auto rounded-full bg-olive-soft px-2 text-[12px] font-semibold leading-6 text-olive-deep">+1</span>
                  </p>
                  <TapeRule units={3} unit={64} className="mt-3 h-5 w-full text-ink/30" />
                  <p className="mt-1 text-[12px] text-text-tertiary">Last time 41½ in · 11 Mar</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={{ x: cardX, y: cardY }} className="absolute -right-[40%] top-[52%] hidden xl:block">
              <motion.div initial={reduce ? false : { opacity: 0, x: 20, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.9, ease: EASE.emphasized, delay: 2.9 }}>
                <div className="flex w-[250px] items-start gap-3 rounded-[20px] bg-surface-raised/95 p-4 shadow-[var(--shadow-float)] ring-1 ring-border/70 backdrop-blur">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-success-bg text-success">
                    <PackageCheck size={20} strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold leading-snug">Dress is ready for Claire Moreau</span>
                    <span className="mt-0.5 block text-[12px] text-text-tertiary">Order #ORD-1004</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={{ x: cardX, y: cardY }} className="absolute -right-[34%] top-[-2%] hidden xl:block">
              <motion.div initial={reduce ? false : { opacity: 0, y: -12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, ease: EASE.emphasized, delay: 3.3 }}>
                <div className="flex items-center gap-2.5 rounded-full bg-ink py-2 pl-2.5 pr-4 text-text-inverse shadow-[var(--shadow-float)]">
                  <span className="flex size-7 items-center justify-center rounded-full bg-warning-bg text-warning">
                    <Clock size={15} strokeWidth={2} />
                  </span>
                  <span className="text-[13px] font-semibold">Suit for John Smith · Due tomorrow</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* A tailor's tape laid along the foot of the hero */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-11 overflow-hidden border-t border-ink/10 bg-beige-warm/45 sm:h-12"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <motion.div initial={reduce ? false : { x: -160 }} animate={{ x: 0 }} transition={{ duration: 1.8, ease: EASE.emphasized, delay: 0.9 }}>
          <TapeRule units={40} unit={96} scale={1.6} flip className="h-11 w-[3900px] text-ink/45 sm:h-12" />
        </motion.div>
      </motion.div>
    </section>
  );
}
