"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useThemeColor } from "@/hooks/use-theme-color";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number; // 0..1, simulated z-axis: drives opacity + size
};

type Pulse = {
  from: number;
  to: number;
  progress: number;
};

type HeroConstellationBackgroundProps = {
  nodeCount?: number;
  connectionDistance?: number;
  pulseFrequency?: number;
  speed?: number;
  disableOnMobile?: boolean;
};

const MOBILE_BREAKPOINT = 768;
const PULSE_SPEED = 0.02;
const PARALLAX_MAX_PX = 14;
const PARALLAX_EASE = 0.06;
const MAX_DPR = 2;

export const HeroConstellationBackground = ({
  nodeCount = 55,
  connectionDistance = 110,
  pulseFrequency = 0.03,
  speed = 0.25,
  disableOnMobile = false,
}: HeroConstellationBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const color = useThemeColor();
  const colorRef = useRef(color);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    if (disableOnMobile && window.innerWidth < MOBILE_BREAKPOINT) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const nodes: Node[] = Array.from({ length: nodeCount }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: 1 + depth * 1.8,
        depth,
      };
    });
    const pulses: Pulse[] = [];

    const clampNodes = () => {
      for (const node of nodes) {
        node.x = Math.min(Math.max(node.x, 0), width);
        node.y = Math.min(Math.max(node.y, 0), height);
      }
    };

    const parallax = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      parallax.targetX = relX * -PARALLAX_MAX_PX;
      parallax.targetY = relY * -PARALLAX_MAX_PX;
    };

    const drawFrame = () => {
      const [r, g, b] = colorRef.current.split(" ");
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(parallax.x, parallax.y);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const other = nodes[j];
          const dist = Math.hypot(a.x - other.x, a.y - other.y);
          if (dist >= connectionDistance) continue;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(1 - dist / connectionDistance) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }

      for (const pulse of pulses) {
        const from = nodes[pulse.from];
        const to = nodes[pulse.to];
        const x = from.x + (to.x - from.x) * pulse.progress;
        const y = from.y + (to.y - from.y) * pulse.progress;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      for (const node of nodes) {
        const alpha = 0.4 + node.depth * 0.6;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const handleResize = () => {
      resize();
      clampNodes();
      if (prefersReducedMotion) drawFrame();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    if (prefersReducedMotion) {
      drawFrame();
      return () => resizeObserver.disconnect();
    }

    window.addEventListener("mousemove", handleMouseMove);

    let rafId: number;
    const tick = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
      clampNodes();

      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].progress += PULSE_SPEED;
        if (pulses[i].progress >= 1) pulses.splice(i, 1);
      }

      if (nodes.length > 1 && Math.random() < pulseFrequency) {
        const from = Math.floor(Math.random() * nodes.length);
        const neighbors = nodes
          .map((n, index) => ({ index, dist: Math.hypot(n.x - nodes[from].x, n.y - nodes[from].y) }))
          .filter((n) => n.index !== from && n.dist < connectionDistance);
        if (neighbors.length > 0) {
          const to = neighbors[Math.floor(Math.random() * neighbors.length)].index;
          pulses.push({ from, to, progress: 0 });
        }
      }

      parallax.x += (parallax.targetX - parallax.x) * PARALLAX_EASE;
      parallax.y += (parallax.targetY - parallax.y) * PARALLAX_EASE;

      drawFrame();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [nodeCount, connectionDistance, pulseFrequency, speed, disableOnMobile, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
    </div>
  );
};
