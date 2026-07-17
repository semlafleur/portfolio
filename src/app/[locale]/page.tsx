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
import { Contact } from "@/components/sections/contact";
import { getGithubActivity } from "@/lib/github";

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  // Enable static rendering for the section tree below.
  setRequestLocale(locale);

  const activity = await getGithubActivity();

  return (
    <CommandPaletteProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer activity={activity} />
      <CommandPalette />
    </CommandPaletteProvider>
  );
};

export default Home;
