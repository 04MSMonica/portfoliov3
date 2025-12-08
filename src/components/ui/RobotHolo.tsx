"use client";

import React from "react";

/**
 * RobotHolo — Cute rounded robot hologram (R1)
 * Paste as src/components/ui/RobotHolo.tsx
 *
 * Pure SVG + CSS animations so no model loaders are required.
 */

export default function RobotHolo() {
  return (
    <div className="robot-holo-wrapper w-full flex justify-center items-center p-4">
      <div className="robot-holo relative w-56 h-56">
        {/* hologram cone */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <radialGradient id="g1" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="rgba(0,240,255,0.12)" />
              <stop offset="60%" stopColor="rgba(0,150,255,0.05)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="150" rx="60" ry="18" fill="url(#g1)" className="holo-shadow" />
        </svg>

        {/* robot body (center) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-44 rounded-2xl robot-body-glass">
          {/* head */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-28 h-20 rounded-xl robot-head-glass flex items-center justify-center">
            {/* face */}
            <div className="w-20 h-12 rounded-md bg-white/95 flex items-center justify-center relative face-mask">
              <div className="w-12 h-6 rounded-full bg-black/90 flex items-center justify-between px-2">
                <div className="eye eye-left" />
                <div className="eye eye-right" />
              </div>

              {/* smile (tiny) */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-black/80" />
            </div>
          </div>

          {/* torso */}
          <div className="absolute left-1/2 -translate-x-1/2 top-16 w-32 h-20 rounded-xl robot-torso-glass flex items-center justify-center">
            <div className="core-light w-12 h-12 rounded-full" />
          </div>

          {/* small antenna */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-1 h-12 antenna">
            <div className="antenna-tip w-4 h-4 rounded-full" />
          </div>
        </div>

        {/* floating ring */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-48 h-6 rounded-full hologram-ring" />
      </div>
    </div>
  );
}
