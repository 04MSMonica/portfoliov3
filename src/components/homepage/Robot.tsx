"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function RobotModel() {
  const group = useRef();
  const { scene, animations } = useGLTF("/robot.glb");
  const { actions } = useAnimations(animations, group);

  React.useEffect(() => {
    // Play the FIRST animation found in the GLB
    if (actions && Object.keys(actions).length > 0) {
      const firstAnim = Object.keys(actions)[0];
      actions[firstAnim].play();
    }
  }, [actions]);

  return <primitive ref={group} object={scene} scale={[1,1.4,1]}
 />;
}

export default function Robot() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [4, 2, 7], fov: 35 }}

    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <RobotModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

useGLTF.preload("/robot.glb");
