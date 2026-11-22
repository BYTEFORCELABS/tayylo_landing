"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

const subscribe = () => () => {};

/**
 * Reduced-motion preference that is `false` during server render and
 * hydration, then the real value. Prevents hydration mismatches.
 */
export function useSafeReducedMotion() {
  const reduce = useReducedMotion();
  const hydrated = React.useSyncExternalStore(subscribe, () => true, () => false);
  return hydrated && Boolean(reduce);
}
