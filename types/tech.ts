import type { IconType } from 'react-icons'

/**
 * Forma común de un item de tecnología con ícono (label + ícono + color).
 *
 * Portado desde `components/ui/TechStack.tsx` / `components/ui/TechItem.tsx`
 * (eliminados en RFC-12) para desacoplar el TIPO del componente visual: los
 * datos (`data/projects/projects.ts`, `data/aboutMe/*`) solo dependen de este
 * módulo de tipos, no de un componente de UI.
 */
export interface TechStackProps {
  label: string
  icon: IconType
  color: string
}

/** Alias histórico (mismo shape) usado por `data/aboutMe/*`. */
export type TechItemProps = TechStackProps
