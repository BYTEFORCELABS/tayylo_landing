import { ArrowRight } from "lucide-react";
import { TapeRule } from "@/components/brand/tape-rule";
import { ButtonLink } from "@/components/ui/button";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { StoreBadges } from "@/components/ui/store-badges";
import { getStartedHref } from "@/config/site";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-olive-deep text-text-inverse">
      <TapeRule units={40} unit={96} scale={1.5} className="absolute left-0 top-0 h-[42px] w-[3900px] text-text-inverse/35" />
      {/* Oversized winged-T watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-1/2 h-[120%] w-[70%] -translate-y-1/2 bg-[url(/brand/tayylo-symbol-cream.svg)] bg-contain bg-center bg-no-repeat opacity-[0.05]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-28 text-center sm:px-8 sm:py-36">
        <Reveal y={12}>
          <p className="eyebrow text-olive-pale">Start today</p>
        </Reveal>
        <LineReveal
          as="h2"
          lines={["Put the notebook down.", <span key="e" className="text-olive-pale">Pick up your craft.</span>]}
          className="display mx-auto mt-6 max-w-4xl text-[2.3rem] sm:text-[3.6rem] lg:text-[4.6rem]"
        />
        <span id="cta-title" className="sr-only">Get started with Tayylo</span>
        <Reveal delay={0.15} y={14}>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-text-on-panel sm:text-[19px]">
            Every client, every measurement and every order, remembered. Set up your studio in three questions and record your first measurement in about a minute.
          </p>
        </Reveal>
        <Reveal delay={0.25} y={14}>
          <div className="mt-10 flex flex-col items-center gap-6">
            {!getStartedHref.startsWith("/#") && (
              <ButtonLink href={getStartedHref} variant="light" size="lg" iconRight={<ArrowRight size={18} strokeWidth={2} />}>
                Get started
              </ButtonLink>
            )}
            <StoreBadges tone="light" className="mx-auto w-full justify-center" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
