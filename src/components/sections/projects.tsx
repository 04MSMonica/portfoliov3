"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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
   PROJECTS SECTION (Clean Horizontal Scroll)
---------------------------------------------------------- */
export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-7xl mx-auto py-20 px-4">
      <h2
        className={cn(
          "text-center text-4xl md:text-6xl font-bold mb-16",
          "bg-clip-text text-transparent bg-gradient-to-b from-black/80 to-black/40",
          "dark:from-white/80 dark:to-white/20"
        )}
      >
        Projects
      </h2>

      {/* HORIZONTAL SCROLL VIEW */}
      <div className="flex gap-8 overflow-x-auto no-scrollbar py-4">
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
   PROJECT CARD (Hydration-Safe)
---------------------------------------------------------- */
function ProjectCard({ project }: { project: Project }) {
  const shortDesc = extractShortDescription(project);

  return (
    <Modal>
      <ModalTrigger className="group block cursor-pointer">
        <div className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all">

          {/* IMAGE */}
          <div className="relative w-full h-56 overflow-hidden">
            <Image
              src={project.src}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* CARD CONTENT */}
          <div className="p-5 space-y-4">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <span className="text-xs px-2 py-1 rounded bg-black text-white dark:bg-white dark:text-black">
                {project.category}
              </span>
            </div>

            {/* SHORT DESCRIPTION */}
            <p className="text-sm text-neutral-700 dark:text-neutral-400 line-clamp-3">
              {shortDesc}
            </p>

            {/* FIXED BUTTON */}
            <div
              role="button"
              className="w-full py-2 mt-2 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm text-center"
            >
              View Details
            </div>
          </div>
        </div>
      </ModalTrigger>

      {/* MODAL */}
      <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
        <SmoothScroll isInsideModal={true}>
          <ModalContent>
            <ProjectModalContent project={project} />
          </ModalContent>
        </SmoothScroll>

        {/* FOOTER */}
        <ModalFooter className="gap-4">

          {/* CANCEL */}
          <div
            role="button"
            className="px-4 py-2 bg-gray-200 text-black dark:bg-black dark:text-white rounded-md text-sm text-center"
          >
            Cancel
          </div>

          {/* 🔥 GITHUB BUTTON WITH ICON */}
          {project.github ? (
            <Link href={project.github} target="_blank">
              <div
                role="button"
                className="flex items-center justify-center gap-2 px-4 py-2 
                bg-black text-white dark:bg-white dark:text-black 
                rounded-md text-sm w-32 border border-neutral-800 
                hover:opacity-90 transition"
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
      <h4 className="text-lg md:text-2xl font-bold text-center text-neutral-700 dark:text-neutral-100 mb-8">
        {project.title}
      </h4>

      {/* TECH STACK */}
      <div className="flex flex-col md:flex-row justify-evenly mb-10">

        {/* FRONTEND */}
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Frontend
          </p>
          <FloatingDock items={project.skills.frontend} />
        </div>

        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Backend
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>

      {/* FULL DESCRIPTION */}
      {project.content}
    </>
  );
}
