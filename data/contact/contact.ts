/**
 * Fuente de verdad de la sección Contacto (RFC-14).
 *
 * El CONTENIDO (email, redes, ubicación) es dato REAL del proyecto — sale del
 * antiguo `Footer.tsx`, NO son los mockup del template. Una red con URL vacía
 * ('') no se renderiza: para sumar X/Twitter u otra, basta agregar la key acá.
 */

export interface ContactInfo {
  /** Email real de contacto (se usa en el link mailto: y como texto visible). */
  email: string
  /** URL absoluta del perfil de LinkedIn. Vacío ('') → no se renderiza. */
  linkedin: string
  /** URL absoluta del perfil de GitHub. Vacío ('') → no se renderiza. */
  github: string
  /** Ubicación (texto corto). */
  location: string
}

export const contactInfo: ContactInfo = {
  email: 'agustintabarcache74@gmail.com',
  linkedin: 'https://www.linkedin.com/in/agustin-tabarcache-42060b2a1',
  github: 'https://github.com/Agustin742',
  location: 'Buenos Aires, AR',
}

/** Redes derivadas del objeto: solo las que tienen URL no vacía se renderizan. */
export const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: contactInfo.linkedin },
  { id: 'github', label: 'GitHub', href: contactInfo.github },
].filter((s) => s.href.length > 0)
