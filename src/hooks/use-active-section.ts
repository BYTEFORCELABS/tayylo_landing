"use client";

import * as React from "react";

/**
 * Returns the id of whichever watched section currently crosses a line
 * 40% of the way down the viewport, or null when none does.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = React.useState<string | null>(null);
  const key = ids.join("|");

  React.useEffect(() => {
    const list = key ? key.split("|") : [];
    if (!list.length) return;
    let raf = 0;
    const measure = () => {
      const line = window.innerHeight * 0.4;
      let found: string | null = null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          found = id;
          break;
        }
      }
      setActive(found);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return active;
}
