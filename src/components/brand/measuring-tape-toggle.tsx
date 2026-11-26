"use client";

import { cn } from "@/lib/utils";

/**
 * A small floating switch for the measuring tape cursor: a miniature of the
 * roll itself. Shown only where the tape can run (mouse or trackpad, motion allowed).
 */
export function MeasuringTapeToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const label = on ? "Hide the measuring tape" : "Show the measuring tape";
  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={on}
        aria-label="Measuring tape cursor"
        className={cn(
          "group/tape relative grid size-11 place-items-center rounded-full bg-surface-raised/85 ring-1 ring-border-strong/60 backdrop-blur-md",
          "shadow-[var(--shadow-float)] transition-[transform,background-color,box-shadow] duration-200 ease-[var(--ease-out)] hover:bg-surface-raised active:scale-[0.94]"
        )}
      >
        <svg width={24} height={24} viewBox="-12 -12 24 24" aria-hidden className={cn("transition-[opacity,filter] duration-300", !on && "opacity-55 grayscale")}>
          <circle r={10} fill="#F3D67E" stroke="#2E3420" strokeWidth={1.2} />
          <circle r={7.2} fill="none" stroke="#E2BE5C" strokeWidth={1.6} />
          <circle r={5} fill="none" stroke="#23281A" strokeWidth={0.6} strokeOpacity={0.4} />
          <circle r={7.2} fill="none" stroke="#23281A" strokeWidth={0.6} strokeOpacity={0.4} />
          <path
            d="M0 -10V-8.2M5 -8.66L4.1 -7.1M8.66 -5L7.1 -4.1M10 0H8.2M8.66 5L7.1 4.1M5 8.66L4.1 7.1M0 10V8.2M-5 8.66L-4.1 7.1M-8.66 5L-7.1 4.1M-10 0H-8.2M-8.66 -5L-7.1 -4.1M-5 -8.66L-4.1 -7.1"
            stroke="#23281A"
            strokeWidth={0.7}
          />
          <circle r={2.9} fill="#F4F2EC" stroke="#2E3420" strokeWidth={1} />
          <circle r={1} fill="#454F2C" />
          {!on && <path d="M-9.5 9.5L9.5 -9.5" stroke="#2E3420" strokeWidth={1.8} strokeLinecap="round" />}
        </svg>

        {/* Says what a click will do; slides out on hover or keyboard focus. */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-full top-1/2 mr-2.5 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[12px] font-semibold text-text-inverse opacity-0",
            "transition-[opacity,transform] duration-200 ease-[var(--ease-out)] group-hover/tape:translate-x-0 group-hover/tape:opacity-100 group-focus-visible/tape:translate-x-0 group-focus-visible/tape:opacity-100"
          )}
        >
          {label}
        </span>
      </button>
    </div>
  );
}
