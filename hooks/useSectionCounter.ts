'use client'

import { useEffect, useRef, type RefObject } from 'react'
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { countUp } from '@/lib/motion-variants'

/**
 * Contador one-shot `[ NN ]` que arranca en `[ 00 ]` y cuenta hasta `target`
 * (formateado con `padStart(2, '0')`) la primera vez que el elemento referenciado
 * entra completo en viewport. Mismo mecanismo que el eyebrow del Hero, extraído
 * acá para reusar en los labels de sección sin duplicar (bajo acoplamiento).
 *
 * Devuelve el `ref` a colgar del `<motion.span>` y el `MotionValue<string>` ya
 * formateado para renderizar dentro de él. Cleanup del `animate` incluido.
 */
export function useSectionCounter(target: number): {
  ref: RefObject<HTMLSpanElement | null>
  text: MotionValue<string>
} {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 'all' })
  const count = useMotionValue(0)
  const text = useTransform(
    count,
    (value) => `[ ${String(Math.round(value)).padStart(2, '0')} ]`,
  )

  useEffect(() => {
    if (!inView) return
    const { to, transition } = countUp(target)
    const controls = animate(count, to, {
      duration: transition.duration,
      ease: transition.ease,
    })
    return () => controls.stop()
  }, [inView, count, target])

  return { ref, text }
}
