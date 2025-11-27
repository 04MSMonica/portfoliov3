"use client";

import React, { useState } from "react";
import { skills } from "@/data/skills";

type TechItem = { name: string; icon: string };
type Stats = {
  performance?: number;
  accessibility?: number;
  bestPractices?: number;
  seo?: number;
  pwa?: number;
  [key: string]: number | undefined;
};
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
function Ring({
  percent = 75,
  size = 56,
  stroke = 6,
}: {
  percent?: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  const gap = Math.max(0, c - dash);

  const color =
    percent >= 90 ? "#10b981" :
    percent >= 70 ? "#f59e0b" :
    "#ef4444";

  const gradId = `g-${percent}-${size}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Background Ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
        fill="transparent"
      />

      {/* Progress Ring */}
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
      MAIN COMPONENT
   ======================= */
export default function SkillWheel() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  return (
    <div className="relative w-full flex justify-center items-center">

      {/* Wheel + Popup wrapper */}
      <div className="relative flex items-center justify-center gap-8 wheel-popup-wrapper">
        {/* items-center keeps EVERYTHING aligned vertically */}

        {/* WHEEL */}
        <div className="relative w-[400px] h-[400px] md:w-[520px] md:h-[520px] wheel-container">

          {/* Rotating icons */}
          <div className="absolute inset-0 wheel-rotate" style={{ zIndex: 10 }}>
            {skills.map((skill, index) => {
              const angle = (index / skills.length) * Math.PI * 2;
              const radius = 185;

              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkill(skill as Skill)}
                  className="absolute cursor-pointer icon-float"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                    top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                    transform: "translate(-50%, -50%)",
                    width: 75,
                    height: 75,
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveSkill(skill as Skill);
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
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* Outline */}
          <div className="absolute inset-0 rounded-full border border-white/10 outline-ignore"></div>
        </div>

        {/* ===========================
                POPUP (RIGHT)
           =========================== */}
        {activeSkill && (
          <div
            className="
              popup popup-inline self-center
              w-80 md:w-96 p-6 rounded-xl backdrop-blur-xl
              border border-cyan-400/30 bg-white/10 dark:bg-black/40
              text-white shadow-[0_0_20px_rgba(0,255,255,0.25)]
              animate-slide-right
            "
          >
            <h3 className="text-xl font-bold">{activeSkill.label}</h3>

            <p className="text-sm opacity-90 mt-2">
              {activeSkill.description}
            </p>

            {/* TECH STACK */}
            {!!activeSkill.techstack?.length && (
              <div className="mt-5">
                <h4 className="text-sm font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  Tech Stack
                </h4>

                <div className="flex flex-wrap gap-2">
                  {activeSkill.techstack?.map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm border border-white/5"
                    >
                      <img src={t.icon} alt={t.name} className="w-7 h-7 object-contain" />
                      <span className="text-xs opacity-90">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STATS */}
            {activeSkill.stats && (
              <div className="mt-5">
                <h4 className="text-sm font-semibold text-cyan-300 mb-3">Stats</h4>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { key: "performance", label: "Performance" },
                    { key: "accessibility", label: "Accessibility" },
                    { key: "bestPractices", label: "Best Practices" },
                    { key: "seo", label: "SEO" },
                    { key: "pwa", label: "PWA" },
                  ].map((stat) => {
                    const val = activeSkill.stats?.[stat.key];
                    if (typeof val !== "number") return null;

                    return (
                      <div key={stat.key} className="flex items-center gap-3">
                        <Ring percent={val} size={56} stroke={6} />
                        <div className="text-sm">
                          <div className="font-medium">{val}</div>
                          <div className="text-xs opacity-80">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CLOSE */}
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
