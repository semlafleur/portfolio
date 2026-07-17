import { MapPin } from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Chip } from "@/components/chip";
import { experiences, experienceIntro } from "@/data/portfolio-data";
import { formatRange } from "@/lib/dates";

export const Experience = () => {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow={experienceIntro.eyebrow}
        heading={experienceIntro.heading}
      />

      <ol className="relative ml-1.5 space-y-6 border-l border-primary/30 pl-8 sm:pl-10">
        {experiences.map((exp, index) => (
          <li key={`${exp.company}-${exp.startDate}`} className="relative">
            {/* Milestone dot centered on the timeline */}
            <span
              className="absolute top-1.5 size-2.5 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background max-sm:-left-8 sm:-left-10"
              aria-hidden
            />
            <Reveal delay={index * 0.05}>
              <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {exp.role}{" "}
                      <span className="font-normal text-muted-foreground">
                        @ {exp.company}
                      </span>
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {exp.location}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground sm:pt-1">
                    {formatRange(exp.startDate, exp.endDate)}
                  </span>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {exp.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2.5 text-sm text-muted-foreground"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
};
