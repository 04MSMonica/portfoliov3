"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useCallback, useEffect } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";

import { FloatingDock } from "../ui/floating-dock";
import SmoothScroll from "../smooth-scroll";

import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";

/* ---------------------------------------------------------
   SAFE DESCRIPTION EXTRACTOR
---------------------------------------------------------- */
function extractShortDescription(project: Project): string {
  const content = project.content;

  if (typeof content === "string") return content.slice(0, 120);

  if (React.isValidElement(content)) {
    const children = content.props.children;

    if (typeof children === "string") return children.slice(0, 120);

    if (Array.isArray(children)) {
      const textChild = children.find((c) => typeof c === "string");
      if (typeof textChild === "string") return textChild.slice(0, 120);
    }
  }

  return "A project I built using modern web technologies.";
}

/* ---------------------------------------------------------
   PROJECTS SECTION
---------------------------------------------------------- */
export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-7xl mx-auto py-20 px-4">
      {/* Holographic Title */}
      <h2
        className={cn(
          "relative text-center text-5xl md:text-6xl font-bold mb-16",
          "text-cyan-300 drop-shadow-[0_0_18px_rgba(0,200,255,0.55)]"
        )}
      >
        Projects
        <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-40 h-[3px] bg-cyan-400 blur-[6px]" />
      </h2>

      {/* Scroll Row */}
      <div className="flex gap-8 overflow-x-auto no-scrollbar py-4 perspective-[1200px]">
        {projects.map((project) => (
          <div key={project.id} className="min-w-[420px]">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   PROJECT CARD — HOLO TILT CARD
---------------------------------------------------------- */
function ProjectCard({ project }: { project: Project }) {
  const shortDesc = extractShortDescription(project);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Tilt Settings
  const maxTilt = 12;
  const scaleOnHover = 1.03;
  const easing = 0.12;

  const target = useRef({ rx: 0, ry: 0, tz: 0, scale: 1 });
  const current = useRef({ rx: 0, ry: 0, tz: 0, scale: 1 });

  // Smooth Tilt Renderer
  const render = useCallback(() => {
    const c = current.current;
    const t = target.current;

    c.rx += (t.rx - c.rx) * easing;
    c.ry += (t.ry - c.ry) * easing;
    c.tz += (t.tz - c.tz) * easing;
    c.scale += (t.scale - c.scale) * easing;

    if (cardRef.current) {
      cardRef.current.style.transform = `
        rotateX(${c.rx.toFixed(2)}deg)
        rotateY(${c.ry.toFixed(2)}deg)
        translateZ(${c.tz.toFixed(2)}px)
        scale(${c.scale.toFixed(3)})
      `;
    }

    rafRef.current = requestAnimationFrame(render);
  }, []);

  // Proper TS-safe useEffect cleanup
  useEffect(() => {
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  function handleMove(e: React.MouseEvent) {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const cx = px - 0.5;
    const cy = py - 0.5;

    target.current.ry = clamp(cx * maxTilt * -1, -maxTilt, maxTilt);
    target.current.rx = clamp(cy * maxTilt, -maxTilt, maxTilt);
    target.current.tz = Math.abs((1 - Math.max(0.5, Math.hypot(cx, cy))) * 18);
    target.current.scale = scaleOnHover;
  }

  function handleLeave() {
    target.current = { rx: 0, ry: 0, tz: 0, scale: 1 };
  }

  return (
    <Modal>
      <ModalTrigger className="group block cursor-pointer">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="
            relative rounded-xl overflow-hidden
            bg-[rgba(0,10,18,0.55)]
            border border-[rgba(0,200,255,0.18)]
            shadow-[0_0_20px_rgba(0,180,255,0.18)]
            hover:shadow-[0_0_40px_rgba(0,220,255,0.35)]
            transition-all duration-300 will-change-transform transform-gpu
          "
        >
          {/* Glow Edge */}
          <div className="absolute inset-0 rounded-xl pointer-events-none opacity-60 shadow-[0_0_45px_20px_rgba(0,200,255,0.25)_inset]" />

          {/* Image */}
          <div className="relative w-full h-56 overflow-hidden border-b border-[rgba(0,200,255,0.08)]">
            <Image
              src={project.src}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
            />
          </div>

          {/* Details */}
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-cyan-100">
                {project.title}
              </h3>

              <span className="text-[10px] px-2 py-1 rounded bg-[rgba(0,200,255,0.08)] text-cyan-200 border border-[rgba(0,200,255,0.18)]">
                {project.category}
              </span>
            </div>

            <p className="text-sm text-cyan-100/70 line-clamp-3">
              {shortDesc}
            </p>

            <div
              role="button"
              className="
                w-full py-2 mt-2 rounded-md text-sm text-center
                bg-[rgba(0,200,255,0.08)] text-cyan-100 border border-[rgba(0,200,255,0.25)]
                hover:bg-[rgba(0,220,255,0.12)] transition
              "
            >
              View Details
            </div>
          </div>
        </div>
      </ModalTrigger>

      {/* MODAL CONTENT */}
      <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto rounded-xl bg-black/60 border border-cyan-500/20 backdrop-blur-xl p-10">
        <SmoothScroll isInsideModal>
          <ModalContent>
            <ProjectModalContent project={project} />
          </ModalContent>
        </SmoothScroll>

        <ModalFooter className="gap-4 flex justify-end pt-10">
          <div
            role="button"
            className="px-4 py-2 bg-gray-200 text-black dark:bg-black dark:text-white rounded-md text-sm text-center"
          >
            Cancel
          </div>

          {project.github ? (
            <Link href={project.github} target="_blank">
              <div
                role="button"
                className="
                  flex items-center justify-center gap-2 px-4 py-2
                  bg-cyan-500 text-black rounded-md text-sm w-32
                  hover:bg-cyan-400 transition
                "
              >
                <FaGithub className="text-lg" />
                GitHub
              </div>
            </Link>
          ) : (
            <div className="bg-gray-500 text-white rounded-md w-32 px-4 py-2 text-sm text-center">
              No GitHub Link
            </div>
          )}
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}

/* ---------------------------------------------------------
   MODAL CONTENT
---------------------------------------------------------- */
function ProjectModalContent({ project }: { project: Project }) {
  return (
    <>
      <h4 className="text-3xl font-bold text-center text-cyan-300 drop-shadow-[0_0_15px_cyan]">
        {project.title}
      </h4>

      <div className="h-[2px] w-40 mx-auto mt-2 mb-10 bg-cyan-400 blur-[4px]" />

      {/* Tech Stack */}
      <div className="flex flex-col md:flex-row justify-evenly mb-10">
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl">
          <p className="text-sm text-neutral-400">Frontend</p>
          <FloatingDock items={project.skills.frontend} />
        </div>

        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl">
            <p className="text-sm text-neutral-400">Backend</p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>

      {/* Project Description */}
      <div className="bg-white/5 border border-cyan-500/20 p-6 rounded-xl text-center leading-relaxed text-neutral-200 font-mono">
        {project.content}
      </div>
    </>
  );
}

/* Utility */
function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
