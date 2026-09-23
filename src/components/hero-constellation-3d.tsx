"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FloatingObjects } from "@/components/hero-floating-objects";
import { useThemeColor } from "@/hooks/use-theme-color";

const NODE_COUNT = 90;
// Half-extents of the drift volume. X is a minimum: on wide screens it grows to
// the visible width so the constellation reaches both edges.
const BOUNDS = new THREE.Vector3(9, 5, 4);
const SPEED = 0.25; // units per second
const CONNECTION_DISTANCE = 3.2;
const MAX_PULSES = 12;
const PULSE_CHANCE = 0.04; // per frame
const PULSE_SPEED = 1.2; // edge lengths per second
const PARALLAX = 0.18; // max tilt in radians
// Idle yaw sway (not a full turn: rotating the wide volume side-on would squeeze
// the constellation into a narrow band in the middle of the screen).
const SWAY = 0.2; // radians
const SWAY_SPEED = 0.15; // radians per second

// +1 margin covers the mouse-parallax shift (±0.6) so no edge ever shows empty.
const halfWidthFor = (viewportWidth: number) => Math.max(BOUNDS.x, viewportWidth / 2 + 1);

// Soft round sprites; size shrinks with distance so depth reads as perspective.
const pointVertex = /* glsl */ `
  attribute float aSize;
  uniform float uPixelRatio;
  varying float vDepth;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (24.0 / -mv.z);
    vDepth = clamp((-mv.z - 6.0) / 14.0, 0.0, 1.0);
  }
`;
const pointFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d) * uOpacity * (1.0 - vDepth * 0.7);
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const makePointMaterial = (opacity: number) =>
  new THREE.ShaderMaterial({
    vertexShader: pointVertex,
    fragmentShader: pointFragment,
    uniforms: {
      uColor: { value: new THREE.Color() },
      uOpacity: { value: opacity },
      uPixelRatio: { value: 1 },
    },
    transparent: true,
    depthWrite: false,
  });

const random = (half: number) => (Math.random() * 2 - 1) * half;

type Pulse = { from: number; to: number; progress: number };

const createScene = (halfWidth: number) => {
  const positions = new Float32Array(NODE_COUNT * 3);
  const velocities = new Float32Array(NODE_COUNT * 3);
  const sizes = new Float32Array(NODE_COUNT);
  for (let i = 0; i < NODE_COUNT; i++) {
    positions.set([random(halfWidth), random(BOUNDS.y), random(BOUNDS.z)], i * 3);
    velocities.set([random(SPEED), random(SPEED), random(SPEED)], i * 3);
    sizes[i] = 4 + Math.random() * 6;
  }

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  nodeGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const maxSegments = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(maxSegments * 6), 3),
  );
  lineGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(maxSegments * 8), 4),
  );

  const pulseGeometry = new THREE.BufferGeometry();
  pulseGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(MAX_PULSES * 3), 3),
  );
  pulseGeometry.setAttribute(
    "aSize",
    new THREE.BufferAttribute(new Float32Array(MAX_PULSES).fill(14), 1),
  );

  return {
    positions,
    velocities,
    nodeGeometry,
    lineGeometry,
    pulseGeometry,
    nodeMaterial: makePointMaterial(0.9),
    pulseMaterial: makePointMaterial(1),
    lineMaterial: new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
    }),
    pulses: [] as Pulse[],
    halfWidth,
  };
};

type SceneData = ReturnType<typeof createScene>;

