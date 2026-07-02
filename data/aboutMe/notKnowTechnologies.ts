import { TechItemProps } from "@/types/tech";
import { FaJava } from "react-icons/fa";
import { SiPostgresql, SiSpringboot } from "react-icons/si";

export const notKnowTechnologies: TechItemProps[] = [
    { icon: FaJava, label: "Java", color: "#007396" },
    { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
    { icon: SiSpringboot, label: "SpringBoot", color: "#6DB33F" },
  ];