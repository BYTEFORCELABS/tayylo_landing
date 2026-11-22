import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "./footer";
import { Header } from "./header";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="bg-canvas pb-24 pt-32 sm:pt-40">
        <article className="mx-auto max-w-3xl px-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-secondary hover:text-ink">
            <ArrowLeft size={16} strokeWidth={2} /> Back to Tayylo
          </Link>
          <h1 className="display mt-8 text-[2.4rem] sm:text-[3.2rem]">{title}</h1>
          <p className="mt-4 text-[14px] text-text-tertiary">Last updated {updated}</p>
          <div
            className="mt-12 space-y-6 text-[16.5px] leading-relaxed text-text-secondary
              [&_a]:font-semibold [&_a]:text-ink [&_a]:underline [&_a]:decoration-olive/40 [&_a]:underline-offset-4
              [&_h2]:mt-12 [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:tracking-[-0.01em] [&_h2]:text-ink
              [&_li]:pl-1 [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
          >
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
