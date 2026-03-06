import { 
  SiExpress, 
  SiMongodb, 
  SiNestjs,
  SiNextdotjs, 
  SiTailwindcss 
} from "react-icons/si";

import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGit,
  FaJsSquare,
} from "react-icons/fa";

import { TechItemProps } from "@/components/ui";

export const knowTechnologies: TechItemProps[] = [
    { icon: FaReact, label: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, label: "Next.js", color: "#000000" },
    { icon: SiNestjs, label: "NestJS", color: "#E0234E" },
    { icon: FaNodeJs, label: "Node.js", color: "#339933" },
    { icon: SiExpress, label: "Express", color: "#000000" },
    { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
    { icon: FaJsSquare, label: "JavaScript", color: "#F7DF1E" },
    { icon: FaHtml5, label: "HTML", color: "#E34F26" },
    { icon: FaCss3Alt, label: "CSS", color: "#1572B6" },
    { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
    { icon: FaGit, label: "Git", color: "#F05032" },
  ];