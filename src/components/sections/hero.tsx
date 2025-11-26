"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { config } from "@/data/config";

// ⭐ Robot import
import Robot from "../homepage/Robot";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <div className="grid md:grid-cols-2 h-full">
        
        {/* LEFT SIDE — TEXT */}
        <div
          className={cn(
            "h-full z-[2]",
            "flex flex-col justify-center items-center md:items-start",
            "pt-28 sm:pt-0 md:p-24 lg:p-40 xl:p-48"
          )}
        >
          {!isLoading && (
            <>
              <BlurIn delay={0.7}>
                <p className="font-thin text-md text-slate-500 dark:text-zinc-400 ml-3 sm:text-xl">
                  Hi, I am
                </p>
              </BlurIn>

              <BlurIn delay={1}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <h1 className="font-thin text-6xl text-slate-800 dark:text-white ml-1 sm:text-7xl md:text-9xl leading-[1.1]">
                      {config.author.split(" ")[0]}
                      <br />
                      {config.author.split(" ")[1]}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent className="dark:bg-white dark:text-black">
                    there's something waiting for you in devtools
                  </TooltipContent>
                </Tooltip>
              </BlurIn>

              <BlurIn delay={1.2}>
                <p className="mt-4 font-thin text-md ml-3 sm:text-xl text-slate-500 dark:text-zinc-400">
                  student developer
                </p>
              </BlurIn>

              <div className="mt-8 flex flex-col gap-3 ml-2">
                <Link
                  href="https://drive.google.com/file/d/1vjtWfqYGMIMK_rlBnmDEpKco9MiEaQss/view"
                  target="_blank"
                >
                  <BoxReveal delay={2}>
                    <Button className="flex items-center gap-2 w-full">
                      <File size={24} />
                      <p>Resume</p>
                    </Button>
                  </BoxReveal>
                </Link>

                <div className="flex gap-3">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href="#contact">
                        <Button variant="outline">Hire Me</Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>pls 🥹🙏</p>
                    </TooltipContent>
                  </Tooltip>

                  <Link href={config.social.github} target="_blank">
                    <Button variant="outline">
                      <SiGithub size={24} />
                    </Button>
                  </Link>

                  <Link href={config.social.linkedin} target="_blank">
                    <Button variant="outline">
                      <SiLinkedin size={24} />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RIGHT GRID EMPTY — Robot is NOT inside grid */}
        <div className="col-span-1 relative"></div>
      </div>

      {/* ⭐ Robot floating on homepage only */}
      <Robot />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ScrollDownIcon />
      </div>
    </section>
  );
};

export default HeroSection;
