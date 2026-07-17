import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation helpers. `usePathname`/`useRouter` return and accept
// locale-agnostic pathnames, so switching locale preserves the current path.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
