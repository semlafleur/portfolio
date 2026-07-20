"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import type { Education as EducationEntry } from "@/data/portfolio-data";
import { formatRange } from "@/lib/dates";
import { portfolioQueryKeys } from "@/lib/query-client";

const fetchEducation = async (): Promise<EducationEntry[]> => {
  const res = await fetch("/api/portfolio/education");
  return res.json();
};

export const Education = () => {
  const t = useTranslations("education");
  const { data: education } = useSuspenseQuery({
    queryKey: portfolioQueryKeys.education,
    queryFn: fetchEducation,
  });

  return (
    <Section id="education">
      <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />

      <div className="grid gap-5 sm:grid-cols-2">
        {education.map((entry, index) => (
          <Reveal key={entry.institution} delay={index * 0.05}>
            <article className="h-full rounded-xl border border-border bg-card p-6">
              <span className="font-mono text-xs text-muted-foreground">
                {formatRange(entry.startDate, entry.endDate)}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{entry.degree}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {entry.institution}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {entry.location}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
