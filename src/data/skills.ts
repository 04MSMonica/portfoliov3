// src/data/skills.ts
export type TechItem = { name: string; icon: string };
export type Stats = { [key: string]: number };

export type Skill = {
  id: string;
  label: string;
  icon: string;
  description: string;
  techstack?: TechItem[];
  stats?: Stats;
};

export const skills: Skill[] = [
  {
    id: "html",
    label: "HTML",
    icon: "https://raw.githubusercontent.com/sanidhyy/space-portfolio/main/public/skills/html.png",
    description:
      "I use HTML to build clean, semantic structures that improve accessibility and SEO.",
    techstack: [
      { name: "Semantic HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "Forms & Validation", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    ],
    stats: { performance: 95, accessibility: 92, bestPractices: 96, seo: 90, pwa: 75 },
  },
  {
    id: "css",
    label: "CSS",
    icon: "https://raw.githubusercontent.com/sanidhyy/space-portfolio/main/public/skills/css.png",
    description:
      "I design responsive and polished interfaces using modern CSS patterns, animations and layouts.",
    techstack: [
      { name: "Flexbox & Grid", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Animations", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
    stats: { performance: 91, accessibility: 88, bestPractices: 93, seo: 84, pwa: 70 },
  },
  {
    id: "javascript",
    label: "JavaScript",
    icon: "https://raw.githubusercontent.com/sanidhyy/space-portfolio/main/public/skills/js.png",
    description:
      "JavaScript enables me to add interactivity, dynamic content, and logic to my applications.",
    techstack: [
      { name: "ES6+", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Async / Await", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
    stats: { performance: 94, accessibility: 85, bestPractices: 92, seo: 80, pwa: 78 },
  },
  {
    id: "react",
    label: "React",
    icon: "https://raw.githubusercontent.com/sanidhyy/space-portfolio/main/public/skills/react.png",
    description:
      "React is my main library for building modern UIs. I create reusable components and fast apps.",
    techstack: [
      { name: "Hooks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Router", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg" },
    ],
    stats: { performance: 95, accessibility: 90, bestPractices: 96, seo: 89, pwa: 82 },
  },
  {
    id: "tailwind",
    label: "Tailwind",
    icon: "https://raw.githubusercontent.com/sanidhyy/space-portfolio/main/public/skills/tailwind.png",
    description:
      "I use Tailwind for utility-first, responsive styling and fast iteration.",
    techstack: [
      { name: "Utility-First", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    ],
    stats: { performance: 93, accessibility: 88, bestPractices: 94, seo: 86, pwa: 75 },
  },
  {
    id: "figma",
    label: "Figma",
    icon: "https://raw.githubusercontent.com/sanidhyy/space-portfolio/main/public/skills/figma.png",
    description:
      "I design clean interfaces in Figma before development to keep UI consistent.",
    techstack: [
      { name: "Wireframing", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    ],
    stats: { performance: 88, accessibility: 80, bestPractices: 85, seo: 70, pwa: 60 },
  },
  {
    id: "git",
    label: "Git",
    icon: "https://raw.githubusercontent.com/github/explore/main/topics/git/git.png",
    description:
      "I use Git for version control and collaborative development.",
    techstack: [
      { name: "Branching", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    ],
    stats: { performance: 90, accessibility: 82, bestPractices: 92, seo: 75, pwa: 68 },
  },
  {
    id: "threejs",
    label: "Three.js",
    icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/threedotjs.svg",
    description:
      "I explore 3D experiences and interactive scenes with Three.js.",
    techstack: [
      { name: "3D Scenes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    ],
    stats: { performance: 80, accessibility: 60, bestPractices: 78, seo: 50, pwa: 40 },
  },
];
