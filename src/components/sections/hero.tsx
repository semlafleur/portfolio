import { ArrowUpRight, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { HeroBackground } from "@/components/hero-background";
import { cvHref, siteName } from "@/data/portfolio-data";

const [firstName, ...lastName] = siteName.split(" ");

export const Hero = () => {
  const t = useTranslations("hero");

  // The backdrop lives in a full-width wrapper: inside the max-w-6xl Section it
  // was clipped to the content column and left empty bands on wide screens.
  return (
    <div className="relative overflow-hidden">
      <HeroBackground />
      <Section
        id="hero"
        className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20"
      >
        <div className="relative z-10 flex flex-col items-start">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-primary sm:text-sm">
            <span className="h-px w-10 bg-primary" aria-hidden />
            {t("role")}
          </p>
          <h1 className="mt-6 text-6xl leading-[0.9] font-semibold tracking-tighter sm:text-8xl lg:text-9xl">
            {firstName}
            <br />
            <span className="text-muted-foreground">{lastName.join(" ")}</span>
          </h1>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.rich("tagline", {
              b: (chunks) => (
                <strong className="font-semibold text-foreground">{chunks}</strong>
              ),
            })}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
            <Button size="lg" className="px-5" nativeButton={false} render={<a href="#contact" />}>
              {t("ctaPrimary")}
              <ArrowUpRight />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-5"
              nativeButton={false}
              render={<a href={cvHref} download />}
            >
              <Download />
              {t("ctaSecondary")}
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
};
