/**
 * Fuente de verdad de la sección Stack (RFC-12).
 *
 * El CONTENIDO (lista de techs, categorías y roles) es dato real del proyecto,
 * NO la lista mockup del template. Los contadores del rail se derivan de este
 * array con `countByCategory`, nunca se escriben a mano.
 */

/** Categorías del skillwall (orden = numeración 01–04 del rail). */
export type Category = 'frontend' | 'backend' | 'datos' | 'tooling'

/**
 * Tier tipográfico de cada tech (decisión estética, redistribuible):
 * 1 = grande (~70px), 2 = medio (~46px), 3 = chico (~34px).
 */
export type Tier = 1 | 2 | 3

export interface Tech {
  /** Nombre visible en el skillwall. */
  name: string
  /** Categoría para el aislamiento por hover del rail. */
  category: Category
  /** Tamaño tipográfico (ver `Tier`). */
  tier: Tier
  /** Rol corto que aparece en el `<sup>` al hacer hover. */
  role: string
}

/** Orden de las categorías en el rail (define su numeración 01–04). */
export const CATEGORY_ORDER: Category[] = [
  'frontend',
  'backend',
  'datos',
  'tooling',
]

/** 19 techs reales del proyecto (RFC-12 §6). No modificar lista ni categorías. */
export const techs: Tech[] = [
  { name: 'Next.js', category: 'frontend', tier: 1, role: 'SSR' },
  { name: 'Vercel', category: 'tooling', tier: 3, role: 'DEPLOY' },
  { name: 'REST', category: 'backend', tier: 2, role: 'API' },
  { name: 'Nest.js', category: 'backend', tier: 1, role: 'API' },
  { name: 'TypeScript', category: 'frontend', tier: 2, role: 'TYPES' },
  { name: 'Harness Engineering', category: 'tooling', tier: 3, role: 'AGENTS' },
  { name: 'React', category: 'frontend', tier: 1, role: 'UI' },
  { name: 'MongoDB', category: 'datos', tier: 1, role: 'NOSQL' },
  { name: 'Node.js', category: 'backend', tier: 1, role: 'RUNTIME' },
  { name: 'Express', category: 'backend', tier: 2, role: 'HTTP' },
  { name: 'Figma', category: 'tooling', tier: 3, role: 'DESIGN' },
  { name: 'PostgreSQL', category: 'datos', tier: 2, role: 'SQL' },
  { name: 'Tailwind', category: 'frontend', tier: 2, role: 'CSS' },
  { name: 'Git', category: 'tooling', tier: 3, role: 'VCS' },
  { name: 'HTML', category: 'frontend', tier: 3, role: 'MARKUP' },
  { name: 'Prisma', category: 'datos', tier: 2, role: 'ORM' },
  { name: 'JavaScript', category: 'frontend', tier: 3, role: 'LANG' },
  { name: 'Claude', category: 'tooling', tier: 2, role: 'AI' },
  { name: 'CSS', category: 'frontend', tier: 3, role: 'STYLES' },
  { name: 'CSS', category: 'frontend', tier: 3, role: 'STYLES' },
]

/** Cantidad real de techs por categoría (para los contadores del rail). */
export function countByCategory(category: Category): number {
  return techs.filter((tech) => tech.category === category).length
}
