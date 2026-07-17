"use client";

import { Download, Mail, Phone, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { ComponentType, FormEvent, SVGProps } from "react";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";
import { contactChannels, cvHref } from "@/data/portfolio-data";
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

type Status = "idle" | "submitting" | "success" | "error";

export const Contact = () => {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? t("error"));
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t("error"));
    }
  };

  return (
    <Section id="contact">
      <SectionHeading eyebrow={t("eyebrow")} heading={t("heading")} />

      <Reveal>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {t("intro")}
            </p>

            <div className="mt-8 space-y-3">
              {contactChannels.map((channel) => {
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
              render={<a href={cvHref(locale)} download />}
            >
              <Download />
              {t("downloadCv")}
            </Button>
          </div>

          <form
            className="rounded-xl border border-border bg-card p-6"
            onSubmit={handleSubmit}
          >
            {/* Honeypot: hidden from real users, bots tend to fill every field */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium">
                  {t("nameLabel")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("namePlaceholder")}
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium">
                  {t("emailLabel")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium">
                {t("messageLabel")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                minLength={10}
                placeholder={t("messagePlaceholder")}
                className={`${inputClasses} resize-none`}
              />
            </div>

            <Button type="submit" className="mt-5" disabled={status === "submitting"}>
              {status === "submitting" ? t("sending") : t("send")}
              <Send />
            </Button>

            {status === "success" && (
              <p className="mt-3 text-sm text-primary" role="status">
                {t("success")}
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-destructive" role="alert">
                {errorMessage ?? t("error")}
              </p>
            )}
          </form>
        </div>
      </Reveal>
    </Section>
  );
};
