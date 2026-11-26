"use client";

import * as React from "react";
import gsap from "gsap";

/* ================================================================
   TAYYLO MEASURING TAPE TRAIL
   A small rolled tailor's tape follows the pointer. As it travels the
   tape unspools behind it (mm ticks, cm numerals, a brass end cap);
   when the visitor rests it reels itself back into the coil.

   Everything runs off one gsap.ticker callback that writes straight
   to the DOM, so React never re-renders on pointer movement. It is
   decorative: pointer-events none, aria-hidden, desktop pointers only,
   and switched off entirely for prefers-reduced-motion.
   ================================================================ */

// ---- Palette (Tayylo olive + a buttery tailor's-tape yellow) ----
const TAPE = "#F3D67E";
const TAPE_SHADE = "#E2BE5C";
const EDGE = "#2E3420"; // olive-deep
const INK = "#23281A"; // olive-ink
const HUB = "#F4F2EC"; // canvas

// ---- Geometry (px) ----
const TAPE_W = 10; // ribbon width
const HALF = TAPE_W / 2;
const MM = 4; // one tick
const REST = 25; // tape left out when reeled in: just the brass tip peeking from the roll
const LEN_CALM = 180; // tape out at an easy pace
const LEN_FAST = 330; // tape out when the pointer is flung
const HISTORY = 420; // path remembered behind the coil
const SAMPLE = 3.5; // spacing of remembered points
const JUMP = 600; // a jump this large in one frame starts a fresh tape
const LABELS = 10; // numeral pool (LEN_FAST / CM, rounded up)

// The coil sits below-right of the pointer so the hotspot is never covered.
const OFFSET = { x: 20, y: 24 };
const OFFSET_HOVER = { x: 30, y: 34 };

// Spring for the coil (per 60 fps frame): a touch under-damped, so it lands softly.
const STIFF = 0.13;
const DAMP = 0.5;

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, summary, label, [data-cursor="hover"]';

const FINE = "(hover: hover) and (pointer: fine)";
const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const a = window.matchMedia(FINE);
  const b = window.matchMedia(REDUCE);
  a.addEventListener("change", cb);
  b.addEventListener("change", cb);
  return () => {
    a.removeEventListener("change", cb);
    b.removeEventListener("change", cb);
  };
}
const getSnapshot = () => window.matchMedia(FINE).matches && !window.matchMedia(REDUCE).matches;
const getServerSnapshot = () => false;

