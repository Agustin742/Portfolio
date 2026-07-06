import { createContext } from 'react'

export interface PageWipeContextValue {
  navigate: (href: string) => void
}

/**
 * Context de la cortina de transición. El hook `usePageNavigate` lo consume.
 * Vive en un módulo aparte (no en PageWipe.tsx) para que ese archivo solo
 * exporte componentes y Fast Refresh pueda preservar su estado.
 */
export const PageWipeContext = createContext<PageWipeContextValue | null>(null)
