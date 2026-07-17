import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const About = () => {
  const t = useTranslations("about");

  const quickFacts = [
    { label: t("factBasedLabel"), value: t("factBasedValue") },
    { label: t("factExperienceLabel"), value: t("factExperienceValue") },
    { label: t("factFocusLabel"), value: t("factFocusValue") },
    { label: t("factLanguagesLabel"), value: t("factLanguagesValue") },
  ];

  return (
    <Section id="about">
      <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p className="italic">{t("personalLine")}</p>
          </div>

          <aside className="h-fit rounded-xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary" />
              {t("quickFactsTitle")}
            </h3>
            <dl className="mt-4 space-y-3">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 border-t border-border/60 pt-3 first:border-t-0 first:pt-0"
                >
                  <dt className="text-sm text-muted-foreground">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Reveal>
    </Section>
  );
};
