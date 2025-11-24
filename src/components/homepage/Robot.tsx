"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function RobotModel() {
  const group = useRef();
  const { scene, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, group);

  // Play first animation automatically
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const first = Object.keys(actions)[0];
      actions[first]?.play();
    }
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[1, 1.3, 1]}
      position={[1, -1.5, 0]}
    />
  );
}

export default function Robot() {
  return (
    <div
      style={{
        position: "fixed",
        right: "3%",
        bottom: "0%",
        width: "350px",
        height: "350px",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [4, 2, 7], fov: 35 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RobotModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/robot.glb");
