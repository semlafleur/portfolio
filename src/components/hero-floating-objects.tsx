"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type { ReactNode } from "react";
import type { Group } from "three";

// Procedural (no model files): a laptop and a React atom floating around the
// hero name. Built from primitives so they stay tiny and pick up the theme teal.

const BODY_COLOR = "#d4d4d8"; // zinc-300, light grey that reads on both themes
const SCREEN_COLOR = "#18181b"; // zinc-900
const CODE_LINES = [
  { width: 1.1, indent: 0 },
  { width: 0.7, indent: 0.2 },
  { width: 0.9, indent: 0.2 },
  { width: 0.5, indent: 0.4 },
  { width: 0.8, indent: 0.2 },
  { width: 0.4, indent: 0 },
];

type FloatProps = {
  position: [number, number, number];
  scale: number;
  phase: number;
  spin?: number; // radians per second around Y
  children: ReactNode;
};

/** Bobs its children up and down; optionally spins them, otherwise sways them. */
const Float = ({ position, scale, phase, spin, children }: FloatProps) => {
  const ref = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + phase;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.18;
    if (spin) {
      ref.current.rotation.y += spin * Math.min(delta, 0.05);
    } else {
      ref.current.rotation.y = -0.5 + Math.sin(t * 0.5) * 0.25;
      ref.current.rotation.x = 0.15 + Math.sin(t * 0.7) * 0.05;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {children}
    </group>
  );
};

const ReactLogo = ({ color }: { color: string }) => (
  <group>
    {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle) => (
      <group key={angle} rotation={[0, 0, angle]}>
        <mesh scale={[1, 0.38, 1]}>
          <torusGeometry args={[1, 0.05, 16, 96]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        </mesh>
      </group>
    ))}
    <mesh>
      <sphereGeometry args={[0.17, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  </group>
);

const Laptop = ({ color }: { color: string }) => (
  <group>
    <mesh>
      <boxGeometry args={[2, 0.08, 1.35]} />
      <meshStandardMaterial color={BODY_COLOR} metalness={0.2} roughness={0.4} />
    </mesh>
    {/* Screen hinged at the back edge of the base, tilted slightly open past vertical */}
    <group position={[0, 0.04, -0.675]} rotation={[-0.25, 0, 0]}>
      <mesh position={[0, 0.66, 0]}>
        <boxGeometry args={[2, 1.32, 0.06]} />
        <meshStandardMaterial color={BODY_COLOR} metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.66, 0.031]}>
        <planeGeometry args={[1.84, 1.16]} />
        <meshStandardMaterial color={SCREEN_COLOR} roughness={0.6} />
      </mesh>
      {CODE_LINES.map((line, i) => (
        <mesh
          key={i}
          position={[-0.72 + line.indent + line.width / 2, 1.08 - i * 0.16, 0.033]}
        >
          <planeGeometry args={[line.width, 0.06]} />
          <meshBasicMaterial color={color} transparent opacity={i % 2 ? 0.55 : 0.9} />
        </mesh>
      ))}
    </group>
  </group>
);

/**
 * Laptop + React logo placed around the hero name. Positions are fractions of
 * the visible viewport so they track resizes; on portrait screens they move
 * above and below the text instead of beside it.
 */
export const FloatingObjects = ({ color }: { color: string }) => {
  const { width, height } = useThree((state) => state.viewport);
  const portrait = width < height;

  const logo: [number, number, number] = portrait
    ? [width * 0.28, height * 0.36, 1]
    : [width * 0.12, height * 0.24, 1];
  const laptop: [number, number, number] = portrait
    ? [width * 0.22, -height * 0.38, 1]
    : [width * 0.3, -height * 0.1, 1];
  const scale = portrait ? 0.55 : 1;

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 6, 8]} intensity={2} />
      <pointLight position={[0, 0, 4]} color={color} intensity={6} />
      <Float position={logo} scale={scale} phase={0} spin={0.6}>
        <ReactLogo color={color} />
      </Float>
      <Float position={laptop} scale={scale * 0.9} phase={1.7}>
        <Laptop color={color} />
      </Float>
    </>
  );
};
