import { Nav } from "@/components/nav";
import { Section } from "@/components/section";

const sections = [
  { id: "hero", title: "Hero" },
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {sections.map((section) => (
          <Section key={section.id} id={section.id} title={section.title} />
        ))}
      </main>
    </>
  );
}
