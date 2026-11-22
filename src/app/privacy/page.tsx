import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { links } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Tayylo handles your studio’s data and your clients’ measurements.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="22 November 2026">
      <p>
        Tayylo is a workspace for tailors and their clients. Measurements and client details are personal information, and we treat them that way. This page explains, in plain language, what Tayylo stores and what you can do with it.
      </p>

      <h2>What we store</h2>
      <ul>
        <li><strong>Your account:</strong> your email address and a securely hashed password, and whether you use Tayylo as a tailor or a customer.</li>
        <li><strong>Your studio:</strong> the details you choose to add, such as your studio name, your name, country, currency, measurement unit, logo and the bank accounts you want shown on invoices.</li>
        <li><strong>Your clients and work:</strong> client names, phone numbers, email addresses, notes and tags, measurement sets, orders, payments, fittings, and the photos you attach.</li>
        <li><strong>Explore:</strong> the style photos and captions you choose to publish, and the styles you save.</li>
      </ul>

      <h2>How it is used</h2>
      <p>
        We use this information only to run Tayylo for you: to show your workspace on your devices, make invoices, receipts and measurement cards, and send account emails such as password resets. We do not show ads and we do not sell your data or your clients&rsquo; measurements.
      </p>

      <h2>Who can see it</h2>
      <p>
        Your workspace is private to your account. Things you share yourself, such as a measurement card sent on WhatsApp or a style published to Explore, are visible to the people you share them with. We use trusted service providers to host the app, store data and photos, and deliver email, and they process data only on our behalf.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Export a clients spreadsheet or a full backup of your clients, measurement history and orders at any time from settings.</li>
        <li>Edit your clients, and delete orders, photos and Explore posts.</li>
        <li>Delete your account from settings. This removes your login and everything in it.</li>
      </ul>

      <h2>This website</h2>
      <p>This landing page does not use advertising or tracking cookies.</p>

      {links.contactEmail && (
        <>
          <h2>Contact</h2>
          <p>
            Questions about privacy? Email <a href={`mailto:${links.contactEmail}`}>{links.contactEmail}</a>.
          </p>
        </>
      )}
    </LegalPage>
  );
}
