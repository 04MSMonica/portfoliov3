"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function RobotModel() {
  const { scene } = useGLTF("/robot.glb");
  return (
    <primitive
      object={scene}
      scale={2}           // SIZE OF ROBOT ⭐
      position={[0, -1, 0]} // Y POSITION ⭐
    />
  );
}

export default function Robot() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        {/* Soft light */}
        <ambientLight intensity={1.2} />
        <directionalLight intensity={2} position={[3, 5, 2]} />

        <RobotModel />

        {/* Enable rotation by mouse */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
