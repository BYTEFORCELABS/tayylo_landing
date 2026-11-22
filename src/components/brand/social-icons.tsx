import type { SocialIcon as SocialIconName } from "@/config/site";

/** Simple single-colour social marks drawn on a 24px grid. They take currentColor. */
export function SocialIcon({ name, size = 20 }: { name: SocialIconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true } as const;
  switch (name) {
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.9}>
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3c-1.4.1-2.7-.3-3.9-1.1v6.1c0 3.6-2.6 5.7-5.6 5.7-3.2 0-5.5-2.5-5.5-5.4 0-3.5 3-5.9 6.5-5.3v3.1c-1.6-.4-3.2.6-3.2 2.2 0 1.3 1 2.3 2.3 2.3 1.4 0 2.3-.9 2.3-2.6V3z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78zm-1.08 16.18h1.7L7.4 4.73H5.58z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <rect x="3.6" y="9" width="3.6" height="11.4" rx="0.4" />
          <circle cx="5.4" cy="5.3" r="2.1" />
          <path d="M10 9h3.4v1.6c.5-.9 1.7-1.9 3.6-1.9 3.4 0 4.2 2.2 4.2 5.1v6.6h-3.6v-5.8c0-1.4-.1-3-1.9-3s-2.1 1.4-2.1 2.9v5.9H10z" />
        </svg>
      );
  }
}
