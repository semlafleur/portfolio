import { ArrowUpRight, Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { cvHref, siteName } from "@/data/portfolio-data";

export const Hero = () => {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <Section
      id="hero"
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center"
    >
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
        {siteName}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
        {t("role")}
      </p>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {t.rich("tagline", {
          b: (chunks) => (
            <strong className="font-semibold text-foreground">{chunks}</strong>
          ),
        })}
      </p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Button size="lg" className="px-5" nativeButton={false} render={<a href="#contact" />}>
          {t("ctaPrimary")}
          <ArrowUpRight />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-5"
          nativeButton={false}
          render={<a href={cvHref(locale)} download />}
        >
          <Download />
          {t("ctaSecondary")}
        </Button>
      </div>
    </Section>
  );
};
