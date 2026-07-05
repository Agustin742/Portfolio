import {
  SiCloudinary,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypeorm,
  SiTypescript,
  SiVite,
  SiZod,
} from "react-icons/si";

import { TechStackProps } from "@/types/tech";

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
  category: string; // key i18n propia por proyecto (`items.<slug>.category`)
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
    slug: "bugnet",
    title: "items.bugnet.title",
    titleKey: "items.bugnet.title",
    description: "items.bugnet.description",
    lede: "items.bugnet.lede",
    category: "items.bugnet.category",
    year: 2025,
    role: "items.bugnet.role",
    client: "items.bugnet.client",
    stack: ["React", "TypeScript", "Vite", "Zod", "Zustand", "Tailwind"],
    image: "/imgs/projects/bugnet/hero.png",
    gallery: [
      "/imgs/projects/bugnet/gallery1.png",
      "/imgs/projects/bugnet/gallery2.png"
    ],
    links: {
      gitHub:
        "https://github.com/Agustin742/proyecto-2-Generador-de-Reportes-de-bugs",
      web: "https://bugnet-report-generator.vercel.app/",
    },
    techStacks: [
      { label: "React", icon: SiReact, color: "#61DAFB" },
      { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { label: "Vite", icon: SiVite, color: "#646CFF" },
      { label: "Zod", icon: SiZod, color: "#3E67B1" },
      { label: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
    ],
    caseStudy: {
      challenge: {
        headline: "items.bugnet.description",
        body: "items.bugnet.challengeBody",
      },
      built: "items.bugnet.built",
    },
  },

  {
    slug: "catalog-store",
    title: "items.catalogStore.title",
    titleKey: "items.catalogStore.title",
    description: "items.catalogStore.description",
    lede: "items.catalogStore.lede",
    category: "items.catalogStore.category",
    year: 2025,
    role: "items.catalogStore.role",
    client: "items.catalogStore.client",
    stack: ["NestJS", "Prisma", "PostgreSQL", "JWT", "Cloudinary", "Resend"],
    image: "/imgs/projects/catalog/hero.png",
    gallery: [
      "/imgs/projects/catalog/gallery1.png",
      "/imgs/projects/catalog/gallery2.png",
    ],
    links: {gitHub: "https://github.com/Agustin742/Catalog-Store"},
    techStacks: [
      { label: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { label: "Prisma", icon: SiPrisma, color: "#2D3748" },
      { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { label: "JWT", icon: SiJsonwebtokens, color: "#000000" },
      { label: "Cloudinary", icon: SiCloudinary, color: "#3448C5" },
    ],
    caseStudy: {
      challenge: {
        headline: "items.catalogStore.description",
        body: "items.catalogStore.challengeBody",
      },
      built: "items.catalogStore.built",
    },
  },

  {
    slug: "quest",
    title: "items.quest.title",
    titleKey: "items.quest.title",
    description: "items.quest.description",
    lede: "items.quest.lede",
    category: "items.quest.category",
    year: 2025,
    role: "items.quest.role",
    client: "items.quest.client",
    stack: ["HTML5", "CSS3", "JavaScript", "localStorage"],
    image: "/imgs/projects/quest/hero.png",
    gallery: [
      "/imgs/projects/quest/gallery1.png",
      "/imgs/projects/quest/gallery2.png"
    ],
    links: {
      gitHub:
        "https://github.com/MatucoRobles/PROY_1-ANTIPROCASTINATION-QUEST",
      web: "https://antiprocastinationquest.netlify.app/",
    },
    techStacks: [
      { label: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { label: "CSS3", icon: SiCss, color: "#1572B6" },
      { label: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    ],
    caseStudy: {
      challenge: {
        headline: "items.quest.description",
        body: "items.quest.challengeBody",
      },
      built: "items.quest.built",
    },
  },

  {
    slug: "dev-event",
    title: "items.devEvent.title",
    titleKey: "items.devEvent.title",
    description: "items.devEvent.description",
    lede: "items.devEvent.lede",
    category: "items.devEvent.category",
    year: 2025,
    role: "items.devEvent.role",
    client: "items.devEvent.client",
    stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind", "Cloudinary"],
    image: "/imgs/projects/devEvent/hero.png",
    gallery: [
      "/imgs/projects/devEvent/gallery1.png",
      ],
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
    category: "items.blogNest.category",
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
];

/**
 * Busca un proyecto por su `slug` (RFC-16). Devuelve `undefined` si no existe,
 * para que el consumidor (la page) resuelva el 404 con `notFound()`.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
