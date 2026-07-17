import { Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { contactChannels } from "@/data/portfolio-data";
import type { GithubActivity } from "@/lib/github";

const socials = [
  { type: "github" as const, icon: GithubIcon },
  { type: "linkedin" as const, icon: LinkedinIcon },
  { type: "email" as const, icon: Mail },
];

export const Footer = ({ activity }: { activity: GithubActivity | null }) => {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const githubChannel = contactChannels.find((c) => c.type === "github");
  const activityLine = activity
    ? t("githubActivity", {
        repos: activity.publicRepos,
        stars: activity.totalStars,
        date: activity.lastPushedAt
          ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
              new Date(activity.lastPushedAt)
            )
          : "—",
      })
    : t("openSource");

  const socialLabels: Record<(typeof socials)[number]["type"], string> = {
    github: t("github"),
    linkedin: t("linkedin"),
    email: t("email"),
  };

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">{t("rights", { year })}</p>
          {githubChannel && (
            <a
              href={githubChannel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-3.5" />
              {activityLine}
            </a>
          )}
        </div>

        <div className="flex items-center gap-2">
          {socials.map((social) => {
            const channel = contactChannels.find((c) => c.type === social.type);
            if (!channel) return null;
            const external = social.type !== "email";
            const Icon = social.icon;
            return (
              <a
                key={social.type}
                href={channel.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={socialLabels[social.type]}
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
