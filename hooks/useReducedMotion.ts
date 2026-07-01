'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

const getSnapshot = () => window.matchMedia(QUERY).matches
const getServerSnapshot = () => false

/**
 * `true` si el usuario prefiere movimiento reducido. A diferencia del helper
 * `prefersReducedMotion()` (lectura puntual para código imperativo como
 * `useScramble`), este hook se suscribe al media query vía
 * `useSyncExternalStore`: reacciona si la preferencia cambia en runtime y no
 * usa setState en un effect (sin warning de React 19). Devuelve `false` en SSR.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
