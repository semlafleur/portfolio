"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Chip } from "@/components/chip";
import type { Project as ProjectEntry } from "@/data/portfolio-data";
import { portfolioQueryKeys } from "@/lib/query-client";

const fetchProjects = async (): Promise<ProjectEntry[]> => {
  const res = await fetch("/api/portfolio/projects");
  return res.json();
};

export const Projects = () => {
  const t = useTranslations("projects");
  const { data: projects } = useSuspenseQuery({
    queryKey: portfolioQueryKeys.projects,
    queryFn: fetchProjects,
  });

  return (
    <Section id="projects">
      <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.05}>
            <article className="h-full rounded-xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {project.year}
                </span>
              </div>

              {project.note && (
                <p className="mt-1 text-xs text-muted-foreground">{project.note}</p>
              )}

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
