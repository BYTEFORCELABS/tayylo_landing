import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { DataVisual } from "./data-visual";
import { DocumentsVisual } from "./documents-visual";
import { FeatureBlock } from "./feature-block";
import { MeasureVisual } from "./measure-visual";
import { SearchVisual } from "./search-visual";

const SWATCHES = [
  { name: "Aso-oke", src: "/images/fabrics/aso-oke.jpg" },
  { name: "Linen", src: "/images/fabrics/linen.jpg" },
  { name: "Lace", src: "/images/fabrics/lace.jpg" },
  { name: "Tartan wool", src: "/images/fabrics/tartan-wool.jpg" },
  { name: "Indigo print", src: "/images/fabrics/indigo-print.jpg" },
  { name: "Charcoal linen", src: "/images/fabrics/charcoal-linen.jpg" },
];

export function Features() {
  return (
    <section id="feature-details" aria-label="Features" className="relative overflow-hidden">
      {/* Search */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <FeatureBlock
          index="01"
          eyebrow="Search"
          title={["Found in", <span key="e" className="text-olive">two seconds.</span>]}
          body="A client calls. Type a few letters of their name or phone number and their measurements, orders and balance are in front of you before they finish saying hello."
          points={["Search names, phones, tags, notes and orders", "Recent clients one tap from home", "Every client’s full history on one profile"]}
          visual={<SearchVisual />}
        />
      </div>

      {/* Measure — olive-tinted band */}
      <div className="bg-olive-soft/70">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
          <FeatureBlock
            index="02"
            eyebrow="Measure"
            tone="olive"
            flip
            title={["Measure at the", <span key="e" className="text-olive">speed of a tape.</span>]}
            body="Measuring happens standing next to a client with a tape around their chest. So Tayylo puts one measurement on screen at a time, shows where the tape goes, and keeps the keys where your thumb is."
            points={[
              "¼ ½ ¾ keys, so you never switch keyboards",
              "Inches or centimetres, your choice",
              "A diagram for every point, showing where the tape goes",
              "Your progress is saved as you go if you’re interrupted",
            ]}
            visual={<MeasureVisual />}
          />
        </div>
      </div>

      {/* Documents */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <FeatureBlock
          index="03"
          eyebrow="Cards, invoices & receipts"
          title={["Paperwork that", <span key="e" className="text-olive">carries your name.</span>]}
          body="Send a client their measurement card as a clean image. Invoices and receipts are made for you from each order, with your logo and the bank details you want clients to pay into."
          points={[
            "Send on WhatsApp, share, print or save as a PDF",
            "Your studio logo on every invoice and receipt",
            "A receipt is ready the moment a balance is paid",
          ]}
          visual={<DocumentsVisual />}
        />
      </div>

      {/* Fabric library band */}
      <div className="border-y border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-8 lg:flex-row lg:items-center lg:gap-16">
          <Reveal className="max-w-sm shrink-0">
            <p className="eyebrow text-olive">Fabric library</p>
            <p className="mt-3 text-[22px] font-semibold leading-snug tracking-[-0.01em]">
              Snap the client&rsquo;s fabric, or pick the closest swatch from the library.
            </p>
          </Reveal>
          <ul className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 lg:mx-0 lg:grid lg:flex-1 lg:grid-cols-6 lg:px-0">
            {SWATCHES.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 0.05} y={14} className="w-[132px] shrink-0 lg:w-auto">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] ring-1 ring-border">
                  <Image src={s.src} alt={`${s.name} swatch`} fill sizes="(min-width: 1024px) 160px, 132px" className="object-cover transition-transform duration-700 ease-[var(--ease-out)] hover:scale-105" />
                </div>
                <p className="mt-2 text-[13px] text-text-secondary">{s.name}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Data ownership */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <FeatureBlock
          index="04"
          eyebrow="Your data"
          flip
          title={["Your records", <span key="e" className="text-olive">belong to you.</span>]}
          body="Bring your existing client list in from a spreadsheet, and download everything whenever you like. If you ever leave, your clients, measurement history and orders leave with you."
          points={["Import clients from a CSV file or spreadsheet", "Export a clients spreadsheet or a full backup", "Delete your account and everything in it, any time"]}
          visual={<DataVisual />}
        />
      </div>
    </section>
  );
}
