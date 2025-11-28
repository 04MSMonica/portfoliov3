import { ReactNode } from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { RiReactjsFill } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";

// -------------------------------
// Skill Type
// -------------------------------
export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

// -------------------------------
// Skill Icon Map
// -------------------------------
const PROJECT_SKILLS = {
  html: {
    title: "HTML",
    bg: "#E34F26",
    fg: "white",
    icon: <SiHtml5 />,
  },
  css: {
    title: "CSS",
    bg: "#1572B6",
    fg: "white",
    icon: <SiCss3 />,
  },
  js: {
    title: "JavaScript",
    bg: "#F7DF1E",
    fg: "black",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "#3178C6",
    fg: "white",
    icon: <SiTypescript />,
  },
  react: {
    title: "React",
    bg: "#61DBFB",
    fg: "black",
    icon: <RiReactjsFill />,
  },
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <SiNextdotjs />,
  },
  tailwind: {
    title: "Tailwind CSS",
    bg: "#38BDF8",
    fg: "black",
    icon: <SiTailwindcss />,
  },
  shadcn: {
    title: "Shadcn UI",
    bg: "black",
    fg: "white",
    icon: <TbBrandNextjs />,
  },
};

// -------------------------------
// Project Type
// -------------------------------
export type Project = {
  id: string;
  title: string;
  category: string;
  src: string;
  screenshots: string[];
  skills: {
    frontend: Skill[];
    backend: Skill[];
  };
  live?: string;
  github: string;
  content: React.ReactNode;
};

// -------------------------------
// Paths
// -------------------------------
const BASE_PATH = "/assets/projects";

// -------------------------------
// YOUR PROJECTS ONLY
// -------------------------------
const projects: Project[] = [
  // ----------------------------------------------------------------
  // 1. PORTFOLIO V3
  // ----------------------------------------------------------------
  {
    id: "portfoliov3",
    title: "Portfolio V3",
    category: "Portfolio Website",
    src: "/projects/portfoliov3.png",
    screenshots: [],
    github: "https://github.com/04MSMonica/portfoliov3",
    live: "",
    skills: {
      frontend: [
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.shadcn,
      ],
      backend: [],
    },
    content: (
      <p className="font-mono">
        A modern personal portfolio built using Next.js, TypeScript, Tailwind
        CSS, and Shadcn UI. Includes animations, responsive design, project
        modals, and smooth UI interactions.
      </p>
    ),
  },

  // ----------------------------------------------------------------
  // 2. E-COMMERCE
  // ----------------------------------------------------------------
  {
    id: "ecommerce",
    title: "E-Commerce Website",
    category: "Web Application",
    src: "/projects/ecommerce.png",
    screenshots: [],
    github: "https://github.com/04MSMonica/e-commerce",
    live: "",
    skills: {
      frontend: [PROJECT_SKILLS.html, PROJECT_SKILLS.css, PROJECT_SKILLS.js],
      backend: [],
    },
    content: (
      <p className="font-mono">
        A simple e-commerce website built using HTML, CSS, and JavaScript.
        Includes product listing, cart logic, and a clean shopping interface.
      </p>
    ),
  },

  // ----------------------------------------------------------------
  // 3. EMAIL APP
  // ----------------------------------------------------------------
  {
    id: "emailjs",
    title: "Email Sender App",
    category: "Utility App",
    src: "/projects/email.png",
    screenshots: [],
    github: "https://github.com/04MSMonica/email",
    live: "",
    skills: {
      frontend: [PROJECT_SKILLS.js],
      backend: [],
    },
    content: (
      <p className="font-mono">
        A lightweight JavaScript email sender app with a clean UI and simple
        logic for sending messages quickly.
      </p>
    ),
  },

  // ----------------------------------------------------------------
  // 4. EXPENSE TRACKER
  // ----------------------------------------------------------------
  {
    id: "expensetracker",
    title: "Expense Tracker",
    category: "Finance Tool",
    src: "/projects/expensetracker.png",
    screenshots: [],
    github: "https://github.com/04MSMonica/expensetracker",
    live: "",
    skills: {
      frontend: [PROJECT_SKILLS.js],
      backend: [],
    },
    content: (
      <p className="font-mono">
        A JavaScript-based expense tracker for managing daily spending,
        categorizing transactions, and viewing totals in a clean dashboard UI.
      </p>
    ),
  },
];

export default projects;
