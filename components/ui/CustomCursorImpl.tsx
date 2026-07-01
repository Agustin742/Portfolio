'use client'

import { useEffect } from 'react'

// --- z-index: el dot va ENCIMA del ring (capa superior) para que el punto
// ámbar quede siempre visible sobre el anillo que lo persigue con lag ---
const RING_Z_INDEX = 99998 // capa inferior
const DOT_Z_INDEX = 99999 // capa superior

// --- Lerp del ring (seguimiento suave hacia la última coord del mouse) ---
const RING_LERP = 0.18 // factor de seguimiento: ring += (target - ring) * RING_LERP
const SETTLED_EPS = 0.1 // umbral para considerar el ring "asentado" y detener el rAF

// --- Curva de easing compartida por las transiciones de tamaño ---
const EASING = 'cubic-bezier(.22,1,.36,1)'
const SIZE_TRANSITION_MS = '.25s'

// --- Ring (anillo) ---
const RING_BASE_SIZE = 34 // px
const RING_HOVER_SIZE = 54 // px
const RING_BORDER_WIDTH = '1.5px'
const RING_BORDER_BASE = 'rgba(238,128,51,0.45)'
const RING_BORDER_HOVER = 'rgba(238,128,51,0.9)'

// --- Dot (punto) ---
const DOT_BASE_SIZE = 11 // px
const DOT_HOVER_SIZE = 6 // px
const DOT_COLOR = '#EE8033'

const HOVER_SELECTOR = '[data-cursor]'

const CustomCursorImpl = () => {
  useEffect(() => {
    // Gate: solo en dispositivos con puntero fino (mouse). En touch no
    // creamos nada, no tocamos body.cursor y el cleanup es no-op.
    if (!window.matchMedia('(pointer:fine)').matches) return

    // --- Crear los divs imperativamente (viven fuera de React) ---
    const ringEl = document.createElement('div')
    ringEl.setAttribute('aria-hidden', 'true')
    ringEl.style.cssText = `position:fixed;top:0;left:0;width:${RING_BASE_SIZE}px;height:${RING_BASE_SIZE}px;border-radius:50%;border:${RING_BORDER_WIDTH} solid ${RING_BORDER_BASE};pointer-events:none;z-index:${RING_Z_INDEX};transition:width ${SIZE_TRANSITION_MS} ${EASING}, height ${SIZE_TRANSITION_MS} ${EASING}, border-color ${SIZE_TRANSITION_MS} ${EASING};`

    const dotEl = document.createElement('div')
    dotEl.setAttribute('aria-hidden', 'true')
    dotEl.style.cssText = `position:fixed;top:0;left:0;width:${DOT_BASE_SIZE}px;height:${DOT_BASE_SIZE}px;border-radius:50%;background:${DOT_COLOR};pointer-events:none;z-index:${DOT_Z_INDEX};transition:width ${SIZE_TRANSITION_MS} ${EASING}, height ${SIZE_TRANSITION_MS} ${EASING};`

    document.body.appendChild(ringEl)
    document.body.appendChild(dotEl)

    // Guardar el cursor previo del body para restaurarlo en el cleanup
    const prevCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    // --- Estado del lerp del ring ---
    let ringX = 0
    let ringY = 0
    let targetX = 0
    let targetY = 0
    let ringInitialized = false // el ring arranca en la primera coord del mouse (sin salto desde 0,0)
    let animationId: number | null = null
    // Elemento [data-cursor] actualmente bajo hover (para evitar toggles falsos)
    let hoverEl: Element | null = null

    const setRingPosition = () => {
      ringEl.style.transform = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`
    }

    const setDotPosition = (x: number, y: number) => {
      dotEl.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`
    }

    // Loop del ring: corre solo mientras el ring no se asentó (kick/settle)
    const step = () => {
      ringX += (targetX - ringX) * RING_LERP
      ringY += (targetY - ringY) * RING_LERP
      setRingPosition()

      if (
        Math.abs(targetX - ringX) < SETTLED_EPS &&
        Math.abs(targetY - ringY) < SETTLED_EPS
      ) {
        // Snap final y detener el loop
        ringX = targetX
        ringY = targetY
        setRingPosition()
        animationId = null
        return
      }

      animationId = requestAnimationFrame(step)
    }

    const kick = () => {
      if (animationId === null) {
        animationId = requestAnimationFrame(step)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Dot: posición inmediata (sin lerp)
      setDotPosition(e.clientX, e.clientY)
      // Ring: actualizar target y arrancar el loop si estaba detenido
      targetX = e.clientX
      targetY = e.clientY
      // Primera coord: colocar el ring ahí directamente (evita animar desde 0,0)
      if (!ringInitialized) {
        ringInitialized = true
        ringX = targetX
        ringY = targetY
        setRingPosition()
      }
      // Restaurar visibilidad si venía de un mouseleave
      ringEl.style.opacity = '1'
      dotEl.style.opacity = '1'
      kick()
    }

    const handleMouseLeave = () => {
      ringEl.style.opacity = '0'
      dotEl.style.opacity = '0'
    }

    const applyHover = () => {
      ringEl.style.width = `${RING_HOVER_SIZE}px`
      ringEl.style.height = `${RING_HOVER_SIZE}px`
      ringEl.style.borderColor = RING_BORDER_HOVER
      dotEl.style.width = `${DOT_HOVER_SIZE}px`
      dotEl.style.height = `${DOT_HOVER_SIZE}px`
    }

    const clearHover = () => {
      ringEl.style.width = `${RING_BASE_SIZE}px`
      ringEl.style.height = `${RING_BASE_SIZE}px`
      ringEl.style.borderColor = RING_BORDER_BASE
      dotEl.style.width = `${DOT_BASE_SIZE}px`
      dotEl.style.height = `${DOT_BASE_SIZE}px`
    }

    // Detección de hover delegada: mouseover/mouseout burbujean, por lo que
    // cubren elementos [data-cursor] presentes y futuros sin re-atachear.
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest(HOVER_SELECTOR)
      if (target && target !== hoverEl) {
        hoverEl = target
        applyHover()
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (!hoverEl) return
      const related = e.relatedTarget as Node | null
      // Evitar toggles falsos entre hijos anidados del mismo [data-cursor]
      if (related && hoverEl.contains(related)) return
      hoverEl = null
      clearHover()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      ringEl.remove()
      dotEl.remove()
      document.body.style.cursor = prevCursor
    }
  }, [])

  return null
}

export default CustomCursorImpl