const Constellation = ({ rgb }: { rgb: string }) => {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<SceneData | null>(null);
  const get = useThree((state) => state.get);

  useEffect(() => {
    const scene = createScene(halfWidthFor(get().viewport.width));
    sceneRef.current = scene;
    const objects = [
      new THREE.LineSegments(scene.lineGeometry, scene.lineMaterial),
      new THREE.Points(scene.nodeGeometry, scene.nodeMaterial),
      new THREE.Points(scene.pulseGeometry, scene.pulseMaterial),
    ];
    const root = group.current;
    root?.add(...objects);

    // Track the whole window: the hero copy sits above the canvas and would
    // swallow canvas-scoped pointer events.
    const onMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      root?.remove(...objects);
      sceneRef.current = null;
      for (const disposable of [
        scene.nodeGeometry,
        scene.lineGeometry,
        scene.pulseGeometry,
        scene.nodeMaterial,
        scene.pulseMaterial,
        scene.lineMaterial,
      ]) {
        disposable.dispose();
      }
    };
  }, [get]);

  useFrame((state, delta) => {
    const scene = sceneRef.current;
    if (!scene) return;
    const dt = Math.min(delta, 0.05); // avoid jumps after a paused tab
    const { positions, velocities, pulses } = scene;
    const pixelRatio = state.gl.getPixelRatio();
    scene.nodeMaterial.uniforms.uPixelRatio.value = pixelRatio;
    scene.pulseMaterial.uniforms.uPixelRatio.value = pixelRatio;

    // On resize, stretch x positions to the new width instead of piling nodes on the edges.
    const halfWidth = halfWidthFor(state.viewport.width);
    if (halfWidth !== scene.halfWidth) {
      const ratio = halfWidth / scene.halfWidth;
      for (let i = 0; i < NODE_COUNT; i++) positions[i * 3] *= ratio;
      scene.halfWidth = halfWidth;
    }

    const limits = [halfWidth, BOUNDS.y, BOUNDS.z];
    for (let i = 0; i < NODE_COUNT * 3; i++) {
      positions[i] += velocities[i] * dt;
      const limit = limits[i % 3];
      if (Math.abs(positions[i]) > limit) {
        positions[i] = Math.sign(positions[i]) * limit;
        velocities[i] *= -1;
      }
    }
    scene.nodeGeometry.attributes.position.needsUpdate = true;

    const [r, g, b] = rgb.split(" ").map((c) => Number(c) / 255);
    scene.nodeMaterial.uniforms.uColor.value.setRGB(r, g, b);
    scene.pulseMaterial.uniforms.uColor.value.setRGB(r, g, b);

    // ponytail: O(n²) neighbour scan, fine at 90 nodes; spatial grid if NODE_COUNT grows a lot
    const linePositions = scene.lineGeometry.attributes.position.array as Float32Array;
    const lineColors = scene.lineGeometry.attributes.color.array as Float32Array;
    const neighbours: number[][] = Array.from({ length: NODE_COUNT }, () => []);
    let segments = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist >= CONNECTION_DISTANCE) continue;
        neighbours[i].push(j);
        neighbours[j].push(i);
        const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.6;
        linePositions.set(positions.subarray(i * 3, i * 3 + 3), segments * 6);
        linePositions.set(positions.subarray(j * 3, j * 3 + 3), segments * 6 + 3);
        lineColors.set([r, g, b, alpha, r, g, b, alpha], segments * 8);
        segments++;
      }
    }
    scene.lineGeometry.setDrawRange(0, segments * 2);
    scene.lineGeometry.attributes.position.needsUpdate = true;
    scene.lineGeometry.attributes.color.needsUpdate = true;

    if (pulses.length < MAX_PULSES && Math.random() < PULSE_CHANCE) {
      const from = Math.floor(Math.random() * NODE_COUNT);
      const options = neighbours[from];
      if (options.length > 0) {
        pulses.push({ from, to: options[Math.floor(Math.random() * options.length)], progress: 0 });
      }
    }
    const pulsePositions = scene.pulseGeometry.attributes.position.array as Float32Array;
    for (let p = pulses.length - 1; p >= 0; p--) {
      pulses[p].progress += PULSE_SPEED * dt;
      if (pulses[p].progress >= 1) pulses.splice(p, 1);
    }
    pulses.forEach(({ from, to, progress }, p) => {
      for (let axis = 0; axis < 3; axis++) {
        const a = positions[from * 3 + axis];
        pulsePositions[p * 3 + axis] = a + (positions[to * 3 + axis] - a) * progress;
      }
    });
    scene.pulseGeometry.setDrawRange(0, pulses.length);
    scene.pulseGeometry.attributes.position.needsUpdate = true;

    if (group.current) {
      const rotation = group.current.rotation;
      rotation.y = Math.sin(state.clock.elapsedTime * SWAY_SPEED) * SWAY;
      rotation.x += (pointer.current.y * PARALLAX - rotation.x) * 0.05;
      group.current.position.x += (pointer.current.x * 0.6 - group.current.position.x) * 0.05;
    }
  });

  return <group ref={group} />;
};

/** WebGL hero scene: constellation + floating objects. Pauses rendering while off-screen. */
export const HeroConstellation3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const rgb = useThemeColor();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      >
        <Constellation rgb={rgb} />
        <FloatingObjects color={`rgb(${rgb.split(" ").join(", ")})`} />
      </Canvas>
    </div>
  );
};
