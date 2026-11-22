import Image from "next/image";
import { cn } from "@/lib/utils";

type Tone = "olive" | "cream";

/** The official Tayylo lockup (winged T + spaced wordmark), never retyped. */
export function Logo({ tone = "olive", className, height = 22, priority }: { tone?: Tone; className?: string; height?: number; priority?: boolean }) {
  const width = Math.round(height * (1872 / 450));
  return (
    <Image
      src={`/brand/tayylo-lockup-${tone}.svg`}
      alt="Tayylo"
      width={width}
      height={height}
      unoptimized
      preload={priority}
      className={cn("select-none", className)}
      style={{ width, height }}
      draggable={false}
    />
  );
}

/** The winged T symbol on its own (small sizes). */
export function Symbol({ tone = "olive", size = 24, className }: { tone?: Tone; size?: number; className?: string }) {
  const width = Math.round(size * (630 / 450));
  return (
    <Image
      src={`/brand/tayylo-symbol-${tone}.svg`}
      alt=""
      aria-hidden
      width={width}
      height={size}
      unoptimized
      className={cn("select-none", className)}
      style={{ width, height: size }}
      draggable={false}
    />
  );
}