/** The spiral of tape layers seen on the side of the roll. */
const SPIRAL = (() => {
  const r0 = 5.6;
  const r1 = 13.4;
  const turns = 3.25;
  const steps = 150;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    const r = r0 + (r1 - r0) * t;
    d += `${i ? "L" : "M"}${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
  }
  return d;
})();

/** Fine graduations around the outermost layer: they make the roll read as a tape, not a coin. */
const RIM_TICKS = (() => {
  let d = "";
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const h = i % 3 === 0 ? 2.6 : 1.5;
    const c = Math.cos(a);
    const s = Math.sin(a);
    d += `M${(c * 15.2).toFixed(2)} ${(s * 15.2).toFixed(2)}L${(c * (15.2 - h)).toFixed(2)} ${(s * (15.2 - h)).toFixed(2)}`;
  }
  return d;
})();

type Pt = { x: number; y: number };
const f = (n: number) => n.toFixed(1);

export function TayyloMeasuringTapeCursor() {
  const enabled = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const trailRef = React.useRef<SVGGElement>(null);
  const edgeRef = React.useRef<SVGPathElement>(null);
  const bodyRef = React.useRef<SVGPathElement>(null);
  const ticksRef = React.useRef<SVGPathElement>(null);
  const labelsRef = React.useRef<SVGGElement>(null);
  const capRef = React.useRef<SVGGElement>(null);
  const headRef = React.useRef<HTMLDivElement>(null);
  const bodyHeadRef = React.useRef<HTMLDivElement>(null);
  const spinRef = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current!;
    const trail = trailRef.current!;
    const edge = edgeRef.current!;
    const body = bodyRef.current!;
    const ticks = ticksRef.current!;
    const cap = capRef.current!;
    const spin = spinRef.current!;
    const labels = Array.from(labelsRef.current!.children) as SVGTextElement[];

    const setX = gsap.quickSetter(headRef.current!, "x", "px");
    const setY = gsap.quickSetter(headRef.current!, "y", "px");
    const setRot = gsap.quickSetter(bodyHeadRef.current!, "rotation", "deg");
    const setScale = gsap.quickSetter(bodyHeadRef.current!, "scale");

    // Tweened state: hover, press and appear are eased by GSAP, read by the ticker.
    const st = { offX: OFFSET.x, offY: OFFSET.y, scale: 1, follow: 1, press: 1, appear: 1 };

    // Pointer (viewport) and coil (viewport) with spring velocity.
    let px = 0;
    let py = 0;
    let hx = 0;
    let hy = 0;
    let vx = 0;
    let vy = 0;
    let lastMove = 0;

    // Tape path, remembered in page coordinates so scrolling lays tape along the page.
    let pts: Pt[] = [];
    let len = REST; // tape currently paid out
    let reel = 0; // reel-in speed, accelerates like a real spring return
    let still = 0; // timestamp the coil last moved
    let speed = 0;
    let lean = 0;
    let spinA = 0;
    let idle = 0; // 0..1, blends in the resting "breath"
    let lastSy = -1;
    let visible = false;
    let fresh = true;
    let hovering = false;

    const reset = (x: number, y: number) => {
      const sy = window.scrollY;
      hx = x;
      hy = y;
      vx = vy = 0;
      // Seed a short stub trailing up-left of the coil.
      pts = [];
      for (let s = REST + 4; s >= 0; s -= SAMPLE) pts.push({ x: x - s * 0.8, y: y + sy - s * 0.6 });
      len = REST;
      reel = 0;
      speed = 0;
      lastSy = -1;
    };

    const show = () => {
      visible = true;
      gsap.to(root, { opacity: 1, duration: 0.45, ease: "power2.out", overwrite: true });
      gsap.fromTo(st, { appear: 0.35 }, { appear: 1, duration: 0.8, ease: "back.out(2.2)", overwrite: "auto" });
    };
    const hide = () => {
      if (!visible) return;
      visible = false;
      fresh = true;
      gsap.to(root, { opacity: 0, duration: 0.5, ease: "power2.out", overwrite: true });
    };

    const setHover = (on: boolean) => {
      if (on === hovering) return;
      hovering = on;
      const o = on ? OFFSET_HOVER : OFFSET;
      gsap.to(st, { offX: o.x, offY: o.y, scale: on ? 0.66 : 1, follow: on ? 0.72 : 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      gsap.to(trail, { opacity: on ? 0.4 : 1, duration: 0.4, ease: "power2.out", overwrite: true });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      px = e.clientX;
      py = e.clientY;
      lastMove = performance.now();
      if (fresh) {
        fresh = false;
        reset(px + st.offX, py + st.offY);
        show();
      } else if (!visible) show();
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      setHover(!!t?.closest?.(INTERACTIVE));
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      gsap
        .timeline({ overwrite: "auto" })
        .to(st, { press: 0.8, duration: 0.09, ease: "power2.out" })
        .to(st, { press: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };
    const onLeave = () => hide();

    // ---------------------------------------------------------------- frame
    const visibleTape: Pt[] = [];

    const tick = () => {
      if (fresh) return;
      const dr = Math.min(gsap.ticker.deltaRatio(60), 3);
      const now = performance.now();
      const sy = window.scrollY;

      // 1. Coil: spring toward pointer + offset.
      const k = STIFF * st.follow;
      vx += (px + st.offX - hx) * k * dr;
      vy += (py + st.offY - hy) * k * dr;
      const damp = Math.pow(DAMP, dr);
      vx *= damp;
      vy *= damp;
      hx += vx * dr;
      hy += vy * dr;

      // 2. Remember the path (page coords) and pay out tape for the distance travelled.
      const head = { x: hx, y: hy + sy };
      let last = pts[pts.length - 1];
      let dx = head.x - last.x;
      let dy = head.y - last.y;
      let dist = Math.hypot(dx, dy);
      if (dist > JUMP) {
        reset(hx, hy);
        last = pts[pts.length - 1];
        dx = dy = dist = 0;
      }
      while (dist >= SAMPLE) {
        last = { x: last.x + (dx / dist) * SAMPLE, y: last.y + (dy / dist) * SAMPLE };
        pts.push(last);
        dx = head.x - last.x;
        dy = head.y - last.y;
        dist = Math.hypot(dx, dy);
      }

      const travel = Math.hypot(vx, vy) * dr;
      speed += (travel / dr - speed) * 0.12 * dr;
      const prevLen = len;
      const moving = now - lastMove < 140 || travel > 0.45 * dr || (lastSy >= 0 && Math.abs(sy - lastSy) > 0.5);
      if (moving) still = now;

      // 3. Resting: after a beat, reel the tape back in, accelerating then gliding home.
      // Over a button or link it gets out of the way sooner, even while the coil is still settling.
      const restFor = now - still;
      const reelIn = hovering ? now - lastMove > 70 : restFor > 280;

      // Pay out tape for distance travelled (on screen or by scrolling), unless it is reeling home.
      if (!reelIn) len += travel + (lastSy >= 0 ? Math.abs(sy - lastSy) : 0);

      // Faster pointer, longer tape (it stretches out when flung, eases back after).
      const maxLen = LEN_CALM + Math.min(speed * 10, LEN_FAST - LEN_CALM);
      if (len > maxLen) len += (maxLen - len) * 0.14 * dr;

      if (reelIn && len > REST) {
        reel = Math.min(reel + (hovering ? 0.9 : 0.32) * dr, hovering ? 16 : 10);
        len = Math.max(REST, len - Math.min(reel * dr, (len - REST) * 0.2 * dr + 0.25));
      } else if (moving) reel = 0;
      const dLen = len - prevLen;
      spinA += (dLen / 13) * (180 / Math.PI); // the roll turns as tape leaves or returns

      // Forget path that can no longer be seen.
      let acc = 0;
      for (let i = pts.length - 1; i > 0; i--) {
        acc += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        if (acc > HISTORY) {
          pts.splice(0, i - 1);
          break;
        }
      }

      // Let older tape relax a little, so sharp turns soften into curves.
      const n = pts.length;
      if (dist > 0 || Math.abs(dLen) > 0.01) {
        const relax = Math.min(0.05 * dr, 0.2);
        for (let i = 1; i < n - 6; i++) {
          const p = pts[i];
          p.x += ((pts[i - 1].x + pts[i + 1].x) / 2 - p.x) * relax;
          p.y += ((pts[i - 1].y + pts[i + 1].y) / 2 - p.y) * relax;
        }
      }

      if (!visible && gsap.getProperty(root, "opacity") === 0) {
        lastSy = sy;
        return;
      }

      // 4. The coil leans into horizontal motion, and breathes when resting.
      idle += ((restFor > 900 ? 1 : 0) - idle) * 0.03 * dr;
      lean += (Math.max(-16, Math.min(16, vx * 1.5)) - lean) * 0.18 * dr;
      const t = now / 1000;
      const bob = Math.sin(t * 1.9) * 1.3 * idle;
      setX(hx);
      setY(hy + bob);
      setRot(lean + Math.sin(t * 1.3) * 4 * idle);
      setScale(st.scale * st.press * st.appear);
      spin.setAttribute("transform", `rotate(${f(spinA)})`);

      const tapeMoved = Math.abs(dLen) > 0.01 || travel > 0.01 || sy !== lastSy;
      lastSy = sy;
      if (!tapeMoved) return;

      // 5. Walk back from the coil to collect exactly `len` of tape (coil → tail).
      visibleTape.length = 0;
      visibleTape.push({ x: hx, y: hy });
      let walked = 0;
      let prev = head;
      for (let i = n - 1; i >= 0 && walked < len; i--) {
        const p = pts[i];
        const seg = Math.hypot(p.x - prev.x, p.y - prev.y);
        if (seg < 0.001) continue;
        if (walked + seg >= len) {
          const r = (len - walked) / seg;
          visibleTape.push({ x: prev.x + (p.x - prev.x) * r, y: prev.y + (p.y - prev.y) * r - sy });
          walked = len;
          break;
        }
        walked += seg;
        visibleTape.push({ x: p.x, y: p.y - sy });
        prev = p;
      }
      visibleTape.reverse(); // tail (0 cm) → coil

      draw(visibleTape);
    };

    // ---------------------------------------------------------------- draw
    const draw = (v: Pt[]) => {
      const m = v.length;
      if (m < 2) return;

      // Centre line: quadratic curves through segment midpoints give a soft, continuous bend.
      let d = `M${f(v[0].x)} ${f(v[0].y)}`;
      for (let i = 1; i < m - 1; i++) {
        const mx = (v[i].x + v[i + 1].x) / 2;
        const my = (v[i].y + v[i + 1].y) / 2;
        d += `Q${f(v[i].x)} ${f(v[i].y)} ${f(mx)} ${f(my)}`;
      }
      d += `L${f(v[m - 1].x)} ${f(v[m - 1].y)}`;
      edge.setAttribute("d", d);
      body.setAttribute("d", d);

      // Ticks along one edge, numerals every centimetre, all measured from the brass tip.
      let tk = "";
      let li = 0;
      let segI = 0;
      let segStart = 0;
      let segLen = Math.hypot(v[1].x - v[0].x, v[1].y - v[0].y);
      let total = segLen;
      for (let i = 2; i < m; i++) total += Math.hypot(v[i].x - v[i - 1].x, v[i].y - v[i - 1].y);
      const end = total - 12; // the last bit is tucked under the coil

      for (let mm = 2; mm * MM <= end; mm++) {
        const s = mm * MM;
        while (segStart + segLen < s && segI < m - 2) {
          segStart += segLen;
          segI++;
          segLen = Math.hypot(v[segI + 1].x - v[segI].x, v[segI + 1].y - v[segI].y);
        }
        const a = v[segI];
        const b = v[segI + 1];
        const r = segLen > 0 ? (s - segStart) / segLen : 0;
        const cx = a.x + (b.x - a.x) * r;
        const cy = a.y + (b.y - a.y) * r;
        const tx = segLen > 0 ? (b.x - a.x) / segLen : 1;
        const ty = segLen > 0 ? (b.y - a.y) / segLen : 0;
        const nx = -ty;
        const ny = tx;
        const h = mm % 10 === 0 ? 5 : mm % 5 === 0 ? 3.4 : 2.1;
        tk += `M${f(cx + nx * HALF)} ${f(cy + ny * HALF)}L${f(cx + nx * (HALF - h))} ${f(cy + ny * (HALF - h))}`;

        if (mm % 10 === 0 && li < LABELS) {
          const el = labels[li++];
          let ang = (Math.atan2(ty, tx) * 180) / Math.PI;
          const flip = ang > 90 || ang < -90;
          if (flip) ang += 180;
          const lx = cx + tx * 1.6 - nx * 1.4;
          const ly = cy + ty * 1.6 - ny * 1.4;
          el.setAttribute("transform", `translate(${f(lx)} ${f(ly)}) rotate(${f(ang)})`);
          el.setAttribute("text-anchor", flip ? "end" : "start");
          el.textContent = String(mm / 10);
          el.style.visibility = "visible";
        }
      }
      ticks.setAttribute("d", tk);
      for (let i = li; i < LABELS; i++) labels[i].style.visibility = "hidden";

      // Brass end cap on the tail.
      const ang = (Math.atan2(v[1].y - v[0].y, v[1].x - v[0].x) * 180) / Math.PI;
      cap.setAttribute("transform", `translate(${f(v[0].x)} ${f(v[0].y)}) rotate(${f(ang)})`);
    };

    gsap.ticker.add(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      gsap.killTweensOf([st, root, trail]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-tayylo-tape=""
      className="pointer-events-none fixed inset-0 z-[90] select-none"
      style={{ opacity: 0, contain: "strict" }}
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="tayylo-tape-brass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F0D79A" />
            <stop offset="0.45" stopColor="#C99A4A" />
            <stop offset="1" stopColor="#8E6627" />
          </linearGradient>
        </defs>
        <g ref={trailRef}>
          {/* Olive outline under the buttery tape, so it reads on cream and on olive. */}
          <path ref={edgeRef} fill="none" stroke={EDGE} strokeWidth={TAPE_W + 2} strokeLinejoin="round" strokeOpacity={0.92} />
          <path ref={bodyRef} fill="none" stroke={TAPE} strokeWidth={TAPE_W} strokeLinejoin="round" />
          <path ref={ticksRef} fill="none" stroke={INK} strokeWidth={0.8} strokeLinecap="butt" />
          <g ref={labelsRef} fill={INK} fontSize={5.6} fontWeight={800} fontFamily="var(--font-urbanist), sans-serif" dominantBaseline="central">
            {Array.from({ length: LABELS }, (_, i) => (
              <text key={i} style={{ visibility: "hidden" }} />
            ))}
          </g>
          <g ref={capRef}>
            <rect x={-2.2} y={-HALF - 1.4} width={5.6} height={TAPE_W + 2.8} rx={1} fill="url(#tayylo-tape-brass)" stroke={INK} strokeWidth={0.7} />
            <circle cx={0.6} cy={0} r={0.9} fill="#7A5620" />
          </g>
        </g>
      </svg>

      {/* The roll itself. */}
      <div ref={headRef} className="absolute left-0 top-0 will-change-transform">
        <div ref={bodyHeadRef}>
          <svg width={36} height={36} viewBox="-18 -18 36 36" className="-ml-[18px] -mt-[18px] block overflow-visible">
            <circle cx={1.3} cy={2.4} r={16} fill={INK} opacity={0.16} />
            <circle r={16} fill={TAPE} stroke={EDGE} strokeWidth={1.3} />
            <g ref={spinRef}>
              <path d={SPIRAL} fill="none" stroke={TAPE_SHADE} strokeWidth={2.2} />
              <path d={SPIRAL} fill="none" stroke={INK} strokeWidth={0.6} strokeOpacity={0.45} />
              <path d={RIM_TICKS} stroke={INK} strokeWidth={0.7} />
              <rect x={12.6} y={-1.6} width={3.6} height={3.2} rx={0.6} fill="url(#tayylo-tape-brass)" stroke={INK} strokeWidth={0.5} />
            </g>
            {/* Soft top-left light on the roll. */}
            <path d="M-11.2 -5.4A12.4 12.4 0 0 1 -3.2 -12" fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={1.8} strokeLinecap="round" />
            <circle r={4.6} fill={HUB} stroke={EDGE} strokeWidth={1.1} />
            <circle r={1.6} fill="#454F2C" />
          </svg>
        </div>
      </div>
    </div>
  );
}
