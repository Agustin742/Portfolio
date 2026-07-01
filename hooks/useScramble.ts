'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion-variants'

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ#%*/<>'
const TICK_MS = 45
// Cantidad de letras reveladas por tick (0.5 = una letra nueva cada 2 ticks).
const REVEAL_PER_TICK = 0.5

/**
 * Efecto scramble/glitch de texto. `trigger()` revela `finalText` letra por
 * letra de izquierda a derecha; el resto de las posiciones muestran caracteres
 * aleatorios en cada frame. Respeta `prefers-reduced-motion` (verificado en
 * runtime dentro de `trigger`).
 */
export function useScramble(finalText: string): { text: string; trigger: () => void } {
  const [text, setText] = useState(finalText)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => clear, [clear])

  const trigger = useCallback(() => {
    clear()

    if (prefersReducedMotion()) {
      setText(finalText)
      return
    }

    let iteration = 0
    intervalRef.current = setInterval(() => {
      const revealCount = Math.floor(iteration)
      const next = finalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < revealCount) return finalText[index]
          return ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
        })
        .join('')
      setText(next)

      if (revealCount >= finalText.length) {
        clear()
        setText(finalText)
        return
      }
      iteration += REVEAL_PER_TICK
    }, TICK_MS)
  }, [clear, finalText])

  return { text, trigger }
}
