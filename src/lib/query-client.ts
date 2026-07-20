import { QueryClient } from "@tanstack/react-query";

export const portfolioQueryKeys = {
  experiences: ["experiences"] as const,
  education: ["education"] as const,
  skillCategories: ["skill-categories"] as const,
};

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
