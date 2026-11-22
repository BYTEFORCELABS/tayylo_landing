import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none " +
  "transition-[transform,background-color,box-shadow,color] duration-200 ease-[var(--ease-out)] active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Olive pill with the app's raised treatment.
  primary: "bg-olive text-text-inverse shadow-[var(--shadow-raised)] hover:bg-olive-deep",
  secondary: "bg-surface-raised text-ink shadow-[var(--shadow-raised-light)] hover:bg-beige-light",
  ghost: "text-ink hover:bg-ink/5",
  // For dark olive surfaces.
  light: "bg-canvas text-olive-deep hover:bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]",
  "outline-light": "text-text-inverse ring-1 ring-inset ring-text-inverse/30 hover:bg-text-inverse/10",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-[14px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  const external = typeof href === "string" && /^https?:/.test(href);
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
