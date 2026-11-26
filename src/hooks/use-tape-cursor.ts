"use client";

import * as React from "react";

/* ---------------------------------------------------------------- support
   The tape follows a mouse or trackpad. Touch-first devices and visitors who
   ask for reduced motion never get it (and never see its switch). */

const FINE = "(hover: hover) and (pointer: fine)";
const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribeSupport(cb: () => void) {
  const a = window.matchMedia(FINE);
  const b = window.matchMedia(REDUCE);
  a.addEventListener("change", cb);
  b.addEventListener("change", cb);
  return () => {
    a.removeEventListener("change", cb);
    b.removeEventListener("change", cb);
  };
}
const getSupport = () => window.matchMedia(FINE).matches && !window.matchMedia(REDUCE).matches;

export function useTapeCursorSupported() {
  return React.useSyncExternalStore(subscribeSupport, getSupport, () => false);
}

/* ------------------------------------------------------------- preference
   On by default. A visitor's choice is kept in localStorage and shared
   between open tabs; if storage is blocked it lasts for the page visit. */

const KEY = "tayylo:tape-cursor";
const listeners = new Set<() => void>();
let current: boolean | null = null;

function read() {
  try {
    return window.localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

function subscribePref(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY && e.key !== null) return;
    current = read();
    cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}
const getPref = () => (current ??= read());

export function setTapeCursorOn(on: boolean) {
  current = on;
  try {
    window.localStorage.setItem(KEY, on ? "on" : "off");
  } catch {
    // Storage unavailable (private mode, blocked site data): keep it in memory.
  }
  listeners.forEach(l => l());
}

export function useTapeCursorOn() {
  return React.useSyncExternalStore(subscribePref, getPref, () => true);
}
