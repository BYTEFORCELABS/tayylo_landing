"use client";

import * as React from "react";
import Image from "next/image";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { cn } from "@/lib/utils";

type Swatch = { name: string; src: string };

const SPEED = 30; // px per second
const RESUME_AFTER = 2500; // ms after the visitor lets go

/**
 * Fabric swatches. Below the lg breakpoint they sit in a rail that drifts on
 * its own and loops, and can be swiped (or dragged with a mouse) at any time;
 * touching it pauses the drift. From lg up they form a plain six-column grid.
 */
export function FabricRail({ swatches }: { swatches: Swatch[] }) {
  const ref = React.useRef<HTMLUListElement>(null);
  const reduce = useSafeReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let hovering = false;
    let resumeAt = 0;
    let drag: { x: number; left: number } | null = null;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(64, t - last) : 0;
      last = t;
      const half = el.scrollWidth / 2;
      if (desktop.matches || hovering || drag || t < resumeAt || document.hidden) {
        // Keep the loop seamless after a manual swipe past the first set.
        if (!drag && el.scrollLeft >= half) el.scrollLeft -= half;
        pos = el.scrollLeft;
        return;
      }
      pos += (SPEED * dt) / 1000;
      if (pos >= half) pos -= half;
      el.scrollLeft = pos;
    };

    const hold = () => (resumeAt = performance.now() + RESUME_AFTER);
    const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && (hovering = true);
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = false;
      drag = null;
      hold();
    };
    // Touch swipes scroll natively; mouse users get click-and-drag.
    const onDown = (e: PointerEvent) => {
      hold();
      if (e.pointerType === "mouse") drag = { x: e.clientX, left: el.scrollLeft };
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      el.scrollLeft = drag.left - (e.clientX - drag.x);
    };
    const onUp = () => {
      drag = null;
      hold();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("wheel", hold);
    };
  }, [reduce]);

  return (
    <ul
      ref={ref}
      aria-label="Fabric library swatches"
      className={cn(
        "no-scrollbar -mx-4 flex cursor-grab select-none gap-3 overflow-x-auto px-4 active:cursor-grabbing sm:-mx-8 sm:px-8",
        "[mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]",
        "lg:mx-0 lg:grid lg:flex-1 lg:cursor-auto lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:[mask-image:none]"
      )}
    >
      {[...swatches, ...swatches].map((s, i) => {
        const copy = i >= swatches.length;
        return (
          <li key={`${s.name}-${i}`} aria-hidden={copy || undefined} className={cn("w-[140px] shrink-0 sm:w-[160px] lg:w-auto", copy && "lg:hidden")}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] ring-1 ring-border">
              <Image
                src={s.src}
                alt={copy ? "" : `${s.name} swatch`}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 160px, 160px"
                className="pointer-events-none object-cover transition-transform duration-700 ease-[var(--ease-out)] lg:pointer-events-auto lg:hover:scale-105"
              />
            </div>
            <p className="mt-2 text-[13px] text-text-secondary">{s.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
