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
      className="w-full min-h-screen pt-32 pb-20 relative"
    >
      {/* Sticky SKILLS Heading */}
      <div className="sticky top-[70px] z-20">
        <Link href={"#skills"}>
          <BoxReveal width="100%">
            <h2
              className={cn(
                "bg-clip-text text-4xl text-center text-transparent md:text-7xl",
                "bg-gradient-to-b from-black/80 to-black/50",
                "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
              )}
            >
              SKILLS
            </h2>
          </BoxReveal>
        </Link>

        <p className="mx-auto mt-3 max-w-3xl font-normal text-base text-center text-neutral-300">
          (click a skill)
        </p>
      </div>

      {/* Skill Wheel */}
      <div className="flex justify-center mt-16 md:mt-24 z-10 relative">
        <SkillWheel />
      </div>
    </section>
  );
};

export default SkillsSection;
