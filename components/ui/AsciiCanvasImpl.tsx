'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import { useMounted, useReducedMotion } from '@/hooks'

// =============================================================================
// Constantes del efecto ASCII (sin literales mágicos inline).
// Algoritmo replicado de template-portfolio/Portfolio.dc.html (initSkillCanvas).
// =============================================================================

// Rampa de caracteres oscuro→claro. El índice = round(L * NR).
const RAMP = " .'-:=+iltcsuvxznoaqpdbkhwm*#%@"
const NR = RAMP.length - 1

// Tamaño de fuente/celda de la grilla ASCII.
const FONT_SIZE_NARROW = 6.35 // px cuando el canvas es angosto (< threshold)
const FONT_SIZE_BASE = 7.02 // px en tamaño normal
const FONT_SIZE_NARROW_THRESHOLD = 230 // px de ancho por debajo del cual se usa NARROW
const CHAR_W_RATIO = 0.6 // ancho de celda = fs * CHAR_W_RATIO
const CHAR_H_RATIO = 0.92 // alto de celda  = fs * CHAR_H_RATIO

// Peso de la fuente. DESVIACIÓN DOCUMENTADA: el template usa 500, pero
// Space Mono en este proyecto solo carga 400/700 → usamos 700 (500 caería
// silenciosamente a 400 y adelgazaría el retrato).
const FONT_WEIGHT = '700'
// Fallback si getComputedStyle no resuelve la fuente (canvas no hereda vars CSS).
const FONT_FAMILY_FALLBACK = "'Space Mono', monospace"

// Seguimiento del mouse e interacción.
const MOUSE_LERP = 0.12 // mouse.x += (tx - x) * MOUSE_LERP
const DPR_MAX = 2 // techo de devicePixelRatio
const PROX_RADIUS_FACTOR = 0.155 // radio de influencia = max(w,h) * factor
const PROX_THRESHOLD = 0.04 // por debajo de esta proximidad no hay wobble
const SETTLED_EPS = 0.3 // umbral para considerar el mouse "asentado"

// Wobble (mutación de caracteres cerca del mouse).
const WOBBLE_FREQ_1 = 11
const WOBBLE_FREQ_2 = 7
const WOBBLE_I1 = 1.9
const WOBBLE_J1 = 2.7
const WOBBLE_I2 = 1.3
const WOBBLE_J2 = 0.9
const WOBBLE_GAIN = 5 // ci += round(prox * GAIN * wob * MIX)
const WOBBLE_MIX = 0.5

// Paralaje.
const PAR = 5 // desplazamiento máximo de las letras por profundidad
const DEPTH_MID = 0.4 // depth = L - DEPTH_MID

// Reveal radial de entrada.
const REVEAL = 0.7 // segundos que dura el barrido
const REVEAL_MAX_RADIUS = 0.707 // ≈ sqrt(0.5² + 0.5²): distancia máx al centro (normaliza el orden)
const REVEAL_TRIGGER_VIEWPORT_RATIO = 0.82 // dispara cuando rect.top < innerHeight * ratio

// Sampling de luminosidad/alfa de la imagen.
const LUM_ALPHA_THRESHOLD = 0.5 // píxeles con alfa por debajo se saltan
const LUM_MIN_THRESHOLD = 0.04 // luminosidad por debajo se salta
const LUM_BLACK_POINT = 0.09 // L = (L - blackPoint) / range
const LUM_RANGE = 0.75
const LUM_GAMMA = 0.85 // L = pow(L, gamma)

// IntersectionObserver.
const IO_ROOT_MARGIN = '120px'

// --- Colores tokenizados de la rampa ámbar (no dispersar literales RGB) ---
// Extremo oscuro intrínseco del efecto (sombra ámbar, L=0).
const AMBER_SHADOW_RGB = { r: 176, g: 74, b: 24 }
// Extremo claro de la rampa base (L=1) — deriva de --color-accent (#EE8033).
const ACCENT_RGB = { r: 238, g: 128, b: 51 }
// Highlight por proximidad al mouse — deriva de --color-accent-hi (#ff9446).
// DESVIACIÓN DOCUMENTADA: el template mezclaba hacia (255,188,120); por mandato
// del RFC-07 el highlight se tokeniza a --color-accent-hi.
const ACCENT_HI_RGB = { r: 255, g: 148, b: 70 }
const PROX_COLOR_MIX = 0.9 // k = prox * PROX_COLOR_MIX

