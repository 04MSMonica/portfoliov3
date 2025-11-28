"use client";

import React, { useState } from "react";
import { skills } from "@/data/skills";

type TechItem = { name: string; icon: string };
type Stats = { [key: string]: number };
type Skill = {
  id: string;
  label: string;
  icon: string;
  description: string;
  techstack?: TechItem[];
  stats?: Stats;
};

/* =======================
   RING COMPONENT
======================= */
function Ring({ percent = 75, size = 56, stroke = 6 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  const gap = c - dash;

  const color =
    percent >= 90 ? "#10b981" :
    percent >= 70 ? "#f59e0b" :
    "#ef4444";

  const gradId = `grad-${percent}-${size}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
        fill="transparent"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={`url(#${gradId})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray={`${dash} ${gap}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

/* =======================
   MAIN WHEEL
======================= */
export default function SkillWheel() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <div className="relative w-full flex justify-center items-center">

      {/* 🚀 WHEEL WRAPPER */}
      <div className="relative wheel-popup-wrapper">

        {/* ⭐ NEON GLOW BEHIND WHEEL */}
        <div className="neon-ring absolute inset-0"></div>

        {/* 🌟 NEW: OUTLINE GLOW */}
        <div className="wheel-glow absolute inset-0"></div>

        {/* 🎡 WHEEL */}
        <div className="wheel-container relative w-[420px] h-[420px] md:w-[520px] md:h-[520px]">

          <div className="absolute inset-0 wheel-rotate">
            {skills.map((skill, index) => {
              const angle = (index / skills.length) * Math.PI * 2;
              const radius = 185;

              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  className="absolute icon-float cursor-pointer"
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
                    className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(0,255,255,0.4)]"
                  />
                </div>
              );
            })}
          </div>

          {/* OUTLINE */}
          <div className="absolute inset-0 rounded-full border border-white/10"></div>
        </div>

        {/* 📌 POPUP CARD */}
        {activeSkill && (
          <div className="popup popup-shadow popup-glow p-6 w-80 md:w-96 rounded-xl animate-slide-right">

            <h3 className="text-xl font-bold">{activeSkill.label}</h3>
            <p className="text-sm opacity-90 mt-2">{activeSkill.description}</p>

            {/* TECH STACK */}
            {activeSkill.techstack && (
              <div className="mt-5">
                <h4 className="text-sm font-semibold mb-2 text-cyan-400">
                  Tech Stack
                </h4>

                <div className="flex flex-wrap gap-2">
                  {activeSkill.techstack.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-black/10 dark:bg-white/10 px-2 py-1 rounded-md backdrop-blur"
                    >
                      <img src={item.icon} className="w-6 h-6" />
                      <span className="text-xs">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STATS */}
            {activeSkill.stats && (
              <div className="mt-5">
                <h4 className="text-sm font-semibold mb-2 text-cyan-400">
                  Stats
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(activeSkill.stats).map(([label, val]) => (
                    <div key={label} className="flex items-center gap-3">
                      <Ring percent={val} />
                      <div className="text-sm">
                        <div className="font-medium">{val}</div>
                        <div className="text-xs opacity-70 capitalize">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="mt-4 underline text-sm text-cyan-400"
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
