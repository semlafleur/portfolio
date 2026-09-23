import type { Locale } from "@/data/portfolio-data";

/** "2024-04" -> "Apr 2024", localized ("apr 2024", "Apr. 2024"). */
export const formatMonth = (value: string, locale: Locale): string => {
  const [year, month] = value.split("-").map(Number);
  // UTC so the 1st of the month can't slip back a day in a negative offset.
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
};

/** Formats a start/end pair; a missing end renders as `presentLabel`. */
export const formatRange = (
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string =>
  `${formatMonth(start, locale)} — ${
    end ? formatMonth(end, locale) : presentLabel
  }`;
