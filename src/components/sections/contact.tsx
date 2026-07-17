import { Download, Mail, Phone, Send } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { contact, cvHref } from "@/data/portfolio-data";
import type { ContactChannel } from "@/data/portfolio-data";

const channelIcons: Record<
  ContactChannel["type"],
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  email: Mail,
  phone: Phone,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

const inputClasses =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";

export const Contact = () => {
  return (
    <Section id="contact">
      <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} />

      <Reveal>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Direct channels */}
          <div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {contact.intro}
            </p>

            <div className="mt-8 space-y-3">
              {contact.channels.map((channel) => {
                const Icon = channelIcons[channel.type];
                const external =
                  channel.type === "linkedin" || channel.type === "github";
                return (
                  <a
                    key={channel.type}
                    href={channel.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    <Icon className="size-4 text-primary" />
                    {channel.label}
                  </a>
                );
              })}
            </div>

            <Button
              variant="outline"
              className="mt-6"
              nativeButton={false}
              render={<a href={cvHref} download />}
            >
              <Download />
              Download CV (PDF)
            </Button>
          </div>

          {/* Display-only message form (wiring lands in a later phase) */}
          <form className="rounded-xl border border-border bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tell me a bit about the role or project..."
                className={`${inputClasses} resize-none`}
              />
            </div>

            <Button type="button" className="mt-5">
              Send message
              <Send />
            </Button>
          </form>
        </div>
      </Reveal>
    </Section>
  );
};
