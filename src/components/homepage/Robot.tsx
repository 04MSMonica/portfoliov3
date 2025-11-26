"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function RobotModel() {
  const group = useRef();
  const { scene, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, group);

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
      scale={[1.4, 1.4, 1.4]}
      position={[0, -0.8, 0]}
    />
  );
}

export default function Robot() {
  return (
    <div
      style={{
        position: "absolute",   // ⭐ stays inside hero only
        right: "9%",
        bottom: "5%",
        width: "700px",
        height: "700px",
        pointerEvents: "none",
        zIndex: 10,
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
