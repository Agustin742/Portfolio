/**
 * Fuente de verdad de la sección Formación (RFC-13).
 *
 * El CONTENIDO (títulos, instituciones y años) es dato real del proyecto.
 * Los `COMPLETAR` / `20XX` son placeholders INTENCIONALES que el usuario llena
 * después — NO inventar títulos, años ni certificaciones (los del template son
 * mockup y no van). El número de cada fila se deriva del índice del array,
 * nunca se escribe a mano.
 */

export interface Education {
  /** id estable (sirve de `key` y de fallback de i18n). */
  id: string
  /** Título del estudio/certificación. Texto directo o key i18n. */
  title: string
  /** Institución emisora. Texto directo o key i18n. */
  institution: string
  /** Rango o año, p.ej. '2021—2026' o '2023'. Formato libre (Space Mono). */
  year: string
  /** Logo opcional de la institución (si existe en /public/imgs/studies/). */
  logoSrc?: string
  /** Alt del logo (obligatorio si hay logoSrc, por accesibilidad). */
  logoAlt?: string
}

export const education: Education[] = [
  // ⚠️ PLACEHOLDER — el usuario completa título y año reales (NO inventar).
  { id: 'utn',         title: 'COMPLETAR', institution: 'Universidad Tecnológica Nacional — UTN', year: '20XX—20XX', logoSrc: '/imgs/studies/utn.png',         logoAlt: 'Logo UTN' },
  { id: 'educacionit', title: 'COMPLETAR', institution: 'Educación IT',                           year: '20XX',      logoSrc: '/imgs/studies/educacionIt.png', logoAlt: 'Logo Educación IT' },
  { id: 'pescar',      title: 'COMPLETAR', institution: 'Fundación Pescar',                        year: '20XX',      logoSrc: '/imgs/studies/pescar.png',      logoAlt: 'Logo Fundación Pescar' },
]
