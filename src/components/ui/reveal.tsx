"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { EASE } from "@/lib/motion";

/** Fade-and-rise on first scroll into view. Transforms and opacity only. */
export function Reveal({
  delay = 0,
  y = 24,
  children,
  as = "div",
  ...rest
}: { delay?: number; y?: number; as?: "div" | "li" | "section" | "header" } & HTMLMotionProps<"div">) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: EASE.emphasized, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

const lineVariants = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.9, ease: EASE.emphasized, delay: i * 0.08 } }),
};

/**
 * Headline that rises line by line from behind a mask. The heading itself
 * is observed (never the masked lines, which start fully clipped).
 */
export function LineReveal({ lines, className, delay = 0, as = "h2" }: { lines: React.ReactNode[]; className?: string; delay?: number; as?: "h1" | "h2" | "h3" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={lineVariants} custom={i}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
