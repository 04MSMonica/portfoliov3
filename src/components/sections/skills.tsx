"use client";

import Link from "next/link";
import React from "react";
import { BoxReveal } from "../reveal-animations";
import { cn } from "@/lib/utils";
import SkillWheel from "./SkillWheel";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative w-full min-h-screen pt-24 pb-20 flex flex-col items-center"
    >
      {/* ===========================
          SKILLS TITLE + SUBTITLE
      ============================ */}
      <div className="relative z-30 text-center pointer-events-none">
        <Link href={"#skills"}>
          <BoxReveal width="100%">
            <h2
              className={cn(
                "text-4xl md:text-7xl font-extrabold select-none",
                "text-[#5FE8FF]",
                "drop-shadow-[0_0_25px_#00E5FF90]"
              )}
            >
              SKILLS
            </h2>
          </BoxReveal>
        </Link>

        {/* Glow bar under SKILLS */}
        <div className="mx-auto mt-2 w-48 h-[12px] bg-[#00E5FF] blur-[25px] opacity-60 rounded-full"></div>

        {/* Subtitle */}
        <p className="mt-4 text-base text-[#8EEBFF]/70">(click a skill)</p>
      </div>

      {/* ===========================
          SKILL WHEEL
      ============================ */}
      <div className="flex justify-center mt-10 md:mt-12 relative z-10">
        <SkillWheel />
      </div>
    </section>
  );
};

export default SkillsSection;
