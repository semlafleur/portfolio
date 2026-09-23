import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { setRequestLocale } from "next-intl/server";
import { CommandPaletteProvider } from "@/components/command-palette-provider";
import { CommandPalette } from "@/components/command-palette";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { getGithubActivity } from "@/lib/github";
import {
  getEducation,
  getExperiences,
  getProjects,
  getSkillCategories,
} from "@/lib/db/portfolio";
import { getQueryClient, portfolioQueryKeys } from "@/lib/query-client";
import { toLocale } from "@/data/portfolio-data";

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale: rawLocale } = await params;
  // Enable static rendering for the section tree below.
  setRequestLocale(rawLocale);
  const locale = toLocale(rawLocale);

  const activity = await getGithubActivity();

  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: portfolioQueryKeys.experiences(locale),
      queryFn: () => getExperiences(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: portfolioQueryKeys.education(locale),
      queryFn: () => getEducation(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: portfolioQueryKeys.skillCategories(locale),
      queryFn: () => getSkillCategories(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: portfolioQueryKeys.projects(locale),
      queryFn: () => getProjects(locale),
    }),
  ]);

  return (
    <CommandPaletteProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Experience />
          <Education />
          <Skills />
          <Projects />
        </HydrationBoundary>
        <Contact />
      </main>
      <Footer activity={activity} />
      <CommandPalette />
    </CommandPaletteProvider>
  );
};

export default Home;
