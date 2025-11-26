"use client";

import React, { useState } from "react";
import { skills } from "@/data/skills";

type Skill = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

/* -----------------------------------------------------
   🔥 ICON COMPONENT (PNG instead of 3D)
----------------------------------------------------- */
function IconImage({ icon }: { icon: string }) {
  return (
    <img
      src={icon}
      alt="skill"
      className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-transform duration-200 hover:scale-110"
    />
  );
}

/* -----------------------------------------------------
   💠 MAIN SKILL WHEEL COMPONENT
----------------------------------------------------- */
export default function SkillWheel() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] mx-auto">

      {/* ORBIT CIRCLE */}
      <div className="absolute inset-0 rounded-full border border-white/10" />

      {/* SKILL ICONS IN A CIRCLE */}
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
              width: 70,
              height: 70,
            }}
          >
            <IconImage icon={skill.icon} />
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
