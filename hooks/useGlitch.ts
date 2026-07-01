'use client'

import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { prefersReducedMotion } from '@/lib/motion-variants'

const GLITCH_DURATION = 460
const GLITCH_TEXT_SHADOW = '-2px 0 #ff003c, 2px 0 #00e5ff'
const GLITCH_TRANSFORM = 'translateX(2px)'

/**
 * Dispara un burst de glitch sobre el elemento referenciado.
 *
 * Vía elegida: manipulación directa de `element.style` (text-shadow + translateX)
 * con un `setTimeout` que revierte a los valores originales tras ~460ms. Se optó
 * por style inline en vez de una clase CSS temporal porque este RFC es solo
 * infraestructura y no introduce estilos globales; el efecto queda autocontenido.
 *
 * Respeta `prefers-reduced-motion`: si está activo, `trigger()` es no-op.
 */
export function useGlitch(): { ref: RefObject<HTMLElement | null>; trigger: () => void } {
  const ref = useRef<HTMLElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    }
  }, [])

  const trigger = useCallback(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)

    const originalTextShadow = el.style.textShadow
    const originalTransform = el.style.transform

    el.style.textShadow = GLITCH_TEXT_SHADOW
    el.style.transform = GLITCH_TRANSFORM

    timeoutRef.current = setTimeout(() => {
      el.style.textShadow = originalTextShadow
      el.style.transform = originalTransform
      timeoutRef.current = null
    }, GLITCH_DURATION)
  }, [])

  return { ref, trigger }
}
