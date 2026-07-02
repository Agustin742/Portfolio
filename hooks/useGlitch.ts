'use client'

import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { prefersReducedMotion } from '@/lib/motion-variants'

// Colores del burst (template glitchBurst, Portfolio.dc.html:795). El ámbar
// coincide con --color-accent; el cyan es un color intrínseco del efecto
// glitch del template — no existe token CSS para él (mismo criterio que las
// constantes RGB de AsciiCanvasImpl).
const ORANGE = '#EE8033'
const CYAN = '#39d6e6'

// Cadencia del jitter: el template re-randomiza sombra y posición cada 42ms.
const TICK_MS = 42
// Duración por defecto del burst below-fold del template (línea 1005: 480ms).
const DEFAULT_DURATION_MS = 480

/**
 * Dispara un burst de glitch animado sobre el elemento referenciado.
 *
 * Réplica del `glitchBurst` del template (Portfolio.dc.html:791–804): un loop
 * con `setInterval` cada 42ms que en cada tick re-randomiza la text-shadow
 * (ámbar + cyan) y un translateX de ±2px, generando el temblor característico.
 * Al completar N ticks restaura la sombra y el transform base del elemento.
 *
 * Respeta `prefers-reduced-motion`: si está activo, `trigger()` es no-op.
 */
export function useGlitch(): {
  ref: RefObject<HTMLElement | null>
  trigger: (duration?: number) => void
} {
  const ref = useRef<HTMLElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  // Guarda contra re-entrada mientras un burst está activo (template `el._gl`).
  const activeRef = useRef(false)

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current)
    }
  }, [])

  const trigger = useCallback((duration: number = DEFAULT_DURATION_MS) => {
    const el = ref.current
    if (!el || prefersReducedMotion() || activeRef.current) return

    activeRef.current = true

    // Preservar el transform previo del elemento y restaurarlo al final.
    const base = el.style.transform || ''
    const ticks = Math.max(6, Math.round(duration / TICK_MS))
    let tick = 0
    const rnd = (): string => (Math.random() * 6 - 3).toFixed(1)

    intervalRef.current = setInterval(() => {
      el.style.textShadow = `${rnd()}px 0 ${ORANGE}, ${rnd()}px 0 ${CYAN}`
      el.style.transform = `${base} translateX(${(Math.random() * 4 - 2).toFixed(1)}px)`
      if (++tick >= ticks) {
        if (intervalRef.current !== null) clearInterval(intervalRef.current)
        intervalRef.current = null
        el.style.textShadow = ''
        el.style.transform = base
        activeRef.current = false
      }
    }, TICK_MS)
  }, [])

  return { ref, trigger }
}
