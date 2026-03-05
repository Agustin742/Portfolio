import {
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
} from "react-icons/si";
import { FaNodeJs, FaReact } from "react-icons/fa";

import { TechStackProps } from "@/components/ui/TechStack";

interface AlternatingSectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  links: { gitHub?: string; web?: string };
  techStacks: TechStackProps[];
}

export const projects: AlternatingSectionProps[] = [
  {
    title: "projects.items.wasifix.title",
    description: "projects.items.wasifix.description",
    image: "/imgs/project.png",
    links: {
      gitHub: "https://github.com/",
      web: "https://github.com/",
    },
    techStacks: [
      { label: "React", icon: FaReact, color: "#61DAFB" },
      { label: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
      { label: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },

  {
    title: "projects.items.taskflow.title",
    description: "projects.items.taskflow.description",
    image: "/imgs/project.png",
    links: {
      gitHub: "https://github.com/",
      web: "https://github.com/",
    },
    techStacks: [
      { label: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { label: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { label: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },

  {
    title: "projects.items.devconnect.title",
    description: "projects.items.devconnect.description",
    image: "/imgs/project.png",
    links: {
      gitHub: "https://github.com/",
      web: "https://github.com/",
    },
    techStacks: [
      { label: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { label: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { label: "Node.js", icon: FaNodeJs, color: "#339933" },
    ],
  },
];
