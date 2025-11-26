"use client";

import React, { Suspense, useState } from "react";
import { skills } from "@/data/skills";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, useGLTF } from "@react-three/drei";

type Skill = {
  id: string;
  label: string;
  description: string;
};

/* -----------------------------------------------------
   🔥 LOAD 3D MODEL BASED ON SKILL ID + FIX TRANSFORMS
----------------------------------------------------- */
function ModelIcon({ id }: { id: string }) {
  const fileMap: Record<string, string> = {
    html: "/models/html-3d.glb",
    css: "/models/css-3d.glb",
    javascript: "/models/javascript.glb",
    threejs: "/models/threejs.glb",
    git: "/models/git.glb",
    react: "/models/react_logo.glb",
    figma: "/models/figma.glb",
    tailwind: "/models/tailwind.glb",
  };

  const path = fileMap[id] ?? "/models/react_logo.glb";
  const { scene } = useGLTF(path);

  // FIX SCALE / ROTATION / POSITION FOR EACH MODEL
  const transform = {
    html: {
      scale: 0.7,
      rotation: [0, Math.PI, 0],
      position: [0, -0.2, 0],
    },
    css: {
      scale: 0.7,
      rotation: [0, Math.PI, 0],
      position: [0, -0.2, 0],
    },
    javascript: {
      scale: 0.9,
      rotation: [0, Math.PI / 2, 0],
      position: [0, -0.2, 0],
    },
    threejs: {
      scale: 0.9,
      rotation: [0, Math.PI, 0],
      position: [0, -0.3, 0],
    },
    git: {
      scale: 1,
      rotation: [0, 0, 0],
      position: [0, 0, 0],
    },
    react: {
      scale: 1.1,
      rotation: [0, 0, 0],
      position: [0, 0, 0],
    },
    figma: {
      scale: 1.1,
      rotation: [0, Math.PI, 0],
      position: [0, -0.1, 0],
    },
    tailwind: {
      scale: 1.4,
      rotation: [0, Math.PI, 0],
      position: [0, 0, 0],
    },
  }[id] ?? {
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
  };

  return (
    <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.3}>
      <primitive
        object={scene}
        scale={transform.scale}
        rotation={transform.rotation}
        position={transform.position}
      />
    </Float>
  );
}

/* -----------------------------------------------------
   💠 MAIN SKILL WHEEL COMPONENT
----------------------------------------------------- */
export default function SkillWheel() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] mx-auto">

      {/* ORBIT RING */}
      <div className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow" />

      {/* 3D ICONS AROUND THE CIRCLE */}
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 160;

        return (
          <div
            key={skill.id}
            onClick={() => setActiveSkill(skill)}
            className="absolute cursor-pointer"
            style={{
              left: `calc(50% + ${Math.cos(angle) * radius}px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}px)`,
              transform: "translate(-50%, -50%)",
              width: 75,
              height: 75,
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 3], fov: 45 }}
              style={{ width: "100%", height: "100%" }}
            >
              <ambientLight intensity={0.7} />
              <directionalLight intensity={1.1} position={[2, 2, 2]} />

              <Suspense fallback={null}>
                <ModelIcon id={skill.id} />
                <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
              </Suspense>
            </Canvas>
          </div>
        );
      })}

      {/* POPUP CARD */}
      {activeSkill && (
        <div
          className="
            absolute left-[115%] top-1/2 -translate-y-1/2
            w-72 p-5 rounded-xl backdrop-blur-xl
            border border-cyan-400/30
            bg-white/70 dark:bg-black/70
            text-black dark:text-white
            shadow-[0_0_20px_rgba(0,255,255,0.25)]
            animate-slide-right
          "
        >
          <h3 className="text-xl font-bold">{activeSkill.label}</h3>
          <p className="text-sm opacity-80 mt-2">{activeSkill.description}</p>

          <button
            className="mt-3 text-xs text-cyan-600 dark:text-cyan-300 underline"
            onClick={() => setActiveSkill(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

/* -----------------------------------------------------
   🔥 PRELOAD MODELS
----------------------------------------------------- */
useGLTF.preload("/models/html-3d.glb");
useGLTF.preload("/models/css-3d.glb");
useGLTF.preload("/models/javascript.glb");
useGLTF.preload("/models/threejs.glb");
useGLTF.preload("/models/git.glb");
useGLTF.preload("/models/react_logo.glb");
useGLTF.preload("/models/figma.glb");
useGLTF.preload("/models/tailwind.glb");
