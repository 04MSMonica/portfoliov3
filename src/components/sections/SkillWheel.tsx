"use client";

import React, { useMemo, useState } from "react";
import { skills, Skill } from "@/data/skills";

type RingProps = { percent: number; size?: number; stroke?: number };

function Ring({ percent, size = 56, stroke = 6 }: RingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  const gap = c - dash;

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={stroke}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="#00eaff"
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${gap}`}
        strokeLinecap="round"
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

export default function SkillWheel() {
  const WHEEL = 560;

  const OUTER_R = WHEEL / 2;
  const INNER_R = OUTER_R * 0.55;
  const ICON_R = OUTER_R * 0.78;

  const count = 8;
  const cx = OUTER_R;
  const cy = OUTER_R;

  const [active, setActive] = useState<Skill | null>(null);

  const spokes = useMemo(() => {
    return [...Array(count)].map((_, i) => {
      const a = (i / count) * Math.PI * 2;

      return {
        x1: cx + Math.cos(a) * INNER_R,
        y1: cy + Math.sin(a) * INNER_R,
        x2: cx + Math.cos(a) * OUTER_R,
        y2: cy + Math.sin(a) * OUTER_R,
      };
    });
  }, []);

  return (
    <div className="w-full flex justify-center py-10">
      <div className="relative wheel-popup-wrapper" style={{ maxWidth: 840 }}>

        {/* --- WHEEL --- */}
        <div style={{ width: WHEEL, height: WHEEL, position: "relative" }}>

          <div className="neon-ring" />
          <div className="wheel-glow" />
          <div className="neon-outline" />

          <div
            className="inner-ring"
            style={{ width: INNER_R * 2, height: INNER_R * 2 }}
          />

          <svg className="wheel-spokes" width={WHEEL} height={WHEEL}>
            {spokes.map((s, i) => (
              <line key={i} {...s} className="spoke-line" />
            ))}
          </svg>

          {/* --- ICONS --- */}
          <div className="absolute inset-0" style={{ zIndex: 8 }}>
            {skills.map((sk, i) => {
              const a = (i / count) * Math.PI * 2; // perfect symmetry
              const x = cx + Math.cos(a) * ICON_R;
              const y = cy + Math.sin(a) * ICON_R;

              return (
                <div
                  key={sk.id}
                  className="icon-wrapper"
                  style={{ left: x, top: y }}
                >
                  <div className="icon-tile icon-float" onClick={() => setActive(sk)}>
                    <img src={sk.icon} alt={sk.label} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* --- POPUP --- */}
        {active && (
          <div
            className="popup"
            style={{
              left: `calc(${WHEEL}px + 26px)`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <h3 className="text-xl mb-2">{active.label}</h3>
            <p className="opacity-90 mb-4">{active.description}</p>

            {active.techstack && (
              <>
                <div className="text-cyan-300 mb-2">Tech Stack</div>
                <div className="flex gap-2 flex-wrap">
                  {active.techstack.map((t, idx) => (
                    <div key={idx} className="tech-pill">
                      <img src={t.icon} width={18} height={18} />
                      <span className="text-xs">{t.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {active.stats && (
              <>
                <div className="text-cyan-300 mt-4 mb-2">Stats</div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(active.stats).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-3">
                      <Ring percent={v} />
                      <div>
                        <div className="font-bold">{v}</div>
                        <div className="text-xs opacity-70">{k}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => setActive(null)}
              className="text-cyan-300 underline mt-4"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
