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

import { TechStackProps } from "@/types/tech";
import { IconBase } from "react-icons";

/**
 * Desafío del case study. Ambos campos son KEYS i18n (namespace `projects`),
 * resueltas por el consumidor con `t(...)`. `headline` reusa la key de
 * `description` (el texto real más largo disponible); `body` es placeholder.
 */
interface CaseStudyChallenge {
  headline: string; // key i18n (reusa `items.<slug>.description`)
  body: string; // key i18n placeholder (`items.<slug>.challengeBody`)
}

/** Métrica de resultado del case study (contenido, no diseño). */
interface CaseStudyResult {
  value: string;
  label: string;
}

/**
 * Case study de un proyecto (consumido por RFC-11 y RFC-16).
 *
 * `built` NO es un array embebido acá: es la KEY i18n del array de bloques
 * `{ title, description }`, que el consumidor lee con `t.raw(built)` en
 * next-intl. Se mantiene como key (y no como array de texto plano) para no
 * hardcodear textos ni duplicar traducciones dentro de este archivo de datos.
 */
interface CaseStudy {
  challenge: CaseStudyChallenge;
  built: string; // key i18n → `t.raw()` devuelve Array<{ title; description }>
  results?: CaseStudyResult[];
}

/**
 * Modelo de un proyecto del portfolio.
 *
 * Campos `title`/`description`/`image`/`year`/`links`/`techStacks` se mantienen
 * para compatibilidad con el consumidor actual (`components/sections/Projects`).
 * El resto (`slug`, `titleKey`, `lede`, `category`, `role`, `client`, `stack`,
 * `gallery`, `caseStudy`) extiende el modelo para los case studies.
 *
 * Los campos de texto guardan KEYS i18n (namespace `projects`), no texto
 * literal, para respetar el bajo acoplamiento: el contenido vive en
 * `messages/*.json`.
 */
export interface Project {
  slug: string;
  title: string; // key i18n (compat: `items.<slug>.title`)
  titleKey: string; // key i18n del título (igual a `title`)
  description: string; // key i18n (compat: `items.<slug>.description`)
  lede: string; // key i18n del subtítulo corto del case study
  category: string; // key i18n compartida (`category`)
  year: number;
  role: string; // key i18n (`items.<slug>.role`)
  client: string; // key i18n (`items.<slug>.client`)
  stack: string[]; // labels planos derivados de `techStacks`
  image: string;
  gallery?: string[]; // imágenes extra (RFC-16). Vacío por ahora.
  reverse?: boolean;
  links: { gitHub?: string; web?: string };
  techStacks: TechStackProps[];
  caseStudy: CaseStudy;
}

/** Alias histórico del tipo (mismo shape) por si algún módulo lo referenciaba. */
export type AlternatingSectionProps = Project;

export const projects: Project[] = [
  {
    slug: "dev-event",
    title: "items.devEvent.title",
    titleKey: "items.devEvent.title",
    description: "items.devEvent.description",
    lede: "items.devEvent.lede",
    category: "category",
    year: 2025,
    role: "items.devEvent.role",
    client: "items.devEvent.client",
    stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind", "Cloudinary"],
    image: "/imgs/projects/devEvent.png",
    gallery: [],
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
    caseStudy: {
      challenge: {
        headline: "items.devEvent.description",
        body: "items.devEvent.challengeBody",
      },
      built: "items.devEvent.built",
    },
  },

  {
    slug: "blog-nest",
    title: "items.blogNest.title",
    titleKey: "items.blogNest.title",
    description: "items.blogNest.description",
    lede: "items.blogNest.lede",
    category: "category",
    year: 2025,
    role: "items.blogNest.role",
    client: "items.blogNest.client",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "TypeORM", "JWT"],
    image: "/imgs/projects/blog-api.png",
    gallery: [],
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
    caseStudy: {
      challenge: {
        headline: "items.blogNest.description",
        body: "items.blogNest.challengeBody",
      },
      built: "items.blogNest.built",
    },
  },

  {
    slug: "sportz",
    title: "items.sportz.title",
    titleKey: "items.sportz.title",
    description: "items.sportz.description",
    lede: "items.sportz.lede",
    category: "category",
    year: 2025,
    role: "items.sportz.role",
    client: "items.sportz.client",
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "WebSockets",
      "Zod",
      "Drizzle ORM",
      "Arcjet",
    ],
    image: "/imgs/projects/sportz.png",
    gallery: [],
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
    caseStudy: {
      challenge: {
        headline: "items.sportz.description",
        body: "items.sportz.challengeBody",
      },
      built: "items.sportz.built",
    },
  },
];

/**
 * Busca un proyecto por su `slug` (RFC-16). Devuelve `undefined` si no existe,
 * para que el consumidor (la page) resuelva el 404 con `notFound()`.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
