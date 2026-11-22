import { Check } from "lucide-react";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** Editorial two-column feature: copy on one side, a live product visual on the other. */
export function FeatureBlock({
  id,
  index,
  eyebrow,
  title,
  body,
  points,
  visual,
  flip = false,
  tone = "light",
}: {
  id?: string;
  index: string;
  eyebrow: string;
  title: React.ReactNode[];
  body: React.ReactNode;
  points?: string[];
  visual: React.ReactNode;
  flip?: boolean;
  tone?: "light" | "olive";
}) {
  return (
    <div id={id} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={cn("max-w-xl", flip && "lg:order-2")}>
        <Reveal y={12}>
          <p className="flex items-baseline gap-3">
            <span className="tabular text-[13px] font-bold uppercase tracking-[0.14em] text-text-tertiary">{index}</span>
            <span className={cn("eyebrow", tone === "olive" ? "text-olive-deep" : "text-olive")}>{eyebrow}</span>
          </p>
        </Reveal>
        <LineReveal lines={title} as="h3" className="display mt-5 text-[2rem] text-ink sm:text-[2.5rem] lg:text-[2.9rem]" />
        <Reveal delay={0.12} y={16}>
          <p className="mt-6 text-[17px] leading-relaxed text-text-secondary">{body}</p>
        </Reveal>
        {points && (
          <ul className="mt-8 space-y-3">
            {points.map((p, i) => (
              <Reveal as="li" key={p} delay={0.18 + i * 0.06} y={10} className="flex items-start gap-3 text-[15.5px] text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-olive text-text-inverse">
                  <Check size={12} strokeWidth={3} />
                </span>
                {p}
              </Reveal>
            ))}
          </ul>
        )}
      </div>
      <div className={cn("relative font-app", flip && "lg:order-1")}>{visual}</div>
    </div>
  );
}
