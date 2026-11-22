import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { links, site } from "@/config/site";
import { getFaqs } from "@/content/faq";
import { Download } from "@/sections/download";
import { Faq } from "@/sections/faq";
import { Features } from "@/sections/features";
import { FinalCta } from "@/sections/final-cta";
import { ForCustomers } from "@/sections/for-customers";
import { ForTailors } from "@/sections/for-tailors";
import { Hero } from "@/sections/hero";
import { HowItWorks } from "@/sections/how-it-works";
import { Problem } from "@/sections/problem";
import { Showcase } from "@/sections/showcase";

export default function Home() {
  const faqs = getFaqs();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/icon_olive.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.name,
      description: site.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "iOS, Android, Web",
      url: site.url,
      ...(links.appStore || links.playStore ? { downloadUrl: [links.appStore, links.playStore].filter(Boolean) } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD is built from our own constants; escape "<" so it can never close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main">
        <Hero />
        <ForTailors />
        <Problem />
        <Showcase />
        <Features />
        <HowItWorks />
        <ForCustomers />
        <Download />
        <Faq items={faqs} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
