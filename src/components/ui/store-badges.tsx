import { links } from "@/config/site";
import { cn } from "@/lib/utils";

function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 384 512" aria-hidden className={className} fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden className={className}>
      <path fill="#34A853" d="M48 59.5v393c0 9.9 5.6 18.5 13.8 22.6L289 256 61.8 36.9C53.6 41 48 49.6 48 59.5z" />
      <path fill="#FBBC04" d="M371.6 338.6 289 256l82.6-82.6 99.7 56.6c25.3 14.4 25.3 37.6 0 52l-99.7 56.6z" />
      <path fill="#EA4335" d="M61.8 475.1c6.9 3.5 15.5 3.4 23.2-1L371.6 338.6 289 256 61.8 475.1z" />
      <path fill="#4285F4" d="M61.8 36.9 289 256l82.6-82.6L85 7.9c-7.7-4.4-16.3-4.5-23.2-1z" />
    </svg>
  );
}

type Tone = "dark" | "light";

function Badge({
  href,
  icon,
  kicker,
  label,
  tone,
}: {
  href: string | null;
  icon: React.ReactNode;
  kicker: string;
  label: string;
  tone: Tone;
}) {
  const live = Boolean(href);
  const cls = cn(
    "inline-flex h-[54px] min-w-[172px] items-center gap-3 rounded-[14px] pl-4 pr-5 text-left transition-[transform,background-color] duration-200 ease-[var(--ease-out)]",
    tone === "dark"
      ? "bg-ink text-text-inverse ring-1 ring-ink"
      : "bg-surface-raised text-ink ring-1 ring-border",
    live ? "hover:-translate-y-0.5 active:scale-[0.98]" : "cursor-default"
  );
  const body = (
    <>
      {icon}
      <span className="flex flex-col leading-none">
        <span className={cn("text-[11px] font-medium", tone === "dark" ? "text-text-inverse/70" : "text-text-tertiary")}>
          {live ? kicker : "Coming soon on"}
        </span>
        <span className="mt-1 text-[18px] font-semibold tracking-[-0.01em]">{label}</span>
      </span>
    </>
  );
  if (!live) {
    return (
      <span className={cls} aria-label={`${label}: coming soon`} role="img">
        {body}
      </span>
    );
  }
  return (
    <a href={href!} className={cls} target="_blank" rel="noopener noreferrer" aria-label={`${kicker} ${label}`}>
      {body}
    </a>
  );
}

/** App Store and Google Play buttons. Links come only from site config; otherwise "Coming soon". */
export function StoreBadges({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Badge
        href={links.appStore}
        tone={tone}
        kicker="Download on the"
        label="App Store"
        icon={<AppleMark className="size-[26px] -mt-0.5" />}
      />
      <Badge
        href={links.playStore}
        tone={tone}
        kicker="Get it on"
        label="Google Play"
        icon={<PlayMark className="size-[24px]" />}
      />
    </div>
  );
}
