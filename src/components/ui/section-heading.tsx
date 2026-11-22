import { cn } from "@/lib/utils";
import { LineReveal, Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  lines,
  intro,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow: string;
  lines: React.ReactNode[];
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      <Reveal y={12}>
        <p className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center", dark ? "text-olive-pale" : "text-olive")}>
          {eyebrow}
        </p>
      </Reveal>
      <LineReveal
        lines={lines}
        className={cn("display mt-5 text-[2.15rem] sm:text-[2.9rem] lg:text-[3.5rem]", dark ? "text-text-inverse" : "text-ink")}
      />
      {intro && (
        <Reveal delay={0.15} y={16}>
          <p className={cn("mt-6 text-[17px] leading-relaxed sm:text-lg", dark ? "text-text-on-panel" : "text-text-secondary", align === "center" && "mx-auto max-w-2xl")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
