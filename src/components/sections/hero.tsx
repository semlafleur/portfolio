import { ArrowUpRight, Download } from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { profile } from "@/data/portfolio-data";

/** Renders the tagline, emphasising the configured highlight substrings. */
const renderTagline = (text: string, highlights: string[]) => {
  if (highlights.length === 0) return text;
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));
  return parts.map((part, index) =>
    highlights.includes(part) ? (
      <strong key={index} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
};

export const Hero = () => {
  return (
    <Section
      id="hero"
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center"
    >
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>
      <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
        {profile.role}
      </p>
      <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {renderTagline(profile.tagline, profile.taglineHighlights)}
      </p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Button
          size="lg"
          className="px-5"
          nativeButton={false}
          render={<a href={profile.primaryCta.href} />}
        >
          {profile.primaryCta.label}
          <ArrowUpRight />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-5"
          nativeButton={false}
          render={<a href={profile.secondaryCta.href} download />}
        >
          <Download />
          {profile.secondaryCta.label}
        </Button>
      </div>
    </Section>
  );
};
