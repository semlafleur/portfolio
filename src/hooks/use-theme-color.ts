"use client";

import { useSyncExternalStore } from "react";

/** SSR fallback: teal-500, "r g b". */
const FALLBACK_RGB = "20 184 166";

const hexToRgbString = (hex: string): string | null => {
  const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(hex.trim());
  if (!match) return null;

  const full =
    match[1].length === 3
      ? match[1]
          .split("")
          .map((c) => c + c)
          .join("")
      : match[1];

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
};

const readPrimaryColor = (): string => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  return hexToRgbString(raw) ?? FALLBACK_RGB;
};

const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const getServerSnapshot = () => FALLBACK_RGB;

/** Current theme primary color as an "r g b" string, reactive to dark/light toggles. */
export const useThemeColor = () =>
  useSyncExternalStore(subscribe, readPrimaryColor, getServerSnapshot);
