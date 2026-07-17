import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { contact, profile } from "@/data/portfolio-data";

const socials = [
  { type: "github" as const, icon: GithubIcon, label: "GitHub" },
  { type: "linkedin" as const, icon: LinkedinIcon, label: "LinkedIn" },
  { type: "email" as const, icon: Mail, label: "Email" },
];

export const Footer = () => {
  const year = new Date().getFullYear();
  const githubChannel = contact.channels.find((c) => c.type === "github");

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {year} {profile.name}
          </p>
          {githubChannel && (
            <a
              href={githubChannel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              Building in the open @semlafleur
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          {socials.map((social) => {
            const channel = contact.channels.find((c) => c.type === social.type);
            if (!channel) return null;
            const external = social.type !== "email";
            const Icon = social.icon;
            return (
              <a
                key={social.type}
                href={channel.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
