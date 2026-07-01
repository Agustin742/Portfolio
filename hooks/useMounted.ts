'use client'

import { useSyncExternalStore } from 'react'

// El store nunca cambia después de montar: no hay a qué suscribirse.
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

/**
 * `true` una vez que el componente montó en el cliente, `false` en SSR y en el
 * primer render de hidratación. Reemplaza el patrón `useState(false)` +
 * `useEffect(() => setMounted(true))`, que en React 19 dispara el warning
 * "Calling setState synchronously within an effect". `useSyncExternalStore` es
 * el primitivo sancionado para leer estado que difiere entre server y cliente:
 * la transición a `true` la maneja React, sin setState en un effect.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  )
}
