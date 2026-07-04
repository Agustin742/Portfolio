'use client'

import { useEffect } from 'react'

// --- z-index: el dot va ENCIMA del ring/bracket (capa superior) para que el
// punto ámbar quede siempre visible sobre el anillo/corchetes que lo persiguen ---
const RING_Z_INDEX = 99998 // capa inferior (ring y bracket comparten esta capa)
const DOT_Z_INDEX = 99999 // capa superior

// --- Lerp del ring/bracket (seguimiento suave hacia la última coord del mouse) ---
const RING_LERP = 0.18 // factor de seguimiento: pos += (target - pos) * RING_LERP
const SETTLED_EPS = 0.1 // umbral para considerar el ring "asentado" y detener el rAF

// --- Curva de easing compartida por las transiciones (crossfade ring<->bracket) ---
const EASING = 'cubic-bezier(.22,1,.36,1)'
const SIZE_TRANSITION_MS = '.25s'

// --- Ring (anillo, estado BASE) ---
const RING_BASE_SIZE = 34 // px
const RING_BORDER_WIDTH = '1.5px'
const RING_BORDER_BASE = 'rgba(238,128,51,0.45)'

// --- Bracket (corchetes de esquina, estado POINTER) ---
const BRACKET_SIZE = 44 // px — lado del cuadrado que encuadra el dot (S)
const BRACKET_ARM = 11 // px — brazo de cada esquina (A)
const BRACKET_THICKNESS = 1.5 // px — grosor de línea (T)
const BRACKET_COLOR = 'rgba(238,128,51,0.9)'

// --- Dot (punto) ---
const DOT_BASE_SIZE = 11 // px
const DOT_HOVER_SIZE = 7 // px — se achica levemente para quedar encuadrado por los corchetes
const DOT_COLOR = '#EE8033'

// Interactivos reales de la página (no solo [data-cursor]): así el estado
// pointer se activa sobre cualquier elemento accionable sin marcarlo a mano.
const HOVER_SELECTOR =
  'a[href], button, [role="button"], input, select, textarea, label, summary, [data-cursor]'

