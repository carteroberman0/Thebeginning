"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

type GeoType = "icosa" | "octa" | "dodeca" | "tetra" | "torus";

interface ShapeDef {
  type: GeoType;
  size: number;
  position: [number, number, number];
  init: [number, number, number];
  speed: [number, number, number];
  opacity: number;
}

const SHAPES: ShapeDef[] = [
  { type: "icosa",  size: 2.5, position: [-10,  4, -3], init: [0.3, 0.5, 0.0], speed: [0.03, 0.05, 0.02], opacity: 0.26 },
  { type: "dodeca", size: 2.0, position: [ 10, -3, -2], init: [0.1, 0.8, 0.3], speed: [0.05, 0.03, 0.02], opacity: 0.22 },
  { type: "octa",   size: 1.8, position: [ -6, -5, -1], init: [0.6, 0.2, 0.4], speed: [0.06, 0.04, 0.05], opacity: 0.28 },
  { type: "icosa",  size: 1.3, position: [  6,  5, -1], init: [0.9, 0.3, 0.7], speed: [0.08, 0.03, 0.04], opacity: 0.20 },
  { type: "tetra",  size: 2.2, position: [  0, -6, -4], init: [0.2, 0.7, 0.1], speed: [0.04, 0.07, 0.03], opacity: 0.18 },
  { type: "dodeca", size: 1.5, position: [-12,  0, -5], init: [0.4, 0.9, 0.5], speed: [0.02, 0.06, 0.03], opacity: 0.15 },
  { type: "octa",   size: 2.7, position: [ 13,  3, -6], init: [0.7, 0.4, 0.8], speed: [0.03, 0.04, 0.05], opacity: 0.13 },
  { type: "icosa",  size: 1.1, position: [  3,  7, -2], init: [0.5, 0.6, 0.3], speed: [0.07, 0.05, 0.06], opacity: 0.20 },
  { type: "tetra",  size: 1.6, position: [ -4,  5, -2], init: [0.8, 0.2, 0.6], speed: [0.04, 0.08, 0.03], opacity: 0.18 },
  { type: "torus",  size: 1.5, position: [  5, -4, -2], init: [0.3, 0.7, 0.5], speed: [0.05, 0.03, 0.07], opacity: 0.20 },
];

function buildGeo(type: GeoType, size: number): THREE.BufferGeometry {
  switch (type) {
    case "icosa":  return new THREE.IcosahedronGeometry(size, 0);
    case "octa":   return new THREE.OctahedronGeometry(size, 0);
    case "dodeca": return new THREE.DodecahedronGeometry(size, 0);
    case "tetra":  return new THREE.TetrahedronGeometry(size, 0);
    case "torus":  return new THREE.TorusGeometry(size, size * 0.28, 6, 10);
  }
}

function Shape({ def }: { def: ShapeDef }) {
  const ref = useRef<THREE.LineSegments>(null);
  const geo = useMemo(() => {
    const base = buildGeo(def.type, def.size);
    const edges = new THREE.EdgesGeometry(base);
    base.dispose();
    return edges;
  }, [def.type, def.size]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * def.speed[0];
    ref.current.rotation.y += delta * def.speed[1];
    ref.current.rotation.z += delta * def.speed[2];
  });

  return (
    <lineSegments ref={ref} position={def.position} rotation={def.init} geometry={geo}>
      <lineBasicMaterial color="#2d6119" transparent opacity={def.opacity} depthWrite={false} />
    </lineSegments>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      dpr={1}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      {SHAPES.map((def, i) => (
        <Shape key={i} def={def} />
      ))}
    </Canvas>
  );
}
