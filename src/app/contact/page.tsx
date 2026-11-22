import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HelpCircle, Mail, MessageCircle } from "lucide-react";
import { SocialIcon } from "@/components/brand/social-icons";
import { TapeRule } from "@/components/brand/tape-rule";
import { ContactForm } from "@/components/contact/contact-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LineReveal, Reveal } from "@/components/ui/reveal";
import { links, socials } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Tayylo team about your studio, partnerships or press. We usually reply within one working day.",
  alternates: { canonical: "/contact" },
};

function Channel({ href, icon, title, detail, external }: { href: string; icon: React.ReactNode; title: string; detail: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-[22px] border border-border/80 bg-surface-raised/70 p-4 transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-surface-raised hover:shadow-[var(--shadow-float)]"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-olive-soft text-olive-deep transition-colors duration-300 group-hover:bg-olive group-hover:text-text-inverse">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-bold">{title}</span>
        <span className="block truncate text-[14px] text-text-secondary">{detail}</span>
      </span>
      <ArrowUpRight size={18} strokeWidth={2} className="shrink-0 text-text-tertiary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-olive" />
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="grain relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute right-[-15%] top-[-10%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(closest-side,rgba(216,203,181,0.55),transparent)]" />
        <div aria-hidden className="pointer-events-none absolute bottom-[-20%] left-[-20%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(closest-side,rgba(169,179,134,0.25),transparent)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-24 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:pb-32">
          <div>
            <Reveal y={12}>
              <p className="eyebrow text-olive">Contact</p>
            </Reveal>
            <LineReveal
              as="h1"
              lines={["Let’s talk", <span key="e" className="text-olive">tailoring.</span>]}
              className="display mt-5 text-[2.8rem] text-ink sm:text-[4rem] lg:text-[4.4rem]"
            />
            <Reveal delay={0.15} y={14}>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-text-secondary sm:text-[18px]">
                Running a studio, thinking about switching from your notebook, or want to work with us? Send a note and a real person on the Tayylo team will get back to you.
              </p>
            </Reveal>

            <Reveal delay={0.2} y={14}>
              <div className="mt-10 grid gap-3">
                {links.contactEmail && <Channel href={`mailto:${links.contactEmail}`} icon={<Mail size={20} strokeWidth={1.9} />} title="Email us" detail={links.contactEmail} />}
                {links.whatsapp && <Channel href={`https://wa.me/${links.whatsapp}`} external icon={<MessageCircle size={20} strokeWidth={1.9} />} title="WhatsApp" detail={`+${links.whatsapp}`} />}
                <Link
                  href="/#faq"
                  className="group flex items-center gap-4 rounded-[22px] border border-border/80 bg-surface-raised/70 p-4 transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:bg-surface-raised hover:shadow-[var(--shadow-float)]"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-olive-soft text-olive-deep transition-colors duration-300 group-hover:bg-olive group-hover:text-text-inverse">
                    <HelpCircle size={20} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] font-bold">Quick answers</span>
                    <span className="block truncate text-[14px] text-text-secondary">Pricing, data, devices and more in our FAQ</span>
                  </span>
                  <ArrowUpRight size={18} strokeWidth={2} className="shrink-0 text-text-tertiary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-olive" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.28} y={14}>
              <p className="mt-10 text-[13.5px] font-semibold text-ink">Follow along</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {socials.map(s => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Tayylo on ${s.name}`}
                      className="flex size-12 items-center justify-center rounded-full bg-surface-raised text-ink ring-1 ring-border transition-[transform,background-color,color] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:bg-olive hover:text-text-inverse"
                    >
                      <SocialIcon name={s.icon} size={19} />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div aria-hidden className="mt-12 hidden overflow-hidden rounded-[10px] border border-ink/10 bg-beige-warm/40 lg:block">
              <TapeRule units={8} unit={96} scale={1.4} flip className="h-10 w-[800px] text-ink/40" />
            </div>
          </div>

          <Reveal delay={0.1} y={30}>
            <ContactForm />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
