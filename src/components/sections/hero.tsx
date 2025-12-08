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

// ⭐ Futuristic font — Orbitron
import { Orbitron } from "next/font/google";
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// ⭐ Robot import
import Robot from "../homepage/Robot";

export default function HeroSection() {
  const { isLoading } = usePreloader();

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center"
    >
      {/* ⭐ HOLOGRAM STARS BACKDROP */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center animate-pulseSlow" />
      </div>

      <div className="grid md:grid-cols-2 h-full w-full px-8 md:px-16 lg:px-24 relative z-[2]">
        
        {/* ⭐ LEFT SIDE — HOLOGRAM TEXT */}
        <div className="flex flex-col justify-center items-center md:items-start">
          {!isLoading && (
            <>
              {/* “Hi, I am” */}
              <BlurIn delay={0.7}>
                <p className="text-cyan-300/70 text-lg tracking-wide ml-2">
                  Hi, I am
                </p>
              </BlurIn>

              {/* ⭐ Name — Sci-Fi Glow */}
              <BlurIn delay={1}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <h1
                      className={cn(
                        orbitron.className,
                        "hologram-title text-[60px] sm:text-[80px] md:text-[110px] lg:text-[130px] uppercase font-bold leading-[1.05] select-none"
                      )}
                    >
                      {config.author.split(" ")[0]}
                      <br />
                      {config.author.split(" ")[1]}
                    </h1>
                  </TooltipTrigger>

                  <TooltipContent className="dark:bg-white dark:text-black">
                    there's something waiting for you in devtools ✨
                  </TooltipContent>
                </Tooltip>
              </BlurIn>

              {/* ⭐ Subtitle */}
              <BlurIn delay={1.2}>
                <p className="mt-4 text-cyan-200/60 tracking-[0.3em] uppercase ml-2">
                  student developer
                </p>
              </BlurIn>

              {/* ⭐ Buttons */}
              <BlurIn delay={1.35}>
                <div className="mt-10 flex flex-col gap-4 w-full sm:w-auto ml-2">

                  {/* Resume */}
                  <Link
                    href="https://docs.google.com/document/d/1giXPFY4sdRcNd2HuP_-c3lX7c8TC5E_j/view"
                    target="_blank"
                  >
                    <BoxReveal delay={1.5}>
                      <Button className="flex items-center gap-2 w-full sm:w-auto hologram-button">
                        <File size={20} />
                        Resume
                      </Button>
                    </BoxReveal>
                  </Link>

                  <div className="flex gap-3">

                    {/* Hire Me */}
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Link href="#contact">
                          <Button
                            variant="outline"
                            className="hologram-button border-cyan-300/30 text-cyan-200"
                          >
                            Hire Me
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Let's work together ⚡</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* GitHub */}
                    <Link href={config.social.github} target="_blank">
                      <Button
                        variant="outline"
                        className="hologram-button border-cyan-300/30 text-cyan-200"
                      >
                        <SiGithub size={22} />
                      </Button>
                    </Link>

                    {/* LinkedIn */}
                    <Link href={config.social.linkedin} target="_blank">
                      <Button
                        variant="outline"
                        className="hologram-button border-cyan-300/30 text-cyan-200"
                      >
                        <SiLinkedin size={22} />
                      </Button>
                    </Link>

                  </div>
                </div>
              </BlurIn>
            </>
          )}
        </div>

        {/* ⭐ RIGHT SIDE — Robot */}
        <div className="relative hidden md:flex items-center justify-center">
          <Robot />
        </div>
      </div>

      {/* Scroll icon */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ScrollDownIcon />
      </div>

      {/* ⭐ HOLOGRAM STYLES */}
      <style jsx>{`
        .hologram-title {
          color: #dfffff;
          text-shadow:
            0 0 12px rgba(0, 255, 255, 0.9),
            0 0 30px rgba(0, 255, 255, 0.55),
            0 0 60px rgba(0, 255, 255, 0.3);
          filter: drop-shadow(0 0 25px rgba(0, 255, 255, 0.2));
        }

        .hologram-button {
          background: rgba(0, 20, 30, 0.45);
          border-radius: 6px;
          border: 1px solid rgba(0, 255, 255, 0.3);
          backdrop-filter: blur(6px);
          box-shadow:
            0 0 10px rgba(0, 255, 255, 0.25),
            inset 0 0 10px rgba(0, 255, 255, 0.15);
          transition: 0.25s ease;
        }

        .hologram-button:hover {
          box-shadow:
            0 0 18px rgba(0, 255, 255, 0.7),
            inset 0 0 15px rgba(0, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .animate-pulseSlow {
          animation: pulseSlow 6s ease-in-out infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
