// ------------------------------------------------------------------
// Central site configuration.
//
// Every outward link lives here so it can be changed in one place.
// Store links are read from environment variables. When a value is
// empty, that platform is shown as "Coming soon" instead of a link,
// so the site never points at an invented URL.
//
//   NEXT_PUBLIC_SITE_URL         Canonical origin of this landing page
//   NEXT_PUBLIC_APP_STORE_URL    Apple App Store listing
//   NEXT_PUBLIC_PLAY_STORE_URL   Google Play listing
//   NEXT_PUBLIC_WEB_APP_URL      The Tayylo web app (sign up / sign in)
//   NEXT_PUBLIC_CONTACT_EMAIL    Public contact address
//   NEXT_PUBLIC_WHATSAPP_NUMBER  WhatsApp number in international format, digits only
//   NEXT_PUBLIC_INSTAGRAM_URL … NEXT_PUBLIC_LINKEDIN_URL   Social profiles (see `socials`)
// ------------------------------------------------------------------

const clean = (v: string | undefined) => (v && v.trim() ? v.trim().replace(/\/$/, "") : null);

function resolveSiteUrl() {
  const explicit = clean(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit;
  const vercel = clean(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercel) return `https://${vercel}`;
  return process.env.NODE_ENV === "production" ? "https://tayylo.com" : "http://localhost:3000";
}

export const site = {
  name: "Tayylo",
  tagline: "The modern tailor’s notebook",
  description:
    "Tayylo helps modern tailors remember every client, every measurement and every order. Find any client in two seconds, record measurements with a tape keypad, and run every order from cutting to collection.",
  url: resolveSiteUrl(),
  locale: "en",
} as const;

export const links = {
  appStore: clean(process.env.NEXT_PUBLIC_APP_STORE_URL),
  playStore: clean(process.env.NEXT_PUBLIC_PLAY_STORE_URL),
  // Defaults to app.tayylo.com; set NEXT_PUBLIC_WEB_APP_URL if the web app lives elsewhere.
  webApp: clean(process.env.NEXT_PUBLIC_WEB_APP_URL) ?? "https://app.tayylo.com",
  contactEmail: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/[^\d]/g, "") || null,
} as const;

/**
 * Social profiles. Each one can be overridden with an environment variable;
 * the defaults assume the @tayylo handle, so confirm they are live before launch.
 */
export const socials = [
  { name: "Instagram", icon: "instagram", href: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL) ?? "https://www.instagram.com/tayylo" },
  { name: "TikTok", icon: "tiktok", href: clean(process.env.NEXT_PUBLIC_TIKTOK_URL) ?? "https://www.tiktok.com/@tayylo" },
  { name: "X", icon: "x", href: clean(process.env.NEXT_PUBLIC_X_URL) ?? "https://x.com/tayylo" },
  { name: "Facebook", icon: "facebook", href: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL) ?? "https://www.facebook.com/tayylo" },
  { name: "LinkedIn", icon: "linkedin", href: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL) ?? "https://www.linkedin.com/company/tayylo" },
] as const;

export type SocialIcon = (typeof socials)[number]["icon"];

/** Primary "get started" destination: the web app if live, otherwise the download section. */
export const getStartedHref = links.webApp ? `${links.webApp}/auth?mode=signup` : "/#download";
export const signInHref = links.webApp ? `${links.webApp}/auth?mode=signin` : null;
export const signUpHref = links.webApp ? `${links.webApp}/auth?mode=signup` : null;

/**
 * Primary navigation. `sections` are the element ids on the home page that
 * light the item up while they are on screen; `/contact` lights up by path.
 */
export const nav = [
  { label: "For tailors", href: "/#for-tailors", sections: ["for-tailors"] },
  { label: "Features", href: "/#features", sections: ["features", "feature-details"] },
  { label: "How it works", href: "/#how-it-works", sections: ["how-it-works"] },
  { label: "For customers", href: "/#for-customers", sections: ["for-customers"] },
  { label: "FAQ", href: "/#faq", sections: ["faq"] },
  { label: "Contact", href: "/contact", sections: [] },
] as const;
