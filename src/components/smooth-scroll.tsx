"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import "lenis/dist/lenis.css";

/** Sticky nav height (h-16), so anchor jumps land below it. */
export const NAV_OFFSET = -64;

/**
 * Lenis smooth scroll + a global motion config. Both step aside for users with
 * `prefers-reduced-motion`: no Lenis instance (native scroll), and motion skips
 * transform animations.
 */
export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {!prefersReducedMotion && (
        <ReactLenis root options={{ anchors: { offset: NAV_OFFSET } }} />
      )}
      {children}
    </MotionConfig>
  );
};
