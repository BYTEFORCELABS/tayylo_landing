"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Loader2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { links } from "@/config/site";
import { CONTACT_TOPICS, type ContactTopic } from "@/content/contact";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";
type Fields = { name: string; email: string; studio: string; message: string };
const EMPTY: Fields = { name: "", email: "", studio: "", message: "" };

const inputCls =
  "w-full rounded-[14px] border border-border bg-canvas px-4 py-3.5 text-[15.5px] text-ink placeholder:text-text-tertiary/80 " +
  "transition-[border-color,box-shadow,background-color] duration-200 outline-none " +
  "hover:border-border-strong focus:border-olive focus:bg-surface-raised focus:shadow-[0_0_0_4px_rgba(69,79,44,0.12)]";

function Field({ label, optional, error, children, id }: { label: string; optional?: boolean; error?: string; children: React.ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[13.5px] font-semibold text-ink">
        {label}
        {optional && <span className="text-[12px] font-medium text-text-tertiary">Optional</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-error`} className="mt-1.5 text-[13px] font-medium text-danger" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function mailtoHref(topic: ContactTopic, f: Fields) {
  if (!links.contactEmail) return null;
  const subject = encodeURIComponent(`Tayylo: ${topic}`);
  const body = encodeURIComponent(`${f.message}\n\n${f.name}${f.studio ? `, ${f.studio}` : ""}\n${f.email}`);
  return `mailto:${links.contactEmail}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [topic, setTopic] = React.useState<ContactTopic>(CONTACT_TOPICS[0]);
  const [fields, setFields] = React.useState<Fields>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = React.useState<Status>("idle");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(er => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (new FormData(e.currentTarget).get("company") as string) || "";
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, topic, company: honeypot }),
      });
      if (res.ok) return setStatus("sent");
      const data = await res.json().catch(() => ({}));
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        return setStatus("idle");
      }
      setStatus(res.status === 503 ? "fallback" : "error");
    } catch {
      setStatus("error");
    }
  }

  const mailto = mailtoHref(topic, fields);
  const whatsapp = links.whatsapp ? `https://wa.me/${links.whatsapp}?text=${encodeURIComponent(fields.message || "Hello Tayylo")}` : null;

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-border/80 bg-surface-raised p-6 shadow-[0_40px_80px_-40px_rgba(30,32,25,0.35),0_2px_6px_rgba(30,32,25,0.05)] sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div key="sent" className="flex min-h-[520px] flex-col items-center justify-center text-center" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE.emphasized }}>
            <span className="flex size-20 items-center justify-center rounded-full bg-olive text-text-inverse shadow-[var(--shadow-raised)]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.25, ease: EASE.out }} />
              </svg>
            </span>
            <h2 className="mt-7 text-[28px] font-extrabold tracking-[-0.03em]">Message received.</h2>
            <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-text-secondary">
              Thanks, {fields.name.split(" ")[0] || "friend"}. We read every message and will reply to {fields.email} soon.
            </p>
            <Button
              variant="secondary"
              className="mt-8"
              onClick={() => {
                setFields(EMPTY);
                setStatus("idle");
              }}
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <fieldset>
              <legend className="mb-3 text-[13.5px] font-semibold text-ink">What brings you here?</legend>
              <div className="flex flex-wrap gap-2">
                {CONTACT_TOPICS.map(t => {
                  const on = t === topic;
                  return (
                    <label
                      key={t}
                      className={cn(
                        "relative cursor-pointer rounded-full px-4 py-2 text-[14px] transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-olive",
                        on ? "font-bold text-text-inverse" : "font-medium text-text-secondary ring-1 ring-border hover:text-ink hover:ring-border-strong"
                      )}
                    >
                      {on && <motion.span layoutId="topic-pill" className="absolute inset-0 rounded-full bg-olive" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                      <input type="radio" name="topic" value={t} checked={on} onChange={() => setTopic(t)} className="sr-only" />
                      <span className="relative">{t}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Your name" id="name" error={errors.name}>
                <input id="name" name="name" autoComplete="name" value={fields.name} onChange={set("name")} placeholder="Adaeze Okafor" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={inputCls} />
              </Field>
              <Field label="Email" id="email" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" value={fields.email} onChange={set("email")} placeholder="you@studio.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={inputCls} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Studio or business" id="studio" optional>
                <input id="studio" name="studio" autoComplete="organization" value={fields.studio} onChange={set("studio")} placeholder="Adaeze Atelier" className={inputCls} />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Message" id="message" error={errors.message}>
                <textarea id="message" name="message" rows={5} value={fields.message} onChange={set("message")} placeholder="Tell us about your studio, or ask us anything." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className={cn(inputCls, "resize-none")} />
              </Field>
            </div>

            {/* Honeypot for bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <AnimatePresence>
              {(status === "fallback" || status === "error") && (
                <motion.div className="mt-6 rounded-[18px] bg-warning-bg p-4 text-[14px] leading-relaxed text-warning" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <p className="font-semibold">
                    {status === "fallback" ? "Our inbox isn’t connected to this form yet." : "That didn’t go through. Please try again."}
                  </p>
                  {(mailto || whatsapp) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mailto && (
                        <a href={mailto} className="inline-flex items-center gap-2 rounded-full bg-surface-raised px-4 py-2 font-semibold text-ink ring-1 ring-border hover:bg-canvas">
                          <Mail size={15} strokeWidth={2} /> Send it by email
                        </a>
                      )}
                      {whatsapp && (
                        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-surface-raised px-4 py-2 font-semibold text-ink ring-1 ring-border hover:bg-canvas">
                          <MessageCircle size={15} strokeWidth={2} /> Message us on WhatsApp
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-7 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[13px] text-text-tertiary">We usually reply within one working day.</p>
              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                iconRight={status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} strokeWidth={2} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />}
              >
                {status === "sending" ? "Sending" : "Send message"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
