import type { ReactNode } from "react";

/** Small pill used for stack and skill tags, tuned to the teal accent theme. */
export const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
    {children}
  </span>
);
