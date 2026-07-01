'use client'

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { usePathname, useRouter } from '@/i18n/navigation'
import { EASE_WIPE, prefersReducedMotion } from '@/lib/motion-variants'

type Phase = 'idle' | 'entering' | 'exiting'

interface PageWipeContextValue {
  navigate: (href: string) => void
}

/**
 * Context de la cortina de transición. El hook `usePageNavigate` lo consume.
 * Se exporta el context (no un componente suelto) para evitar montar el
 * panel por duplicado: solo `PageWipeProvider` lo renderiza.
 */
export const PageWipeContext = createContext<PageWipeContextValue | null>(null)

const ENTER_DURATION = 0.55
const EXIT_DURATION = 0.68
/** La URL cambia cuando la cortina ya cubre la pantalla (fin de la entrada). */
const NAVIGATE_DELAY_MS = 560
/** Fallback por si `onAnimationComplete` no dispara (tab en background, etc.). */
const EXIT_FALLBACK_MS = 680

export function PageWipeProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const pathname = usePathname()
  const router = useRouter()

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Poda el timer del array una vez disparado, para que no se acumulen en
  // navegaciones repetidas (el cleanup de unmount igual limpia lo que quede).
  const runTimer = useCallback((cb: () => void, ms: number) => {
    const t = setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== t)
      cb()
    }, ms)
    timers.current.push(t)
  }, [])

  const navigate = useCallback(
    (href: string) => {
      // prefers-reduced-motion: navegación directa, sin animar la cortina.
      if (prefersReducedMotion()) {
        router.push(href)
        return
      }
      setPhase('entering')
      runTimer(() => router.push(href), NAVIGATE_DELAY_MS)
    },
    [router, runTimer],
  )

  // La ruta cambió: si veníamos de una navegación con cortina ('entering'),
  // disparamos la salida. Si la navegación no pasó por `navigate()`, phase
  // sigue 'idle' y no se anima nada.
  useEffect(() => {
    setPhase((current) => (current === 'entering' ? 'exiting' : current))
  }, [pathname])

  // Fallback de cierre de la salida por si el evento de animación no llega.
  useEffect(() => {
    if (phase !== 'exiting') return
    const t = setTimeout(() => {
      timers.current = timers.current.filter((x) => x !== t)
      setPhase('idle')
    }, EXIT_FALLBACK_MS)
    timers.current.push(t)
    return () => clearTimeout(t)
  }, [phase])

  // Limpieza de todos los timers pendientes al desmontar (evita leaks).
  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach(clearTimeout)
    }
  }, [])

  const value = useMemo<PageWipeContextValue>(() => ({ navigate }), [navigate])

  const targetX =
    phase === 'entering' ? '0%' : phase === 'exiting' ? '-100%' : '100%'

  const transition: Transition =
    phase === 'idle'
      ? { duration: 0 }
      : {
          duration: phase === 'entering' ? ENTER_DURATION : EXIT_DURATION,
          // El cast a la tupla de bézier es solo en el punto de uso; la
          // constante exportada sigue siendo la fuente de verdad (readonly).
          ease: [...EASE_WIPE] as [number, number, number, number],
        }

  return (
    <PageWipeContext.Provider value={value}>
      {children}
      <motion.div
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 z-9000 flex items-center justify-center bg-accent"
        initial={{ x: '100%' }}
        animate={{ x: targetX }}
        transition={transition}
        onAnimationComplete={() => {
          if (phase === 'exiting') setPhase('idle')
        }}
      >
        <span className="font-mono font-bold text-bg">
          AGUSTÍN TABARCACHE.DEV
        </span>
      </motion.div>
    </PageWipeContext.Provider>
  )
}
