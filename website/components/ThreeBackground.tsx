"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface BaseProps {
  pos: [number, number, number];
  init: [number, number, number];
  speed: [number, number, number];
  op: number;
}

function useRotate(speed: [number, number, number]) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed[0];
    ref.current.rotation.y += delta * speed[1];
    ref.current.rotation.z += delta * speed[2];
  });
  return ref;
}

// ── House (box walls + square-pyramid roof) ─────────────────────────
function House({ pos, init, speed, op }: BaseProps) {
  const ref = useRotate(speed);
  const wall = useMemo(() => {
    const g = new THREE.BoxGeometry(2.0, 1.6, 1.6);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, []);
  const roof = useMemo(() => {
    const g = new THREE.ConeGeometry(1.55, 1.0, 4, 1);
    g.rotateY(Math.PI / 4);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, []);
  return (
    <group ref={ref} position={pos} rotation={init}>
      <lineSegments geometry={wall} position={[0, -0.8, 0]}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={roof} position={[0, 0.8, 0]}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// ── Drone (flat body + X arms + 4 prop rings) ──────────────────────
function Drone({ pos, init, speed, op }: BaseProps) {
  const ref = useRotate(speed);
  const body = useMemo(() => {
    const g = new THREE.BoxGeometry(0.8, 0.18, 0.8);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, []);
  const arm = useMemo(() => {
    const g = new THREE.BoxGeometry(0.1, 0.06, 3.0);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, []);
  const prop = useMemo(() => {
    const g = new THREE.TorusGeometry(0.36, 0.04, 4, 10);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, []);
  const propPositions: [number, number, number][] = [
    [ 1.06, 0,  1.06], [-1.06, 0,  1.06],
    [ 1.06, 0, -1.06], [-1.06, 0, -1.06],
  ];
  return (
    <group ref={ref} position={pos} rotation={init}>
      <lineSegments geometry={body}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={arm} rotation={[0, Math.PI / 4, 0]}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op * 0.6} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={arm} rotation={[0, -Math.PI / 4, 0]}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op * 0.6} depthWrite={false} />
      </lineSegments>
      {propPositions.map((p, i) => (
        <lineSegments key={i} geometry={prop} position={p}>
          <lineBasicMaterial color="#2d6119" transparent opacity={op} depthWrite={false} />
        </lineSegments>
      ))}
    </group>
  );
}

// ── Controller (body + two grips + two thumbsticks) ────────────────
function Controller({ pos, init, speed, op }: BaseProps) {
  const ref = useRotate(speed);
  const body = useMemo(() => {
    const g = new THREE.BoxGeometry(2.4, 0.28, 1.1);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, []);
  const grip = useMemo(() => {
    const g = new THREE.BoxGeometry(0.65, 0.75, 0.75);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, []);
  const stick = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.17, 0.17, 0.1, 8, 1);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, []);
  return (
    <group ref={ref} position={pos} rotation={init}>
      <lineSegments geometry={body}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={grip} position={[-0.88, -0.52, 0]}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={grip} position={[ 0.88, -0.52, 0]}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={stick} position={[-0.55, 0.19, 0]}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op * 0.8} depthWrite={false} />
      </lineSegments>
      <lineSegments geometry={stick} position={[ 0.55, 0.19, 0]}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op * 0.8} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// ── Polyhedron accent ──────────────────────────────────────────────
function Poly({ type, pos, init, speed, op }: BaseProps & { type: "icosa" | "octa" | "dodeca" }) {
  const ref = useRotate(speed);
  const geo = useMemo(() => {
    let g: THREE.BufferGeometry;
    if (type === "icosa")      g = new THREE.IcosahedronGeometry(1.4, 0);
    else if (type === "octa")  g = new THREE.OctahedronGeometry(1.6, 0);
    else                       g = new THREE.DodecahedronGeometry(1.3, 0);
    const e = new THREE.EdgesGeometry(g); g.dispose(); return e;
  }, [type]);
  return (
    <group ref={ref} position={pos} rotation={init}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color="#2d6119" transparent opacity={op} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

// ── Scene ──────────────────────────────────────────────────────────
export default function ThreeBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      dpr={1}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      {/* Houses — lower positions (grounded) */}
      <House pos={[-10, -3,  -3]} init={[0.1, 0.4, 0.0]} speed={[0.03, 0.05, 0.01]} op={0.24} />
      <House pos={[  9, -4,  -2]} init={[0.0, 1.2, 0.2]} speed={[0.02, 0.04, 0.02]} op={0.22} />
      <House pos={[ -5, -6,  -4]} init={[0.3, 0.7, 0.1]} speed={[0.04, 0.03, 0.03]} op={0.18} />
      {/* edge houses */}
      <House pos={[-14,  1,  -5]} init={[0.2, 0.9, 0.0]} speed={[0.02, 0.03, 0.01]} op={0.15} />
      <House pos={[ 13, -6,  -5]} init={[0.0, 0.5, 0.3]} speed={[0.03, 0.04, 0.02]} op={0.14} />

      {/* Drones — upper positions (airborne) */}
      <Drone pos={[ 11,  5,  -2]} init={[0.2, 0.5, 0.0]} speed={[0.05, 0.04, 0.03]} op={0.25} />
      <Drone pos={[ -9,  4,  -3]} init={[0.0, 0.9, 0.3]} speed={[0.04, 0.06, 0.02]} op={0.23} />
      <Drone pos={[  0,  7,  -1]} init={[0.1, 0.3, 0.0]} speed={[0.06, 0.03, 0.04]} op={0.21} />
      <Drone pos={[ 14, -1,  -4]} init={[0.4, 0.8, 0.2]} speed={[0.03, 0.05, 0.02]} op={0.17} />
      {/* edge drones */}
      <Drone pos={[-13,  7,  -5]} init={[0.3, 0.6, 0.1]} speed={[0.04, 0.03, 0.05]} op={0.14} />
      <Drone pos={[  2, -7.5, -3]} init={[0.1, 1.0, 0.2]} speed={[0.05, 0.04, 0.03]} op={0.16} />

      {/* Controllers — scattered mid-scene */}
      <Controller pos={[-12,  2, -4]} init={[0.2, 0.6, 0.1]} speed={[0.02, 0.05, 0.03]} op={0.20} />
      <Controller pos={[  6, -5, -1]} init={[0.5, 0.3, 0.4]} speed={[0.04, 0.03, 0.05]} op={0.23} />
      <Controller pos={[ 14,  6, -6]} init={[0.3, 0.7, 0.2]} speed={[0.03, 0.04, 0.02]} op={0.14} />
      <Controller pos={[ -3,  7.5, -4]} init={[0.6, 0.2, 0.3]} speed={[0.02, 0.06, 0.03]} op={0.15} />

      {/* Polyhedra — small accents to fill gaps */}
      <Poly type="icosa"  pos={[  4,  7.5, -2]} init={[0.5, 0.6, 0.3]} speed={[0.07, 0.05, 0.06]} op={0.18} />
      <Poly type="octa"   pos={[ -4, -7.5, -3]} init={[0.6, 0.2, 0.4]} speed={[0.06, 0.04, 0.05]} op={0.16} />
      <Poly type="dodeca" pos={[  8,  3,   -5]} init={[0.1, 0.8, 0.3]} speed={[0.04, 0.06, 0.03]} op={0.15} />
    </Canvas>
  );
}
