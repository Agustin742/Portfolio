'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

// --- Constantes de la grilla / interacción (sin valores mágicos inline) ---
const S = 42 // separación de la grilla en px
const R = 175 // radio de influencia del mouse en px
const LERP = 0.1 // factor de seguimiento del mouse: mx += (tmx - mx) * LERP
const SETTLED_EPS = 0.4 // umbral para considerar el mouse "asentado" y detener el rAF

const DOT_RADIUS_BASE = 1 // radio base del punto en px
const DOT_RADIUS_HOVER_GAIN = 1.9 // radio hover = DOT_RADIUS_BASE + t * DOT_RADIUS_HOVER_GAIN

// --- Colores exactos ---
const DOT_COLOR_DARK_BASE = 'rgba(237,232,225,0.045)'
const DOT_COLOR_LIGHT_BASE = 'rgba(26,23,20,0.045)'
const HOVER_RGB = '238,128,51' // ámbar (acento)
const HOVER_ALPHA_MIN = 0.05 // alpha base del hover
const HOVER_ALPHA_DARK_MAX = 0.62 // alpha = HOVER_ALPHA_MIN + t * HOVER_ALPHA_DARK_MAX
const HOVER_ALPHA_LIGHT_MAX = 0.55 // alpha = HOVER_ALPHA_MIN + t * HOVER_ALPHA_LIGHT_MAX

interface Point {
  x: number
  y: number
}

const BackgroundCanvasImpl = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Refs mutables (no provocan re-render)
  const mx = useRef(0)
  const my = useRef(0)
  const tmx = useRef(0)
  const tmy = useRef(0)
  const points = useRef<Point[]>([])
  const animationId = useRef<number | null>(null)

  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = resolvedTheme === 'dark'
    const baseColor = isDark ? DOT_COLOR_DARK_BASE : DOT_COLOR_LIGHT_BASE
    const hoverAlphaMax = isDark ? HOVER_ALPHA_DARK_MAX : HOVER_ALPHA_LIGHT_MAX

    const DPR = Math.min(2, window.devicePixelRatio || 1)

    let isVisible = true

    // Genera la grilla una única vez por resize (no por frame)
    const buildGrid = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = width * DPR
      canvas.height = height * DPR
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(DPR, DPR)

      const cols = Math.ceil(width / S) + 1
      const rows = Math.ceil(height / S) + 1
      const next: Point[] = []
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          next.push({ x: i * S, y: j * S })
        }
      }
      points.current = next
    }

    const draw = () => {
      // Lerp del mouse
      mx.current += (tmx.current - mx.current) * LERP
      my.current += (tmy.current - my.current) * LERP

      const width = canvas.width / DPR
      const height = canvas.height / DPR
      ctx.clearRect(0, 0, width, height)

      const pts = points.current
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        const dx = p.x - mx.current
        const dy = p.y - my.current
        const dist = Math.sqrt(dx * dx + dy * dy)

        let t = 0
        if (dist < R) {
          const prox = 1 - dist / R
          t = prox * prox
        }

        const radius = DOT_RADIUS_BASE + t * DOT_RADIUS_HOVER_GAIN
        const color =
          t > 0
            ? `rgba(${HOVER_RGB}, ${HOVER_ALPHA_MIN + t * hoverAlphaMax})`
            : baseColor

        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }

      // ¿El mouse ya se asentó?
      const dmx = Math.abs(tmx.current - mx.current)
      const dmy = Math.abs(tmy.current - my.current)
      if (dmx < SETTLED_EPS && dmy < SETTLED_EPS) {
        animationId.current = null
        return // detener el loop: no reprogramar next frame
      }

      animationId.current = requestAnimationFrame(draw)
    }

    // Arranca el loop solo si no está corriendo y el canvas es visible
    const kick = () => {
      if (animationId.current === null && isVisible) {
        animationId.current = requestAnimationFrame(draw)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      tmx.current = e.clientX
      tmy.current = e.clientY
      kick()
    }

    const handleResize = () => {
      buildGrid()
      kick()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          kick()
        } else if (animationId.current !== null) {
          cancelAnimationFrame(animationId.current)
          animationId.current = null
        }
      },
      { threshold: 0 }
    )

    buildGrid()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    observer.observe(canvas)

    // Redibujo inmediato al montar / cambiar tema, sin esperar mousemove
    animationId.current = requestAnimationFrame(draw)

    return () => {
      if (animationId.current !== null) {
        cancelAnimationFrame(animationId.current)
        animationId.current = null
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [mounted, resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}

export default BackgroundCanvasImpl
