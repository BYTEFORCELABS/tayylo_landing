"use client";

// Faithful web recreations of the Tayylo app's own primitives (status tag,
// avatar, pill buttons, floating tab bar) used inside the phone demos.

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, CircleUserRound, House, IdCard, Plus, ShoppingCart, type LucideIcon } from "lucide-react";
import type { OrderStatus } from "@/content/demo";
import { cn, initials, tintFor } from "@/lib/utils";

export const STROKE = 1.75;

// ------------------------------------------------------------ status bar

export function StatusBar({ dark = false, solid = false }: { dark?: boolean; solid?: boolean }) {
  const c = dark ? "#FBFAF7" : "#1E2019";
  return (
    <div className={cn("relative z-40 flex h-[54px] shrink-0 items-center justify-between px-[34px] pt-[6px]", solid && "bg-canvas")} style={{ color: c }}>
      <span className="tabular text-[16px] font-semibold tracking-[-0.01em]">9:41</span>
      <span className="flex items-center gap-[6px]">
        <svg width="18" height="12" viewBox="0 0 18 12" fill={c} aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c} aria-hidden>
          <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.1-1.1A10 10 0 0 0 8 .8 10 10 0 0 0 .9 3.7L2 4.8a8.4 8.4 0 0 1 6-2.4Zm0 3.2c1.4 0 2.7.5 3.7 1.4l1.1-1.1A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.8 1.9L4.3 7c1-.9 2.3-1.4 3.7-1.4Zm0 3.2c-.6 0-1.1.2-1.5.6L8 11l1.5-1.6c-.4-.4-.9-.6-1.5-.6Z" />
        </svg>
        <span className="relative ml-[2px] h-[12px] w-[25px] rounded-[4px] border border-current/40 p-[1.5px]">
          <span className="block h-full w-[80%] rounded-[2px]" style={{ background: c }} />
          <span className="absolute -right-[3px] top-1/2 h-[4px] w-[1.5px] -translate-y-1/2 rounded-r-sm" style={{ background: c, opacity: 0.45 }} />
        </span>
      </span>
    </div>
  );
}

// ------------------------------------------------------------ status tag

const TONES: Record<OrderStatus | "cancelled", { dot: string; text: string; bg: string }> = {
  pending: { dot: "#E0A800", text: "#8A6400", bg: "#FFF3C4" },
  cutting: { dot: "#3F6175", text: "#3F6175", bg: "#E2EAEE" },
  sewing: { dot: "#3F6175", text: "#3F6175", bg: "#E2EAEE" },
  fitting: { dot: "#454F2C", text: "#2E3420", bg: "#E6E8DA" },
  alterations: { dot: "#8F6220", text: "#8F6220", bg: "#F4EBDA" },
  ready: { dot: "#3D6B48", text: "#3D6B48", bg: "#E5EEE4" },
  delivered: { dot: "#16A34A", text: "#13803A", bg: "#D9F7E1" },
  overdue: { dot: "#9C3D2C", text: "#9C3D2C", bg: "#F5E4DF" },
  cancelled: { dot: "#CFCBBE", text: "#6B6D62", bg: "#ECE9E1" },
};
const LABEL: Record<string, string> = {
  pending: "Pending",
  cutting: "Cutting",
  sewing: "Sewing",
  fitting: "Fitting",
  alterations: "Alterations",
  ready: "Ready",
  delivered: "Delivered",
  overdue: "Overdue",
};

export function StatusTag({ status, size = "md" }: { status: OrderStatus; size?: "sm" | "md" }) {
  const t = TONES[status];
  return (
    <motion.span
      layout
      className={cn("inline-flex items-center gap-1.5 rounded-full font-semibold", size === "sm" ? "h-5 px-2 text-[11px]" : "h-6 px-2.5 text-[12px]")}
      style={{ background: t.bg, color: t.text }}
    >
      <span className="size-1.5 rounded-full" style={{ background: t.dot }} />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={status} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.25 }}>
          {LABEL[status]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

// ------------------------------------------------------------ avatar

export function Avatar({ name, size = 40, rounded = false, className }: { name: string; size?: number; rounded?: boolean; className?: string }) {
  const t = tintFor(name);
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center font-semibold tracking-[-0.01em]", className)}
      style={{
        width: size,
        height: size,
        borderRadius: rounded ? Math.round(size * 0.3) : size / 2,
        background: t.bg,
        color: t.fg,
        fontSize: Math.round(size * 0.36),
      }}
    >
      {initials(name)}
    </span>
  );
}

// ------------------------------------------------------------ buttons

export function AppButton({
  children,
  variant = "primary",
  pressed = false,
  icon: Icon,
  className,
  size = "lg",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  pressed?: boolean;
  icon?: LucideIcon;
  className?: string;
  size?: "lg" | "md" | "sm";
}) {
  return (
    <motion.span
      animate={{ scale: pressed ? 0.95 : 1 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        size === "lg" ? "h-[52px] px-6 text-[16px]" : size === "md" ? "h-[44px] px-5 text-[15px]" : "h-[36px] px-4 text-[13px]",
        variant === "primary" && (pressed ? "bg-olive-deep text-text-inverse" : "bg-olive text-text-inverse shadow-[var(--shadow-raised)]"),
        variant === "secondary" && (pressed ? "bg-beige-light text-ink" : "bg-surface-raised text-ink shadow-[var(--shadow-raised-light)]"),
        variant === "ghost" && "text-ink",
        className
      )}
    >
      {Icon && <Icon size={size === "sm" ? 16 : 20} strokeWidth={STROKE} />}
      {children}
    </motion.span>
  );
}