const CustomCursorImpl = () => {
  useEffect(() => {
    // Gate: solo en dispositivos con puntero fino (mouse). En touch no
    // creamos nada, no inyectamos estilos y el cleanup es no-op.
    if (!window.matchMedia('(pointer:fine)').matches) return

    // --- Ocultar el cursor nativo en TODA la página ---
    // body{cursor:none} NO vence al UA stylesheet (los <a> computan
    // cursor:pointer, los <button> cursor:default), por eso se filtra el
    // cursor nativo encima del custom. Una regla global con !important sí
    // vence al UA y a Tailwind. Este <style> es la única fuente de verdad.
    const styleEl = document.createElement('style')
    styleEl.textContent = `*, *::before, *::after { cursor: none !important; }`
    document.head.appendChild(styleEl)

    // --- Ring (estado BASE): anillo circular fino ---
    const ringEl = document.createElement('div')
    ringEl.setAttribute('aria-hidden', 'true')
    ringEl.style.cssText = `position:fixed;top:0;left:0;width:${RING_BASE_SIZE}px;height:${RING_BASE_SIZE}px;border-radius:50%;border:${RING_BORDER_WIDTH} solid ${RING_BORDER_BASE};pointer-events:none;z-index:${RING_Z_INDEX};opacity:1;transition:opacity ${SIZE_TRANSITION_MS} ${EASING};`

    // --- Bracket (estado POINTER): 4 corchetes de esquina ---
    // Wrapper: se encarga SOLO de la posición (transform actualizado por rAF,
    // sin transición) para no interferir con el scale del inner.
    const bracketWrap = document.createElement('div')
    bracketWrap.setAttribute('aria-hidden', 'true')
    bracketWrap.style.cssText = `position:fixed;top:0;left:0;width:${BRACKET_SIZE}px;height:${BRACKET_SIZE}px;pointer-events:none;z-index:${RING_Z_INDEX};`

    // Inner: los corchetes vía 8 gradientes (2 por esquina) + fade/scale
    // controlados por opacity/transform con la curva de easing compartida.
    const bracketEl = document.createElement('div')
    bracketEl.setAttribute('aria-hidden', 'true')
    const A = `${BRACKET_ARM}px`
    const T = `${BRACKET_THICKNESS}px`
    const C = BRACKET_COLOR
    const grad = `linear-gradient(${C},${C})`
    bracketEl.style.cssText = `width:100%;height:100%;opacity:0;transform:scale(.8);transform-origin:center;pointer-events:none;background-image:${grad},${grad},${grad},${grad},${grad},${grad},${grad},${grad};background-repeat:no-repeat;background-size:${A} ${T}, ${T} ${A}, ${A} ${T}, ${T} ${A}, ${A} ${T}, ${T} ${A}, ${A} ${T}, ${T} ${A};background-position:top left, top left, top right, top right, bottom left, bottom left, bottom right, bottom right;transition:opacity ${SIZE_TRANSITION_MS} ${EASING}, transform ${SIZE_TRANSITION_MS} ${EASING};`
    bracketWrap.appendChild(bracketEl)

    // --- Dot (punto): posición inmediata, sin lerp ---
    const dotEl = document.createElement('div')
    dotEl.setAttribute('aria-hidden', 'true')
    dotEl.style.cssText = `position:fixed;top:0;left:0;width:${DOT_BASE_SIZE}px;height:${DOT_BASE_SIZE}px;border-radius:50%;background:${DOT_COLOR};pointer-events:none;z-index:${DOT_Z_INDEX};opacity:1;transition:width ${SIZE_TRANSITION_MS} ${EASING}, height ${SIZE_TRANSITION_MS} ${EASING}, opacity ${SIZE_TRANSITION_MS} ${EASING};`

    document.body.appendChild(ringEl)
    document.body.appendChild(bracketWrap)
    document.body.appendChild(dotEl)

    // --- Estado del lerp del ring/bracket ---
    let ringX = 0
    let ringY = 0
    let targetX = 0
    let targetY = 0
    let ringInitialized = false // arranca en la primera coord del mouse (sin salto desde 0,0)
    let animationId: number | null = null

    // --- Estado de visibilidad / hover ---
    let pointerInside = true // false tras mouseleave de la página
    let isHovering = false // true cuando el puntero está sobre un interactivo
    let hoverEl: Element | null = null // interactivo actualmente bajo hover

    // Ring y bracket comparten la posición lerpeada (crossfade en el mismo punto)
    const setRingPosition = () => {
      const t = `translate(${ringX}px,${ringY}px) translate(-50%,-50%)`
      ringEl.style.transform = t
      bracketWrap.style.transform = t
    }

    const setDotPosition = (x: number, y: number) => {
      dotEl.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`
    }

    // Crossfade ring<->bracket + visibilidad de página en un solo lugar
    const updateVisibility = () => {
      ringEl.style.opacity = pointerInside && !isHovering ? '1' : '0'
      bracketEl.style.opacity = pointerInside && isHovering ? '1' : '0'
      bracketEl.style.transform = pointerInside && isHovering ? 'scale(1)' : 'scale(.8)'
      dotEl.style.opacity = pointerInside ? '1' : '0'
    }

    // Loop del ring/bracket: corre solo mientras no se asentó (kick/settle)
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
      // Ring/bracket: actualizar target y arrancar el loop si estaba detenido
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
      pointerInside = true
      updateVisibility()
      kick()
    }

    const handleMouseLeave = () => {
      pointerInside = false
      updateVisibility()
    }

    const applyHover = () => {
      isHovering = true
      dotEl.style.width = `${DOT_HOVER_SIZE}px`
      dotEl.style.height = `${DOT_HOVER_SIZE}px`
      updateVisibility()
    }

    const clearHover = () => {
      isHovering = false
      dotEl.style.width = `${DOT_BASE_SIZE}px`
      dotEl.style.height = `${DOT_BASE_SIZE}px`
      updateVisibility()
    }

    // Detección de hover delegada: mouseover/mouseout burbujean, por lo que
    // cubren interactivos presentes y futuros sin re-atachear listeners.
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
      // Evitar toggles falsos entre hijos anidados del mismo interactivo
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
      bracketWrap.remove() // remueve también bracketEl (hijo)
      dotEl.remove()
      styleEl.remove()
    }
  }, [])

  return null
}

export default CustomCursorImpl
