"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to stagger this element after it enters the viewport. */
  delay?: number;
  className?: string;
};

/**
 * On-scroll fade + slide-up with an editorial ease-out. Animates once when the element scrolls
 * into view. Users with `prefers-reduced-motion` see the content appear
 * without movement.
 */
export const Reveal = ({ children, delay = 0, className }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
