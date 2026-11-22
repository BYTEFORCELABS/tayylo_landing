import { cn } from "@/lib/utils";

/**
 * The edge of a tailor's tape: the same tick pattern the app draws along
 * the top of its summary panel. Used as Tayylo's quiet signature motif.
 */
export function TapeRule({
  units = 16,
  unit = 64,
  className,
  numbered = true,
  startAt = 0,
  scale = 1,
  flip = false,
}: {
  units?: number;
  unit?: number;
  className?: string;
  numbered?: boolean;
  startAt?: number;
  /** Multiplies tick length, stroke and numeral size (and the SVG height). */
  scale?: number;
  /** Ticks rise from the bottom edge and numerals sit above them. */
  flip?: boolean;
}) {
  const origin = 24;
  const height = 28 * scale;
  const width = origin + unit * units;
  const ticks = [];
  for (let i = 0; i <= units * 10; i++) {
    const x = origin + (i * unit) / 10 + 0.5;
    const h = (i % 10 === 0 ? 14 : i % 5 === 0 ? 10 : 6) * scale;
    const w = (i % 10 === 0 ? 1.4 : 1) * Math.max(1, scale * 0.8);
    ticks.push(<line key={i} x1={x} y1={flip ? height : 0} x2={x} y2={flip ? height - h : h} stroke="currentColor" strokeWidth={w} />);
  }
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none block", className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMinYMin slice"
    >
      {ticks}
      {numbered &&
        Array.from({ length: units }, (_, i) => (
          <text
            key={i}
            x={origin + i * unit + 3 * scale}
            y={flip ? 10 * scale : height - 3 * scale}
            fill="currentColor"
            fontSize={9.5 * scale}
            fontWeight={700}
            fontFamily="var(--font-urbanist), sans-serif"
          >
            {i + startAt}
          </text>
        ))}
    </svg>
  );
}
