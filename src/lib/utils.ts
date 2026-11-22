import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Initials exactly as the app renders them on avatars. */
export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/** Deterministic warm avatar tint — the same five tints the app uses. */
const TINTS = [
  { bg: "#E6E8DA", fg: "#2E3420" },
  { bg: "#E8E2D4", fg: "#5B5240" },
  { bg: "#E3E6E0", fg: "#3E4A44" },
  { bg: "#EDE3DA", fg: "#6A4E3A" },
  { bg: "#ECE9E1", fg: "#55574C" },
];
export function tintFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return TINTS[Math.abs(hash) % TINTS.length];
}
