import { useContext } from 'react'
import { PageWipeContext } from '@/components/ui/PageWipe'

/**
 * Fachada liviana sobre `PageWipeContext`: devuelve `navigate(href)` que
 * dispara la cortina de transición antes de cambiar de ruta. Debe usarse
 * dentro de `PageWipeProvider`.
 */
export function usePageNavigate() {
  const ctx = useContext(PageWipeContext)
  if (!ctx) {
    throw new Error('usePageNavigate debe usarse dentro de PageWipeProvider')
  }
  return ctx.navigate
}
