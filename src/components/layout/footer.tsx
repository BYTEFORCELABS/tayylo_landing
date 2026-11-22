"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { SocialIcon } from "@/components/brand/social-icons";
import { TapeRule } from "@/components/brand/tape-rule";
import { ButtonLink } from "@/components/ui/button";
import { getStartedHref, links, nav, signInHref, site, socials } from "@/config/site";
import { useSafeReducedMotion } from "@/hooks/use-safe-reduced-motion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const WORD = ["T", "A", "Y", "Y", "L", "O"];

function Column({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.7, ease: EASE.emphasized, delay }}>
      <p className="text-[13px] font-semibold text-text-tertiary">{title}</p>
      <ul className="mt-5 space-y-3.5 text-[15.5px]">{children}</ul>
    </motion.div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "group inline-flex items-center gap-1.5 font-medium text-ink transition-colors duration-200 hover:text-olive";
  const inner = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-olive transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100" />
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/**
 * The giant wordmark: letters rise in one after another, a tailor's
 * dimension line opens out above it, and a tape draws itself underneath.
 */
function Wordmark() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useSafeReducedMotion();
  const show = inView || reduce;

  return (
    <div ref={ref} className="relative select-none" aria-hidden>
      {/* Dimension line: |<—— made to measure ——>| */}
      <div className="relative mb-3 flex items-center gap-3 text-olive sm:mb-5">
        <motion.span className="h-4 w-[2px] rounded-full bg-current" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 0.9 }} />
        <motion.span className="h-[2px] flex-1 origin-right rounded-full bg-current" initial={{ scaleX: 0 }} animate={show ? { scaleX: 1 } : {}} transition={{ duration: 1, ease: EASE.emphasized, delay: 0.9 }} />
        <motion.span
          className="shrink-0 rounded-full bg-olive-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-olive-deep sm:text-[12px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE.emphasized, delay: 0.8 }}
        >
          Made to measure
        </motion.span>
        <motion.span className="h-[2px] flex-1 origin-left rounded-full bg-current" initial={{ scaleX: 0 }} animate={show ? { scaleX: 1 } : {}} transition={{ duration: 1, ease: EASE.emphasized, delay: 0.9 }} />
        <motion.span className="h-4 w-[2px] rounded-full bg-current" initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 0.9 }} />
      </div>

      <div className="flex justify-between overflow-hidden text-[clamp(3.25rem,18.5vw,16rem)] font-extrabold leading-[0.82] tracking-normal">
        {WORD.map((l, i) => (
          <motion.span
            key={i}
            className={cn("inline-block pb-[0.04em] transition-colors duration-300", i === 2 || i === 3 ? "text-olive hover:text-olive-deep" : "text-ink hover:text-olive")}
            initial={{ y: "110%" }}
            animate={show ? { y: "0%" } : {}}
            whileHover={{ y: "-6%" }}
            transition={{ duration: 1, ease: EASE.emphasized, delay: reduce ? 0 : i * 0.07 }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-[8px] border border-ink/10 bg-beige-warm/45 sm:mt-5">
        <motion.div className="origin-left" initial={{ scaleX: 0 }} animate={show ? { scaleX: 1 } : {}} transition={{ duration: 1.4, ease: EASE.emphasized, delay: 0.5 }}>
          <TapeRule units={20} unit={96} scale={1.4} flip className="h-10 w-[2000px] text-ink/40 sm:h-11" />
        </motion.div>
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const ctaLabel = getStartedHref.startsWith("/#") ? "Get the app" : "Get started";
  const explore = nav.filter(n => n.href !== "/contact");

  return (
    <footer className="relative overflow-hidden bg-surface">
      <div aria-hidden className="pointer-events-none absolute -right-[10%] -top-[30%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(closest-side,rgba(216,203,181,0.5),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-8 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr_1fr_1fr] lg:gap-10">
          {/* Pitch + CTA */}
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }} transition={{ duration: 0.8, ease: EASE.emphasized }}>
            <p className="display text-[2.1rem] text-ink sm:text-[2.5rem]">
              Every client, <span className="text-olive">kept for good.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={getStartedHref} iconRight={<ArrowRight size={16} strokeWidth={2} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />}>
                {ctaLabel}
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Talk to us
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {socials.map((s, i) => (
                <motion.li key={s.name} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 + i * 0.06 }}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Tayylo on ${s.name}`}
                    className="flex size-11 items-center justify-center rounded-full bg-surface-raised text-ink ring-1 ring-border transition-[transform,background-color,color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:rotate-[-6deg] hover:bg-olive hover:text-text-inverse hover:shadow-[var(--shadow-raised)]"
                  >
                    <SocialIcon name={s.icon} size={18} />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <Column title="Explore" delay={0.08}>
            {explore.map(n => (
              <li key={n.href}>
                <FooterLink href={n.href}>{n.label}</FooterLink>
              </li>
            ))}
          </Column>

          <Column title="Company" delay={0.16}>
            <li>
              <FooterLink href="/contact">Contact us</FooterLink>
            </li>
            <li>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </li>
            <li>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </li>
            {signInHref && (
              <li>
                <FooterLink href={signInHref} external>
                  Log in
                </FooterLink>
              </li>
            )}
          </Column>

          <Column title="Get in touch" delay={0.24}>
            {links.contactEmail && (
              <li>
                <FooterLink href={`mailto:${links.contactEmail}`} external>
                  {links.contactEmail}
                </FooterLink>
              </li>
            )}
            {links.whatsapp && (
              <li>
                <FooterLink href={`https://wa.me/${links.whatsapp}`} external>
                  WhatsApp +{links.whatsapp}
                </FooterLink>
              </li>
            )}
            <li>
              {links.appStore ? (
                <FooterLink href={links.appStore} external>
                  App Store
                </FooterLink>
              ) : (
                <span className="font-medium text-text-tertiary">App Store, coming soon</span>
              )}
            </li>
            <li>
              {links.playStore ? (
                <FooterLink href={links.playStore} external>
                  Google Play
                </FooterLink>
              ) : (
                <span className="font-medium text-text-tertiary">Google Play, coming soon</span>
              )}
            </li>
            {links.webApp && (
              <li>
                <FooterLink href={links.webApp} external>
                  Web app
                </FooterLink>
              </li>
            )}
          </Column>
        </div>

        <div className="mt-20 sm:mt-24">
          <Wordmark />
        </div>
      </div>

      <div className="relative mt-12 border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 text-[14px] text-text-secondary sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-1.5 font-semibold text-ink hover:text-olive"
            >
              Back to top
              <span className="flex size-7 items-center justify-center rounded-full bg-olive-soft text-olive-deep transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowUp size={14} strokeWidth={2.2} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
