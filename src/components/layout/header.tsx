"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { getStartedHref, nav, signInHref, signUpHref } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ALL_SECTIONS = nav.flatMap(n => n.sections);

/**
 * Bold labels are wider than regular ones. Reserving the bold width up front
 * keeps the bar from shifting when an item becomes active.
 */
function StableLabel({ children }: { children: string }) {
  return (
    <span className="grid">
      <span aria-hidden className="invisible font-bold [grid-area:1/1]">
        {children}
      </span>
      <span className="[grid-area:1/1]">{children}</span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const section = useActiveSection(onHome ? ALL_SECTIONS : []);

  const activeHref =
    nav.find(n => (n.sections.length ? onHome && section !== null && (n.sections as readonly string[]).includes(section) : pathname === n.href))?.href ?? null;

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock scroll and close on Escape while the mobile menu is open.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Log in / Sign up go to the web app; without one, fall back to the download section.
  const loginHref = signInHref ?? getStartedHref;
  const signupHref = signUpHref ?? getStartedHref;
  const floating = scrolled || open;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-text-inverse">
        Skip to content
      </a>

      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-500 ease-[var(--ease-emphasized)] sm:px-5",
          floating ? "pt-3 sm:pt-4" : "pt-0"
        )}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE.emphasized, delay: 0.05 }}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 rounded-full border transition-[max-width,height,padding,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-emphasized)]",
            floating
              ? "h-[60px] max-w-[66rem] border-border/80 bg-surface-raised/80 pl-5 pr-2 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_18px_40px_-20px_rgba(30,32,25,0.35),0_2px_6px_rgba(30,32,25,0.05)] backdrop-blur-xl backdrop-saturate-150 sm:pl-6"
              : "h-20 max-w-[80rem] border-transparent bg-transparent px-1 sm:px-3"
          )}
        >
          <Link href="/" aria-label="Tayylo home" className="-m-2 shrink-0 rounded-lg p-2">
            <Logo height={floating ? 18 : 20} priority className="transition-[width,height] duration-500" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map(item => {
                const on = item.href === activeHref;
                return (
                  <li key={item.href} className="relative">
                    {on && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-olive-soft ring-1 ring-olive/15"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Link
                      href={item.href}
                      aria-current={on ? "location" : undefined}
                      className={cn(
                        "relative block rounded-full px-3 py-2 text-[14px] transition-colors duration-200 xl:px-4",
                        on ? "font-bold text-olive" : "font-medium text-text-secondary hover:text-ink"
                      )}
                    >
                      <StableLabel>{item.label}</StableLabel>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5">
            {/* Desktop only: on smaller screens these live in the menu */}
            <div className="hidden items-center gap-1.5 lg:flex">
              <ButtonLink
                href={loginHref}
                variant="ghost"
                className={cn("px-4 ring-1 ring-inset ring-border-strong/70 transition-[height,padding,background-color] hover:ring-olive/40", floating && "h-11")}
              >
                Log in
              </ButtonLink>
              <ButtonLink
                href={signupHref}
                className={cn("transition-[height,padding]", floating && "h-11")}
                iconRight={<ArrowRight size={16} strokeWidth={2} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />}
              >
                Sign up
              </ButtonLink>
            </div>
            <button
              type="button"
              className={cn("inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors lg:hidden", open ? "bg-olive text-text-inverse" : "hover:bg-ink/5")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(o => !o)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={open ? "x" : "m"} initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}>
                  {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu: a card that drops out of the pill */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-40 bg-olive-ink/25 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-x-3 top-[84px] z-50 origin-top overflow-hidden rounded-[28px] border border-border/80 bg-surface-raised p-3 shadow-[var(--shadow-dialog)] sm:inset-x-5 sm:top-[88px] lg:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE.emphasized }}
            >
              <nav aria-label="Mobile">
                <ul>
                  {nav.map((item, i) => {
                    const on = item.href === activeHref;
                    return (
                      <motion.li key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.04, duration: 0.4, ease: EASE.emphasized }}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={on ? "location" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-[18px] px-4 py-3.5 text-[19px] tracking-[-0.01em] transition-colors",
                            on ? "bg-olive-soft font-bold text-olive" : "font-semibold text-ink hover:bg-canvas"
                          )}
                        >
                          {item.label}
                          <ArrowRight size={18} strokeWidth={2} className={on ? "text-olive" : "text-text-tertiary"} />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
                <motion.div className="mt-2 grid gap-2 border-t border-divider p-1 pt-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4, ease: EASE.emphasized }}>
                  <ButtonLink href={signupHref} size="lg" className="w-full" onClick={() => setOpen(false)}>
                    Sign up
                  </ButtonLink>
                  <ButtonLink href={loginHref} variant="secondary" size="lg" className="w-full" onClick={() => setOpen(false)}>
                    Log in
                  </ButtonLink>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
