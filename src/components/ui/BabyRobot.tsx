"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, useGLTF } from "@react-three/drei";

export default function BabyRobot() {
  const { scene } = useGLTF("/BabyRobot.glb");

  return (
    <div className="w-full h-[240px] md:h-[300px]">
      <Canvas
        camera={{ position: [1.8, 1.8, 2.2], fov: 40 }}   // 📌 Better camera
      >
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#00eaff" />

        <Float floatIntensity={1} rotationIntensity={1} speed={1.2}>
          <primitive
            object={scene}
            scale={0.35}                // ⭐ MAKE ROBOT MUCH SMALLER
            position={[0, -0.4, 0]}     // ⭐ Move down so it fits frame
            rotation={[0, Math.PI, 0]}  // ⭐ If facing backwards, rotate
          />
        </Float>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/BabyRobot.glb");
