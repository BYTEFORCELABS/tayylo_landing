// Motion constants — the app's own easing curves and springs.
export const EASE = {
  out: [0.2, 0.8, 0.2, 1] as const,
  emphasized: [0.16, 1, 0.3, 1] as const,
};

export const SPRING = { type: "spring" as const, stiffness: 260, damping: 26 };
export const SPRING_SOFT = { type: "spring" as const, stiffness: 180, damping: 24 };
