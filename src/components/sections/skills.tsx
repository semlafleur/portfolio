import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Chip } from "@/components/chip";
import { skillCategories, skillsIntro } from "@/data/portfolio-data";

export const Skills = () => {
  return (
    <Section id="skills">
      <SectionHeading eyebrow={skillsIntro.eyebrow} heading={skillsIntro.heading} />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <Reveal key={category.category} delay={index * 0.05}>
            <article className="h-full rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-primary">
                {category.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
