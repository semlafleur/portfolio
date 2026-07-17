"use client";

import { Command, Download, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const languages = ["EN", "IT", "DE"] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-2.5 font-semibold">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            SL
          </span>
          <span className="hidden sm:inline">Samuele La Fleur</span>
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
          <span
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
            aria-hidden="true"
          >
            <Command className="size-3.5" />K
          </span>

          <div
            role="group"
            aria-label="Language"
            className="flex items-center rounded-full border border-border p-0.5"
          >
            {languages.map((lang, index) => (
              <button
                key={lang}
                type="button"
                aria-pressed={index === 0}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            <Download />
            Download CV
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu" />
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
              <DropdownMenuItem render={<a href="#contact" />}>
                <Download />
                Download CV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