// Fondo theme-aware (el template era dark-only con #0E0D0C fijo).
const BG_FILL_DARK = '#0E0D0C'
const BG_FILL_LIGHT = '#F3F1EE'

const ARIA_LABEL =
  'Retrato de Agustín Tabarcache renderizado en caracteres ASCII que reaccionan al movimiento del mouse'

interface AsciiCanvasProps {
  className?: string
  /** Fuente de sampling del retrato (ej. '/perfil_cut.png'). */
  imageUrl: string
  /** Foto real mostrada cuando el usuario prefiere movimiento reducido. */
  fallbackImageUrl?: string
  /**
   * Hook para RFC-09 (flip card): cuando true, el rAF no se reprograma.
   * El flip 3D NO se implementa acá; esto solo pausa el render del ASCII.
   */
  paused?: boolean
}

const AsciiCanvasImpl = ({
  className,
  imageUrl,
  fallbackImageUrl = '/perfil.png',
  paused = false,
}: AsciiCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  const mounted = useMounted()
  const reduced = useReducedMotion()

  // Estado mutable leído/escrito dentro del loop y por el effect de `paused`.
  const pausedRef = useRef(paused)
  const prevPausedRef = useRef(paused)
  const kickRef = useRef<(() => void) | null>(null)
  // Fondo leído por-frame; en un ref para que un cambio de tema no re-inicialice
  // el canvas (recarga de imagen + reveal desde cero), solo repinte un frame.
  const bgFillRef = useRef(BG_FILL_DARK)

  // Enganche RFC-09: al pasar de pausado → activo, reanudar el loop.
  useEffect(() => {
    pausedRef.current = paused
    if (prevPausedRef.current && !paused) kickRef.current?.()
    prevPausedRef.current = paused
  }, [paused])

  // Fondo theme-aware sin teardown: actualiza el color y repinta un frame
  // (por si el rAF estaba en idle al momento del toggle).
  useEffect(() => {
    bgFillRef.current = resolvedTheme === 'light' ? BG_FILL_LIGHT : BG_FILL_DARK
    kickRef.current?.()
  }, [resolvedTheme])

  useEffect(() => {
    if (!mounted || reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Canvas no hereda var(--font-mono); leemos la fuente ya resuelta del DOM.
    const fontFamily =
      getComputedStyle(canvas).fontFamily || FONT_FAMILY_FALLBACK

    let w = 0
    let h = 0
    let dpr = 1
    let cols = 0
    let rows = 0
    let fs = FONT_SIZE_BASE
    let cw = 0
    let ch = 0
    let lumap: Float32Array | null = null
    let almap: Float32Array | null = null

    const off = document.createElement('canvas')
    const octx = off.getContext('2d', { willReadFrequently: true })

    let imgReady = false
    const img = new Image()

    const mouse = { x: 0, y: 0, tx: 0, ty: 0, active: 0 }
    // RFC-10.4: posición separada para el paralaje. A diferencia de mouse.x/y
    // (que snapea al puntero en el primer ingreso para que la proximidad/wobble
    // arranque bajo el cursor), `par` SIEMPRE lerpea hacia mouse.tx/ty y nunca
    // snapea → el desplazamiento del retrato (ox/oy) entra suave, sin salto.
    const par = { x: 0, y: 0 }

    let rafId: number | null = null
    let visible = true
    let started = 0 // 0: aún no revelado, 1: revelando/revelado
    let t0 = 0
    let t = 0

    const sample = () => {
      if (!imgReady || !w || !octx) return
      fs = w < FONT_SIZE_NARROW_THRESHOLD ? FONT_SIZE_NARROW : FONT_SIZE_BASE
      cw = fs * CHAR_W_RATIO
      ch = fs * CHAR_H_RATIO
      cols = Math.max(1, Math.floor(w / cw))
      rows = Math.max(1, Math.floor(h / ch))
      off.width = cols
      off.height = rows

      // Recorte object-fit: cover centrado.
      const ir = img.width / img.height
      const cr = (cols * cw) / (rows * ch)
      let sw: number
      let sh: number
      let sx: number
      let sy: number
      if (ir > cr) {
        sh = img.height
        sw = sh * cr
        sx = (img.width - sw) / 2
        sy = 0
      } else {
        sw = img.width
        sh = sw / cr
        sx = 0
        sy = (img.height - sh) / 2
      }
      octx.clearRect(0, 0, cols, rows)
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows)

      const data = octx.getImageData(0, 0, cols, rows).data
      lumap = new Float32Array(cols * rows)
      almap = new Float32Array(cols * rows)
      for (let i = 0; i < cols * rows; i++) {
        almap[i] = data[i * 4 + 3] / 255
        let L = data[i * 4] / 255
        L = (L - LUM_BLACK_POINT) / LUM_RANGE
        L = L < 0 ? 0 : L > 1 ? 1 : L
        lumap[i] = Math.pow(L, LUM_GAMMA)
      }
    }

    img.onload = () => {
      imgReady = true
      sample()
      kick()
    }
    img.src = imageUrl

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      if (!r.width) return
      dpr = Math.min(DPR_MAX, window.devicePixelRatio || 1)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sample()
      if (!mouse.active) {
        mouse.x = mouse.tx = w / 2
        mouse.y = mouse.ty = h / 2
        // Paralaje centrado en reposo (ox/oy = 0), consistente con el idle.
        par.x = w / 2
        par.y = h / 2
      }
    }

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - r.left
      mouse.ty = e.clientY - r.top
      // DESVIACIÓN DOCUMENTADA respecto del template (línea 648): al primer
      // ingreso el hotspot empieza en el puntero, no viaja desde el centro —
      // desviación pedida por el usuario. Snap x/y = tx/ty antes de activar;
      // los moves subsiguientes conservan el lerp MOUSE_LERP para suavidad.
      if (!mouse.active) {
        mouse.x = mouse.tx
        mouse.y = mouse.ty
      }
      mouse.active = 1
      kick()
    }

    const leave = () => {
      mouse.active = 0
      mouse.tx = w / 2
      mouse.ty = h / 2
    }

    const frame = (now: number) => {
      t = now / 1000

      if (started === 0) {
        const rect = canvas.getBoundingClientRect()
        if (
          rect.top < window.innerHeight * REVEAL_TRIGGER_VIEWPORT_RATIO &&
          rect.bottom > 0
        ) {
          started = 1
          t0 = t
        }
      }
      const prog = started === 1 ? Math.min(1, (t - t0) / REVEAL) : 0

      mouse.x += (mouse.tx - mouse.x) * MOUSE_LERP
      mouse.y += (mouse.ty - mouse.y) * MOUSE_LERP
      // RFC-10.4: el paralaje lee `par` (lerp sin snap) en vez de mouse.x/y;
      // la proximidad/wobble sigue leyendo mouse.x/y (snap de RFC-10.2).
      par.x += (mouse.tx - par.x) * MOUSE_LERP
      par.y += (mouse.ty - par.y) * MOUSE_LERP
      const ox = (par.x - w / 2) / (w / 2)
      const oy = (par.y - h / 2) / (h / 2)

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = bgFillRef.current
      ctx.fillRect(0, 0, w, h)

      if (!lumap || !almap) {
        rafId = visible && !pausedRef.current ? requestAnimationFrame(frame) : null
        return
      }

      ctx.font = `${FONT_WEIGHT} ${fs.toFixed(1)}px ${fontFamily}`
      ctx.textBaseline = 'top'

      const maxWH = Math.max(w, h)
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i
          if (almap[idx] < LUM_ALPHA_THRESHOLD) continue
          const L = lumap[idx]
          if (L < LUM_MIN_THRESHOLD) continue

          if (prog < 1) {
            const ndx = i / cols - 0.5
            const ndy = j / rows - 0.5
            const order =
              Math.sqrt(ndx * ndx + ndy * ndy) / REVEAL_MAX_RADIUS
            if (order > prog) continue
          }

          let ci = Math.min(NR, Math.max(0, Math.round(L * NR)))
          const depth = L - DEPTH_MID

          let prox = 0
          if (mouse.active) {
            const dx = i * cw - mouse.x
            const dy = j * ch - mouse.y
            prox = Math.max(
              0,
              1 - Math.sqrt(dx * dx + dy * dy) / (maxWH * PROX_RADIUS_FACTOR)
            )
            prox = prox * prox
          }

          if (prox > PROX_THRESHOLD) {
            const wob =
              Math.sin(t * WOBBLE_FREQ_1 + i * WOBBLE_I1 + j * WOBBLE_J1) +
              Math.sin(t * WOBBLE_FREQ_2 - i * WOBBLE_I2 + j * WOBBLE_J2)
            ci = ci + Math.round(prox * WOBBLE_GAIN * wob * WOBBLE_MIX)
            if (ci < 1) ci = 1
            if (ci > NR) ci = NR
          }

          const chr = RAMP[ci]
          if (chr === ' ') continue

          const px = i * cw + ox * PAR * depth
          const py = j * ch + oy * PAR * depth

          // Rampa base ámbar (sombra→acento por L) mezclada hacia el highlight
          // (--color-accent-hi) según la proximidad al mouse.
          const k = prox * PROX_COLOR_MIX
          const baseR =
            AMBER_SHADOW_RGB.r + L * (ACCENT_RGB.r - AMBER_SHADOW_RGB.r)
          const baseG =
            AMBER_SHADOW_RGB.g + L * (ACCENT_RGB.g - AMBER_SHADOW_RGB.g)
          const baseB =
            AMBER_SHADOW_RGB.b + L * (ACCENT_RGB.b - AMBER_SHADOW_RGB.b)
          const rr = Math.round(baseR + (ACCENT_HI_RGB.r - baseR) * k)
          const gg = Math.round(baseG + (ACCENT_HI_RGB.g - baseG) * k)
          const bb = Math.round(baseB + (ACCENT_HI_RGB.b - baseB) * k)
          ctx.fillStyle = `rgb(${rr},${gg},${bb})`
          ctx.fillText(chr, px, py)
        }
      }

      const settledM =
        Math.abs(mouse.tx - mouse.x) < SETTLED_EPS &&
        Math.abs(mouse.ty - mouse.y) < SETTLED_EPS
      // RFC-10.4: el rAF tampoco se detiene hasta que el paralaje se asiente
      // (si no, su lerp quedaría cortado a mitad de camino al salir/entrar).
      const settledPar =
        Math.abs(mouse.tx - par.x) < SETTLED_EPS &&
        Math.abs(mouse.ty - par.y) < SETTLED_EPS
      const idle = prog >= 1 && !mouse.active && settledM && settledPar
      rafId =
        visible && !pausedRef.current && !idle
          ? requestAnimationFrame(frame)
          : null
    }

    const kick = () => {
      if (visible && !pausedRef.current && rafId === null) {
        rafId = requestAnimationFrame(frame)
      }
    }
    kickRef.current = kick

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          kick()
        } else if (rafId !== null) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      },
      { threshold: 0, rootMargin: IO_ROOT_MARGIN }
    )
    io.observe(canvas)

    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)

    rafId = requestAnimationFrame(frame)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
      kickRef.current = null
    }
  }, [mounted, reduced, imageUrl])

  // Hasta montar no renderizamos nada (evita mismatch SSR/CSR de theme/reduced).
  if (!mounted) return null

  // Movimiento reducido: foto real, sin canvas ni rAF.
  if (reduced) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fallbackImageUrl}
        alt="Agustín Tabarcache"
        className={clsx('absolute inset-0 block h-full w-full object-cover', className)}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={ARIA_LABEL}
      className={clsx('font-mono absolute inset-0 block h-full w-full', className)}
    />
  )
}

export default AsciiCanvasImpl
