export function Section({ id, title }: { id: string; title: string }) {
  return (
    <section
      id={id}
      className="mx-auto flex min-h-[60vh] max-w-6xl scroll-mt-16 items-center px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
    </section>
  );
}
