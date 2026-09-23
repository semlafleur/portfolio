"use client";

import { motion } from "motion/react";

type SectionHeadingProps = {
  /** 1-based position on the page, rendered as the editorial "01" marker. */
  index: number;
  eyebrow: string;
  heading: string;
};

/**
 * Editorial section header: a full-width rule with a numbered teal eyebrow,
 * then a large heading whose words slide up out of a mask on first view.
 */
export const SectionHeading = ({ index, eyebrow, heading }: SectionHeadingProps) => (
  <div className="mb-12 sm:mb-16">
    <div className="mb-6 flex items-center gap-4 border-t border-border pt-4 text-xs font-medium uppercase tracking-widest">
      <span className="font-mono text-primary">{String(index).padStart(2, "0")}</span>
      <span className="text-muted-foreground">{eyebrow}</span>
    </div>
    <motion.h2
      aria-label={heading}
      className="text-4xl font-semibold tracking-tighter sm:text-5xl lg:text-6xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.06 }}
    >
      {heading.split(" ").map((word, i, words) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  </div>
);
