import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/lib/i18n";

// Locale-prefix routing (/en, /it, /de). Browser-locale detection on first
// visit is handled by the next-intl proxy (see src/proxy.ts).
export const routing = defineRouting({
  locales,
  defaultLocale,
});
