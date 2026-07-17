"use client";

import { Command } from "cmdk";
import {
  Briefcase,
  Check,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Moon,
  Sun,
  User,
  Wrench,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { useCommandPalette } from "@/components/command-palette-provider";
import { contactChannels, cvHref } from "@/data/portfolio-data";
import type { Locale } from "@/lib/i18n";

const itemClasses =
  "flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground aria-selected:bg-muted";
const groupClasses =
  "px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-items]]:mt-1";

export const CommandPalette = () => {
  const { open, setOpen } = useCommandPalette();
  const t = useTranslations("palette");
  const tNav = useTranslations("nav");
  const { resolvedTheme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [emailCopied, setEmailCopied] = useState(false);

  const handleOpenChange = (next: boolean) => {
    if (next) setEmailCopied(false);
    setOpen(next);
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        handleOpenChange(!open);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const runAndClose = (action: () => void) => {
    action();
    setOpen(false);
  };

  const email = contactChannels.find((c) => c.type === "email");
  const linkedin = contactChannels.find((c) => c.type === "linkedin");
  const github = contactChannels.find((c) => c.type === "github");

  const sections = [
    { id: "about", label: tNav("about"), icon: User },
    { id: "experience", label: tNav("experience"), icon: Briefcase },
    { id: "education", label: tNav("education"), icon: GraduationCap },
    { id: "skills", label: tNav("skills"), icon: Wrench },
    { id: "contact", label: tNav("contact"), icon: Mail },
  ];

  const languageOptions: Array<{ value: Locale; label: string }> = [
    { value: "en", label: t("languageEnglish") },
    { value: "it", label: t("languageItalian") },
    { value: "de", label: t("languageGerman") },
  ];

  return (
    <Command.Dialog
      open={open}
      onOpenChange={handleOpenChange}
      label="Command palette"
      overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      contentClassName="fixed left-1/2 top-24 z-50 w-full max-w-lg -translate-x-1/2 px-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      className="overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl"
    >
      <div className="flex items-center border-b border-border px-3">
        <Command.Input
          autoFocus
          placeholder={t("placeholder")}
          className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
          {t("empty")}
        </Command.Empty>

        <Command.Group heading={t("groupNavigate")} className={groupClasses}>
          {sections.map((section) => (
            <Command.Item
              key={section.id}
              className={itemClasses}
              onSelect={() =>
                runAndClose(() => {
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                })
              }
            >
              <section.icon className="size-4 text-muted-foreground" />
              {section.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Separator className="my-1 h-px bg-border" />

        <Command.Group heading={t("groupActions")} className={groupClasses}>
          <Command.Item
            className={itemClasses}
            onSelect={() =>
              runAndClose(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
            }
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-4 text-muted-foreground" />
            ) : (
              <Moon className="size-4 text-muted-foreground" />
            )}
            {t("toggleTheme")}
          </Command.Item>

          <Command.Item
            className={itemClasses}
            onSelect={() => runAndClose(() => window.open(cvHref(locale), "_blank"))}
          >
            <Download className="size-4 text-muted-foreground" />
            {t("downloadCv")}
          </Command.Item>

          {email && (
            <Command.Item
              className={itemClasses}
              onSelect={() => {
                navigator.clipboard.writeText(email.label);
                setEmailCopied(true);
                setTimeout(() => {
                  setEmailCopied(false);
                  setOpen(false);
                }, 500);
              }}
            >
              {emailCopied ? (
                <Check className="size-4 text-primary" />
              ) : (
                <Copy className="size-4 text-muted-foreground" />
              )}
              {emailCopied ? t("emailCopied") : t("copyEmail")}
            </Command.Item>
          )}

          {linkedin && (
            <Command.Item
              className={itemClasses}
              onSelect={() =>
                runAndClose(() =>
                  window.open(linkedin.href, "_blank", "noopener,noreferrer")
                )
              }
            >
              <LinkedinIcon className="size-4 text-muted-foreground" />
              {t("openLinkedin")}
              <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
            </Command.Item>
          )}

          {github && (
            <Command.Item
              className={itemClasses}
              onSelect={() =>
                runAndClose(() =>
                  window.open(github.href, "_blank", "noopener,noreferrer")
                )
              }
            >
              <GithubIcon className="size-4 text-muted-foreground" />
              {t("openGithub")}
              <ExternalLink className="ml-auto size-3.5 text-muted-foreground" />
            </Command.Item>
          )}
        </Command.Group>

        <Command.Separator className="my-1 h-px bg-border" />

        <Command.Group heading={t("groupLanguage")} className={groupClasses}>
          {languageOptions.map((option) => (
            <Command.Item
              key={option.value}
              className={`${itemClasses} justify-between`}
              onSelect={() =>
                runAndClose(() => router.replace(pathname, { locale: option.value }))
              }
            >
              {option.label}
              {option.value === locale && <Check className="size-3.5 text-primary" />}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
};