export function IconCircle({ icon: Icon, className, pressed }: { icon: LucideIcon; className?: string; pressed?: boolean }) {
  return (
    <motion.span
      animate={{ scale: pressed ? 0.9 : 1 }}
      className={cn("inline-flex size-[42px] items-center justify-center rounded-full bg-surface-raised text-ink shadow-[var(--shadow-raised-light)]", className)}
    >
      <Icon size={21} strokeWidth={STROKE} />
    </motion.span>
  );
}

// ------------------------------------------------------------ header

export function ScreenHeader({ eyebrow, title, actions }: { eyebrow?: string; title: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 pb-3 pt-1">
      <span className="inline-flex size-[42px] shrink-0 items-center justify-center rounded-full bg-surface-raised shadow-[var(--shadow-raised-light)]">
        <ChevronLeft size={22} strokeWidth={STROKE} />
      </span>
      <div className="min-w-0 flex-1">
        {eyebrow && <p className="truncate text-[13px] text-text-tertiary">{eyebrow}</p>}
        <p className="truncate text-[19px] font-semibold leading-tight tracking-[-0.01em]">{title}</p>
      </div>
      {actions}
    </div>
  );
}

// ------------------------------------------------------------ floating tab bar

const TABS: { label: string; icon: LucideIcon }[] = [
  { label: "Home", icon: House },
  { label: "Contact", icon: IdCard },
  { label: "Orders", icon: ShoppingCart },
  { label: "Profile", icon: CircleUserRound },
];

/** The app's floating tab bar with the raised centre "+" sitting in a groove. */
export function TabBar({ active = 0, fabPressed = false }: { active?: number; fabPressed?: boolean }) {
  const W = 358;
  const H = 64;
  const maskId = `groove-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const tab = (t: (typeof TABS)[number], i: number) => {
    const on = i === active;
    const Icon = t.icon;
    return (
      <span key={t.label} className="flex flex-1 flex-col items-center justify-center gap-[3px]">
        <span className="relative flex h-[30px] w-[52px] items-center justify-center">
          {on && <span className="absolute inset-0 rounded-full" style={{ background: "rgba(63,138,42,0.12)" }} />}
          <Icon size={23} strokeWidth={on ? 2.1 : 1.6} color={on ? "#3F8A2A" : "#55574C"} className="relative" />
        </span>
        {on && <span className="text-[11px] font-semibold leading-none text-[#3F8A2A]">{t.label}</span>}
      </span>
    );
  };
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-[22px] z-30" style={{ height: H }}>
      <svg width={W} height={H} className="absolute inset-0" style={{ filter: "drop-shadow(0 10px 22px rgba(30,32,25,0.16))" }} aria-hidden>
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width={W} height={H} rx={H / 2} fill="#fff" />
            <circle cx={W / 2} cy={4} r={40.5} fill="#000" />
          </mask>
        </defs>
        <rect x="0" y="0" width={W} height={H} rx={H / 2} fill="#FFFFFF" mask={`url(#${maskId})`} />
      </svg>
      <div className="relative flex h-full items-center px-2">
        {TABS.slice(0, 2).map(tab)}
        <span className="w-[84px]" />
        {TABS.slice(2).map((t, i) => tab(t, i + 2))}
      </div>
      <motion.span
        animate={{ scale: fabPressed ? 0.9 : 1 }}
        className="absolute left-1/2 top-[-30px] flex size-[64px] -translate-x-1/2 items-center justify-center rounded-full text-text-inverse"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0) 55%, rgba(0,0,0,0.18)), #454F2C",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.22), 0 2px 4px rgba(30,32,25,0.2), 0 12px 24px -8px rgba(46,52,28,0.6)",
        }}
      >
        <Plus size={28} strokeWidth={2.25} />
      </motion.span>
    </div>
  );
}

// ------------------------------------------------------------ tap indicator

/** A soft touch ripple showing where the "user" taps. Coordinates in screen points. */
export function Tap({ x, y, show }: { x: number; y: number; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          key={`${x}-${y}`}
          aria-hidden
          className="pointer-events-none absolute z-[45] size-[46px] rounded-full"
          style={{ left: x - 23, top: y - 23, background: "rgba(30,32,25,0.16)", boxShadow: "0 0 0 1.5px rgba(255,255,255,0.65) inset" }}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: [0.4, 1, 1.15], opacity: [0, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, times: [0, 0.35, 1], ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}

// ------------------------------------------------------------ toast

export function AppToast({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-x-4 top-[58px] z-40 flex items-center gap-3 rounded-[18px] bg-ink px-4 py-3 text-[14px] font-medium text-text-inverse shadow-[var(--shadow-dialog)]"
          initial={{ y: -24, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The app's SuccessMark: a check that draws inside an olive disc. */
export function SuccessMark({ size = 72 }: { size?: number }) {
  return (
    <motion.span
      className="inline-flex items-center justify-center rounded-full bg-olive"
      style={{ width: size, height: size }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" aria-hidden>
        <motion.path
          d="M5 12.5l4.5 4.5L19 7.5"
          stroke="#FBFAF7"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
        />
      </svg>
    </motion.span>
  );
}
