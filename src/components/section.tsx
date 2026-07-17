import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

/** Shared section shell: centered max-width, consistent padding + scroll offset. */
export const Section = ({ id, className, children }: SectionProps) => (
  <section
    id={id}
    className={cn(
      "mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 sm:py-28 lg:px-8",
      className
    )}
  >
    {children}
  </section>
);
