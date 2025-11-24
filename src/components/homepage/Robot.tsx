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
      scale={[2.2, 2.6, 2.2]}
      position={[0, -2, 0]}
    />
  );
}

export default function Robot() {
  return (
    <div
      style={{
        position: "fixed",
        right: "10%",
        bottom: "16%",  
        width: "500px",
        height: "500px",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [5, 3, 8], fov: 35 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[6, 6, 6]} intensity={1.2} />
        <RobotModel />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/robot.glb");
