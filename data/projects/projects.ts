import {
  SiCloudinary,
  SiDrizzle,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiShieldsdotio,
  SiTailwindcss,
  SiTypeorm,
  SiTypescript,
  SiZod,
} from "react-icons/si";

import { TechStackProps } from "@/components/ui/TechStack";
import { IconBase } from "react-icons";

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
    title: "projects.items.devEvent.title",
    description: "projects.items.devEvent.description",
    image: "/imgs/projects/devEvent.png",
    links: {
      gitHub: "https://github.com/Agustin742/Practica-Dev-Event",
      web: "https://practica-dev-event.vercel.app/",
    },
    techStacks: [
      { label: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { label: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { label: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
      { label: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
    ],
  },

  {
    title: "projects.items.blogNest.title",
    description: "projects.items.blogNest.description",
    image: "/imgs/projects/blog-api.png",
    links: {
      gitHub: "https://github.com/Agustin742/Blog-nest",
      web: "",
    },
    techStacks: [
      { label: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { label: "TypeORM", icon: SiTypeorm, color: "#FF6C37" },
      { label: "JWT", icon: SiJsonwebtokens, color: "#000000" },
    ],
  },

  {
    title: "projects.items.sportz.title",
    description: "projects.items.sportz.description",
    image: "/imgs/projects/sportz.png",
    links: {
      gitHub: "https://github.com/Agustin742/sportz-websockets",
    },
    techStacks: [
      { label: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { label: "Express", icon: SiExpress, color: "#000000" },
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { label: "WebSockets", icon: IconBase, color: "#010101" },
      { label: "Zod", icon: SiZod, color: "#3E67B1" },
      { label: "Drizzle ORM", icon: SiDrizzle, color: "#C5F74F" },
      { label: "Arcjet", icon: SiShieldsdotio, color: "#6B7280" },
    ],
  },
];
