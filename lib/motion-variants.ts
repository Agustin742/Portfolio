import type { Variants } from 'framer-motion'

/**
 * Easings de firma tokenizados (source of truth para Framer Motion, RFC-06→16).
 * Equivalen a los tokens CSS `--ease-signature` / `--ease-wipe` de globals.css.
 * Framer Motion necesita arrays numéricos, no CSS vars.
 */
const EASE_SIGNATURE = [0.22, 1, 0.36, 1] as const
export const EASE_WIPE = [0.7, 0, 0.2, 1] as const

/**
 * Detecta si el usuario prefiere movimiento reducido.
 * Resuelve `false` en SSR (no hay `window`). Centralizado acá para que
 * los hooks (useScramble/useGlitch) lo reutilicen sin duplicar la lógica.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const maskReveal: Variants = {
  hidden: { y: '115%' },
  visible: {
    y: 0,
    transition: { duration: 1, ease: [...EASE_SIGNATURE] },
  },
}

export const wordStagger: Variants = {
  hidden: { opacity: 0, y: '0.9em' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [...EASE_SIGNATURE], delay: i * 0.026 },
  }),
}

/**
 * Helper para contadores numéricos. Consumo futuro con useMotionValue + animate.
 * Si el usuario prefiere movimiento reducido, la duración se fuerza a 0 (salta al valor final).
 */
export function countUp(
  target: number,
  duration = 0.75,
): {
  from: number
  to: number
  transition: { duration: number; ease: readonly [number, number, number, number] }
} {
  return {
    from: 0,
    to: target,
    transition: {
      duration: prefersReducedMotion() ? 0 : duration,
      ease: [...EASE_SIGNATURE],
    },
  }
}

type MotionTransition = { duration?: number; delay?: number; [key: string]: unknown }
type VariantState = { transition?: MotionTransition; [key: string]: unknown }
type VariantFn = (i: number) => VariantState

function reduceTransition(state: VariantState): VariantState {
  return {
    ...state,
    transition: { ...(state.transition ?? {}), duration: 0, delay: 0 },
  }
}

/**
 * Fuerza `duration: 0` (y `delay: 0`) en cada estado de un set de variantes.
 * Soporta estados objeto (maskReveal) y estados función/custom
 * (wordStagger). Los componentes lo combinan con el
 * `useReducedMotion()` nativo de framer-motion.
 */
export function withReducedMotion<T extends Record<string, unknown>>(variants: T): T {
  const result: Record<string, unknown> = {}
  for (const key in variants) {
    const value = variants[key]
    if (typeof value === 'function') {
      const fn = value as VariantFn
      result[key] = (i: number) => reduceTransition(fn(i))
    } else if (value && typeof value === 'object') {
      result[key] = reduceTransition(value as VariantState)
    } else {
      result[key] = value
    }
  }
  return result as T
}
