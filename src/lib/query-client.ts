import { QueryClient } from "@tanstack/react-query";
import type { Locale } from "@/data/portfolio-data";

// Content is locale-dependent, so the locale is part of every cache key —
// without it, switching language would serve another language's cached rows.
export const portfolioQueryKeys = {
  experiences: (locale: Locale) => ["experiences", locale] as const,
  education: (locale: Locale) => ["education", locale] as const,
  projects: (locale: Locale) => ["projects", locale] as const,
  skillCategories: (locale: Locale) => ["skill-categories", locale] as const,
};

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
