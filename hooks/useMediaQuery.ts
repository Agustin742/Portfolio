'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * Media query reactivo y SSR-safe vía `useSyncExternalStore` (mismo patrón
 * sancionado que `useMounted`/`useReducedMotion`). Devuelve `false` en el
 * servidor y en el primer render de hidratación, así ninguna animación o gate
 * por viewport arranca antes de saber el tamaño real (evita mismatch de
 * hidratación). Hook compartido para gatear lógica JS por breakpoint sin
 * duplicar la implementación.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === 'undefined') return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    [query],
  )
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
