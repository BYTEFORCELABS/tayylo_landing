import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { links } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using Tayylo.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="22 November 2026">
      <p>
        These terms cover your use of Tayylo&rsquo;s mobile apps, web app and website. By creating an account or using Tayylo, you agree to them.
      </p>

      <h2>Your account</h2>
      <p>
        Keep your sign-in details safe and let us know if you think someone else has used your account. You are responsible for activity in your account.
      </p>

      <h2>Your content</h2>
      <p>
        You own the information you put into Tayylo, including client records, measurements, orders, photos and documents. You give us permission to store and process it only so we can provide the service to you. You can export it or delete it at any time.
      </p>
      <p>
        When you record details about your clients, you are responsible for having their permission to do so and for using that information lawfully.
      </p>

      <h2>Explore</h2>
      <p>
        Only publish photos you have the right to share. Don&rsquo;t post anything unlawful, offensive or misleading. We may remove posts that break these rules.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Don&rsquo;t try to access accounts or data that aren&rsquo;t yours.</li>
        <li>Don&rsquo;t disrupt or overload the service, or use it to send spam.</li>
        <li>Don&rsquo;t copy or resell the service.</li>
      </ul>

      <h2>The service</h2>
      <p>
        We work hard to keep Tayylo reliable and your data safe, and we keep improving it, which means features may change. Tayylo is provided as it is, and we recommend exporting a backup of your records from time to time.
      </p>

      <h2>Ending your use</h2>
      <p>
        You can stop using Tayylo and delete your account whenever you like. We may suspend accounts that seriously or repeatedly break these terms.
      </p>

      <h2>Changes</h2>
      <p>If we change these terms in a meaningful way, we will update the date at the top of this page.</p>

      {links.contactEmail && (
        <>
          <h2>Contact</h2>
          <p>
            Questions about these terms? Email <a href={`mailto:${links.contactEmail}`}>{links.contactEmail}</a>.
          </p>
        </>
      )}
    </LegalPage>
  );
}
