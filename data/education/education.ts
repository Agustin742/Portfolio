/**
 * Fuente de verdad de la sección Formación (RFC-13).
 *
 * El CONTENIDO (títulos, instituciones y años) es dato REAL del proyecto:
 * 9 capacitaciones reales del usuario, ordenadas de más reciente a más antigua.
 * Ya no hay placeholders `COMPLETAR` / `20XX` — todas las filas son definitivas.
 * El número de cada fila se deriva del índice del array, nunca se escribe a mano.
 */

export interface Education {
  /** id estable (sirve de `key` y de fallback de i18n). */
  id: string;
  /** Título del estudio/certificación. Texto directo o key i18n. */
  title: string;
  /** Institución emisora. Texto directo o key i18n. */
  institution: string;
  /** Rango o año, p.ej. '2021—2026' o '2023'. Formato libre (Space Mono). */
  year: string;
}

export const education: Education[] = [
  {
    id: "utn",
    title: "Tecnicatura Universitaria en Programación",
    institution: "Universidad Tecnológica Nacional — UTN",
    year: "2025—2026",
  },
  {
    id: "integratec",
    title: "Arquitecto de Software",
    institution: "IntegraTEC",
    year: "2026",
  },
  {
    id: "british-b2",
    title: "Inglés B2",
    institution: "British Council",
    year: "2026",
  },
  {
    id: "educacionit",
    title: "Desarrollador Full Stack",
    institution: "Educación IT",
    year: "2025",
  },
  {
    id: "utn-data-ia",
    title: "Ciencia de Datos e IA",
    institution: "Universidad Tecnológica Nacional — UTN",
    year: "2025",
  },
  {
    id: "udemy-sql",
    title: "SQL y Bases de Datos Relacionales",
    institution: "Udemy",
    year: "2025",
  },
  {
    id: "coursera-git",
    title: "Git para Control de Versiones",
    institution: "Coursera",
    year: "2025",
  },
  {
    id: "pescar",
    title: "Habilidades Blandas",
    institution: "Fundación Pescar",
    year: "2025",
  },
  {
    id: "udemy-python",
    title: "Python & Algorithms",
    institution: "Udemy",
    year: "2024",
  },
];
