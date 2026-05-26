"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";

function Model() {
  const { scene } = useGLTF("/models/dji-mini3.glb");
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={ref} dispose={null}>
      <primitive object={scene} scale={12} position={[0, -0.5, 0]} />
    </group>
  );
}

export function DroneModel({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 40 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#4a8c29" />
        <pointLight position={[0, 4, 0]} intensity={0.8} color="#ffffff" />

        <Suspense fallback={null}>
          <Model />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={6}
            blur={2}
            color="#0a1a0a"
          />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/dji-mini3.glb");
