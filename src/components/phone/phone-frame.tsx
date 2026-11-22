"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Logical screen size the app UI is laid out at (iPhone 15/16 points). */
export const SCREEN_W = 390;
export const SCREEN_H = 844;
const BEZEL = 13;
const DEVICE_W = SCREEN_W + BEZEL * 2;
const DEVICE_H = SCREEN_H + BEZEL * 2;

/**
 * A realistic phone. The device is built once at true size and scaled to
 * whatever width its container gives it, so the in-screen UI keeps the
 * app's exact proportions at every breakpoint.
 */
export function PhoneFrame({
  children,
  className,
  screenClassName,
  shadow = true,
  label = "Tayylo app demonstration",
}: {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
  shadow?: boolean;
  label?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DEVICE_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn("relative select-none", className)}
      style={{ aspectRatio: `${DEVICE_W} / ${DEVICE_H}` }}
    >
      {/* Ground shadow, kept separate so it never scales with blur artefacts */}
      {shadow && (
        <div
          aria-hidden
          className="absolute inset-x-[8%] -bottom-[3%] h-[8%] rounded-[50%] bg-olive-ink/35 blur-2xl"
        />
      )}
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: DEVICE_W,
          height: DEVICE_H,
          transform: `scale(${scale ?? 0})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {/* Side buttons */}
        <span aria-hidden className="absolute -left-[3px] top-[168px] h-[34px] w-[4px] rounded-l-[2px] bg-[#3a3b36]" />
        <span aria-hidden className="absolute -left-[3px] top-[222px] h-[62px] w-[4px] rounded-l-[2px] bg-[#3a3b36]" />
        <span aria-hidden className="absolute -left-[3px] top-[298px] h-[62px] w-[4px] rounded-l-[2px] bg-[#3a3b36]" />
        <span aria-hidden className="absolute -right-[3px] top-[250px] h-[98px] w-[4px] rounded-r-[2px] bg-[#3a3b36]" />

        {/* Titanium body */}
        <div
          className="absolute inset-0 rounded-[66px]"
          style={{
            background: "linear-gradient(145deg, #5d5e57 0%, #2b2c28 22%, #1c1d1a 50%, #2b2c28 78%, #55564f 100%)",
            boxShadow: shadow
              ? "0 50px 100px -30px rgba(35,40,26,.55), 0 30px 60px -30px rgba(0,0,0,.45), inset 0 0 0 1.5px rgba(255,255,255,.14), inset 0 0 0 4px #111210"
              : "inset 0 0 0 1.5px rgba(255,255,255,.14), inset 0 0 0 4px #111210",
          }}
        />

        {/* Screen */}
        <div
          className={cn("absolute overflow-hidden rounded-[54px] bg-canvas text-left font-app text-ink", screenClassName)}
          style={{ left: BEZEL, top: BEZEL, width: SCREEN_W, height: SCREEN_H, isolation: "isolate" }}
        >
          {children}
          {/* Dynamic Island */}
          <div aria-hidden className="absolute left-1/2 top-[11px] z-50 h-[35px] w-[122px] -translate-x-1/2 rounded-full bg-black">
            <span className="absolute right-[14px] top-1/2 size-[11px] -translate-y-1/2 rounded-full bg-[#141821] ring-1 ring-[#23283a]" />
          </div>
          {/* Glass reflection */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-50"
            style={{ background: "linear-gradient(115deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 70%, rgba(255,255,255,.05) 100%)" }}
          />
        </div>
      </div>
    </div>
  );
}
