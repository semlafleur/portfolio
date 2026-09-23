"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import { HeroConstellationBackground } from "@/components/hero-constellation-background";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// three + R3F stay out of the initial bundle; the chunk loads after hydration.
const HeroConstellation3D = dynamic(
  () => import("@/components/hero-constellation-3d").then((m) => m.HeroConstellation3D),
  { ssr: false },
);

let webglSupport: boolean | undefined;
const hasWebGL = () => {
  if (webglSupport === undefined) {
    const gl = document.createElement("canvas").getContext("webgl2");
    webglSupport = gl !== null;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  }
  return webglSupport;
};
const noopSubscribe = () => () => {};

/**
 * Hero backdrop: the 3D constellation when WebGL is available, otherwise the
 * 2D canvas one. Reduced motion always gets the 2D version, which renders a
 * single static frame. Renders nothing on the server.
 */
export const HeroBackground = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const webgl = useSyncExternalStore(noopSubscribe, hasWebGL, () => null);
  const [idle, setIdle] = useState(false);

  // Mount the 3D scene only once the browser is idle, so loading three.js and
  // compiling shaders doesn't compete with hydration (it was ~4x the TBT).
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setIdle(true), 300); // Safari: no requestIdleCallback
    return () => clearTimeout(id);
  }, []);

  if (webgl === null) return null;
  if (webgl && !prefersReducedMotion) return idle ? <HeroConstellation3D /> : null;
  return <HeroConstellationBackground />;
};
