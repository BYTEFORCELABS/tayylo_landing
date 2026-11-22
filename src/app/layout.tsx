import type { Metadata, Viewport } from "next";
import { Montserrat, Patrick_Hand, Urbanist } from "next/font/google";
import { MotionProvider } from "@/components/layout/motion-provider";
import { site } from "@/config/site";
import "./globals.css";

// Montserrat carries the marketing site: bold, confident display type and clean body copy.
// Urbanist is the product's own typeface, kept inside the phone mockups so the screens match the real app.
// Patrick Hand is only used for the handwritten notebook page.
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap", weight: ["400", "500", "600", "700", "800"] });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist", display: "swap" });
const patrickHand = Patrick_Hand({ subsets: ["latin"], variable: "--font-patrick-hand", display: "swap", weight: "400" });

const title = "Tayylo | The modern tailor’s notebook";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · Tayylo" },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "tailor app",
    "tailoring software",
    "measurement app",
    "dressmaker app",
    "bespoke tailoring",
    "client measurements",
    "tailor order management",
    "alterations",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#F4F2EC",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${urbanist.variable} ${patrickHand.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
