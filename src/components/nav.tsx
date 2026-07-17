"use client";

import { Command, Download, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCommandPalette } from "@/components/command-palette-provider";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cvHref, siteName } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

export const Nav = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { setOpen } = useCommandPalette();

  const sectionLinks = [
    { href: "#about", label: t("about") },
    { href: "#experience", label: t("experience") },
    { href: "#education", label: t("education") },
    { href: "#skills", label: t("skills") },
    { href: "#contact", label: t("contact") },
  ];

  const switchLocale = (next: Locale) => router.replace(pathname, { locale: next });

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-2.5 font-semibold">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            SL
          </span>
          <span className="hidden sm:inline">{siteName}</span>
        </a>

        <nav
          aria-label="Sections"
          className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
        >
          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Command className="size-3.5" />K
          </button>

          <div
            role="group"
            aria-label="Language"
            className="flex items-center rounded-full border border-border p-0.5"
          >
            {locales.map((lang) => (
              <button
                key={lang}
                type="button"
                aria-pressed={lang === locale}
                onClick={() => switchLocale(lang)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                  lang === locale
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<a href={cvHref(locale)} download />}
          >
            <Download />
            {t("downloadCv")}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon" aria-label={t("openMenu")} />
              }
            >
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sectionLinks.map((link) => (
                <DropdownMenuItem key={link.href} render={<a href={link.href} />}>
                  {link.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {locales.map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => switchLocale(lang)}>
                  {lang === locale ? `● ${lang.toUpperCase()}` : lang.toUpperCase()}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<a href={cvHref(locale)} download />}>
                <Download />
                {t("downloadCv")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
