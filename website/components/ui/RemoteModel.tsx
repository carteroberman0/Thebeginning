"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import type { Group } from "three";

function RemoteMesh() {
  const { scene } = useGLTF("/models/dji-remote.glb");
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    scene.traverse((obj) => {
      const name = obj.name ?? "";
      if (!name) return;
      obj.visible =
        name.startsWith("DJI_Mini_3_Pro_Controller") ||
        name.startsWith("text");
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.35;
  });

  return (
    // scene.position.set(-0.001, 0.002, -0.025) to center controller bbox at origin
    // scale=22 to bring the 0.127-unit-tall controller up to ~2.8 units
    <group ref={groupRef} dispose={null}>
      <primitive
        object={scene}
        scale={22}
        position={[-0.026, 0.04, -0.55]}
      />
    </group>
  );
}

export function RemoteModel({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 55 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 8, 5]} intensity={3} castShadow />
        <directionalLight position={[-4, 3, -3]} intensity={1.2} color="#6ab840" />
        <pointLight position={[0, 5, 4]} intensity={2} />

        <Suspense fallback={null}>
          <RemoteMesh />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/dji-remote.glb");
