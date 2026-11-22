import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** A Tayylo garment icon (from the app's icon set), tinted with currentColor. */
export function GarmentGlyph({ icon, size = 32, className }: { icon: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("glyph shrink-0", className)}
      style={{ "--glyph": `url(/art/garments/${icon}.svg)`, width: size, height: size } as CSSProperties}
    />
  );
}
