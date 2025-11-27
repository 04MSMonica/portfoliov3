"use client";

import React, { useState } from "react";
import { skills } from "@/data/skills";

type Skill = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

export default function SkillWheel() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <div className="relative w-full flex justify-center items-center">

      {/* WHEEL + POPUP WRAPPER */}
      <div className="relative flex items-center justify-center gap-10">

        {/* WHEEL */}
        <div className="relative w-[400px] h-[400px] md:w-[520px] md:h-[520px]">

          {/* ROTATING WHEEL */}
          <div className="absolute inset-0 wheel-rotate">
            {skills.map((skill, index) => {
              const angle = (index / skills.length) * Math.PI * 2;
              const radius = 185;

              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  className="absolute cursor-pointer icon-float"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                    top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                    transform: "translate(-50%, -50%)",
                    width: 75,
                    height: 75,
                  }}
                >
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className={`
                      w-full h-full object-contain 
                      drop-shadow-[0_0_14px_rgba(0,255,255,0.35)]
                      no-rotate 
                      ${skill.id === "threejs" ? "threejs-icon" : ""}
                    `}
                  />
                </div>
              );
            })}
          </div>

          {/* STATIC OUTLINE */}
          <div className="absolute inset-0 rounded-full border border-white/10"></div>
        </div>

        {/* POPUP CARD — RIGHT SIDE */}
        {activeSkill && (
          <div
            className="
              popup w-80 md:w-96 p-6 rounded-xl backdrop-blur-xl
              border border-cyan-400/30
              bg-white/10 dark:bg-black/40
              text-white shadow-[0_0_20px_rgba(0,255,255,0.25)]
              animate-slide-right
            "
          >
            <h3 className="text-xl font-bold">{activeSkill.label}</h3>
            <p className="text-sm opacity-90 mt-2">{activeSkill.description}</p>

            <button
              className="mt-4 text-sm text-cyan-300 underline"
              onClick={() => setActiveSkill(null)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
