type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
};

/** Teal eyebrow with a leading rule, followed by the large section heading. */
export const SectionHeading = ({ eyebrow, heading }: SectionHeadingProps) => (
  <div className="mb-10 sm:mb-12">
    <div className="mb-3 flex items-center gap-3">
      <span className="h-px w-8 bg-primary" aria-hidden />
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
    </div>
    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
  </div>
);
