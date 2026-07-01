'use client'

import { useRef, type RefObject } from 'react'
import { useInView, type UseInViewOptions } from 'framer-motion'

/**
 * Detecta cuándo un elemento entra al viewport. Solo reporta `inView`;
 * no dispara animaciones (eso queda para el componente consumidor).
 */
export function useScrollReveal(options?: { once?: boolean; margin?: string }): {
  ref: RefObject<HTMLDivElement | null>
  inView: boolean
} {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: options?.once ?? true,
    // `margin` está tipado como template-literal (MarginType) en framer-motion;
    // el cast permite recibir un string genérico desde las opciones.
    margin: (options?.margin ?? '0px 0px -80px 0px') as UseInViewOptions['margin'],
  })
  return { ref, inView }
}
