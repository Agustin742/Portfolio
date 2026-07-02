'use client'

import { useRef, useState, type RefObject } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import clsx from 'clsx'
import AsciiCanvas from '@/components/ui/AsciiCanvas'
import { useGlitch, useReducedMotion } from '@/hooks'

// Índice de la sección en el layout de la página (hero = 01).
const SECTION_INDEX = 2
// Valor final del counter para prefers-reduced-motion (sin scrub).
const COUNTER_FINAL = `[ ${String(SECTION_INDEX).padStart(2, '0')} ]`
// Fuente de sampling del retrato ASCII y foto real (dorso del flip).
const ASCII_SOURCE = '/perfil_cut.png'
const PHOTO_SOURCE = '/perfil.png'
// La columna de la card está limitada a 400px en desktop (grid minmax).
const PHOTO_SIZES = '(min-width: 768px) 400px, 100vw'
// Desplazamientos del scrub del template: reveals suben 28px, mask 115%.
const REVEAL_SHIFT_PX = 28
const MASK_SHIFT_PCT = 115
// Umbrales del glitch del template: burst al completar, se rearma al retroceder.
const GLITCH_FIRE_AT = 0.99
const GLITCH_REARM_AT = 0.6

/**
 * Easing cubic-out del loop de scrub del template: e = 1 − (1−p)³.
 * Se aplica sobre el progreso lineal del scroll, no como ease temporal.
 */
const easeCubicOut = (p: number) => 1 - Math.pow(1 - p, 3)

/** Item del bloque "// AHORA MISMO" — se lee con t.raw('rightNow'). */
interface RightNowItem {
  prefix: string
  highlight: string
  suffix: string
  italic?: boolean
}

interface ScrubValues {
  /** Progreso lineal 0→1 (para lógica de umbrales, ej. glitch). */
  progress: MotionValue<number>
  /** Progreso con easing cubic-out (opacity de los reveals). */
  eased: MotionValue<number>
  /** translateY del reveal: (1−e)·28px → 0. */
  y: MotionValue<number>
}

/**
 * Scrub atado al scroll, ida y vuelta (loop del template, líneas 981–1009):
 * p = clamp01((0.82·vh − rect.top) / (0.40·vh)). El offset de useScroll
 * replica esa ventana: arranca cuando el top del elemento cruza el 82% del
 * viewport y completa al llegar al 42%. Los MotionValues van directo a
 * style, sin re-renders.
 */
function useScrub(ref: RefObject<HTMLElement | null>): ScrubValues {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'start 0.42'],
  })
  const eased = useTransform(scrollYProgress, easeCubicOut)
  const y = useTransform(eased, (e) => (1 - e) * REVEAL_SHIFT_PX)
  return { progress: scrollYProgress, eased, y }
}

/** Overlay decorativo tipo "// ASCII" / "// FOTO" en la esquina de cada cara. */
function FaceTag({ variant, children }: { variant: 'ascii' | 'photo'; children: string }) {
  return (
    <span
      aria-hidden
      className={clsx(
        'pointer-events-none absolute left-3.5 top-3 z-10 font-mono text-[9.5px] uppercase tracking-[0.16em]',
        // Template líneas 151/156: ASCII en faint; FOTO en text con difference
        // para mantener contraste sobre la foto real.
        variant === 'ascii' ? 'text-faint' : 'text-text mix-blend-difference',
      )}
    >
      {children}
    </span>
  )
}

const AboutMe = () => {
  const t = useTranslations('about')
  const reduced = useReducedMotion()

  // Estado de UI del flip (no es hydration-guard: es interacción legítima).
  const [isFlipped, setIsFlipped] = useState(false)

  // --- Scrubs por bloque (cada elemento mide su propio rect, como el template) ---
  const labelRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const rightNowRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  const label = useScrub(labelRef)
  const card = useScrub(cardRef)
  const rightNow = useScrub(rightNowRef)
  const bio = useScrub(bioRef)

  // --- Glitch del h2: NO scrubbeado. Burst único al completar (p ≥ 0.99),
  // rearmado al retroceder (p < 0.6). El mismo ref sirve de target de scroll.
  // Desestructurado en el call-site: la regla react-hooks/refs no permite
  // acceder a propiedades de un objeto que contiene un ref durante el render.
  const { ref: glitchRef, trigger: triggerGlitch } = useGlitch()
  const headline = useScrub(glitchRef)
  const glitchDone = useRef(false)

  useMotionValueEvent(headline.progress, 'change', (p) => {
    if (p >= GLITCH_FIRE_AT && !glitchDone.current) {
      glitchDone.current = true
      triggerGlitch() // no-op interno con prefers-reduced-motion
    } else if (p < GLITCH_REARM_AT) {
      glitchDone.current = false
    }
  })

  // Counter [ 00 ] → [ 02 ]: cuenta con el scroll (round(e·2)), no one-shot.
  const counterText = useTransform(
    label.eased,
    (e) => `[ ${String(Math.round(e * SECTION_INDEX)).padStart(2, '0')} ]`,
  )

  // Mask del h2: UN solo inner translateY (1−e)·115% → 0 (template línea 990).
  const maskY = useTransform(headline.eased, (e) => `${(1 - e) * MASK_SHIFT_PCT}%`)

  // prefers-reduced-motion: sin scrub — todo visible, sin transforms.
  const revealStyle = (scrub: ScrubValues) =>
    reduced ? { opacity: 1, y: 0 } : { opacity: scrub.eased, y: scrub.y }

  // Array de objetos: next-intl solo lo expone vía t.raw (t() es para strings).
  const rightNowItems = t.raw('rightNow') as RightNowItem[]

  return (
    <section
      id="sobre"
      aria-label={t('title')}
      className="w-full scroll-mt-(--header-h) px-[clamp(20px,4vw,48px)] py-[clamp(48px,8vw,110px)]"
    >
      {/* Wrapper centrado del template (línea 140): max-width 1240 + auto margins */}
      <div className="mx-auto max-w-310">
        {/* Label de sección: todo en accent, counter scrubbeado, doble espacio, sin dash */}
        <motion.div
          ref={labelRef}
          aria-hidden="true"
          style={revealStyle(label)}
          className="mb-[clamp(40px,7vw,80px)] font-mono text-[12px] uppercase tracking-[0.14em] text-accent"
        >
          <motion.span>{reduced ? COUNTER_FINAL : counterText}</motion.span>
          {/* Doble espacio del template: la string de abajo son dos U+00A0
              literales (&nbsp;&nbsp;) — el HTML colapsa espacios normales */}
          {'  '}
          <span>{t('sectionLabel')}</span>
        </motion.div>

        {/* Mobile-first: una columna; desde md, card 400px + bio fluida */}
        <div className="grid grid-cols-1 items-start gap-[clamp(36px,6vw,90px)] md:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
          {/* ------------------- Columna izquierda: flip card ------------------- */}
          <motion.div ref={cardRef} style={revealStyle(card)} className="w-full self-start">
            <div className="relative aspect-4/5 w-full perspective-[1400px]">
              <div
                className={clsx(
                  'relative h-full w-full transform-3d',
                  // prefers-reduced-motion: corte directo, sin rotación animada.
                  reduced
                    ? 'transition-none'
                    : 'transition-transform duration-850 ease-wipe',
                  isFlipped && 'transform-[rotateY(180deg)]',
                )}
              >
                {/* Cara frontal: retrato ASCII (pausa su rAF mientras está oculta) */}
                <div className="absolute inset-0 overflow-hidden border-[1.5px] border-border bg-bg-card backface-hidden">
                  <AsciiCanvas imageUrl={ASCII_SOURCE} paused={isFlipped} />
                  <FaceTag variant="ascii">{'// ASCII'}</FaceTag>
                </div>

                {/* Cara trasera: foto real */}
                <div className="absolute inset-0 overflow-hidden border-[1.5px] border-border bg-bg-card backface-hidden transform-[rotateY(180deg)]">
                  <Image
                    src={PHOTO_SOURCE}
                    alt={t('photoAlt')}
                    fill
                    sizes={PHOTO_SIZES}
                    className="object-cover"
                  />
                  <FaceTag variant="photo">{'// FOTO'}</FaceTag>
                </div>
              </div>

              {/* Botón flip = esquina ámbar pegada al borde (template línea 160) */}
              <button
                type="button"
                onClick={() => setIsFlipped((prev) => !prev)}
                aria-pressed={isFlipped}
                aria-label={isFlipped ? t('flip.toAscii') : t('flip.toPhoto')}
                data-cursor
                className="absolute bottom-0 left-0 z-20 flex h-9.5 w-9.5 items-center justify-center bg-accent text-bg transition-[width,height,background-color] duration-300 ease-[ease] hover:h-11 hover:w-11 hover:bg-accent-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <span aria-hidden className="text-[15px] leading-none">
                  ↻
                </span>
              </button>
            </div>

            {/* Caption decorativo bajo la card */}
            <div
              aria-hidden="true"
              className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faint"
            >
              <span>AGUSTÍN_T.JPG</span>
              <span>©2026</span>
            </div>
          </motion.div>

          {/* --------------------- Columna derecha: bio ---------------------- */}
          <div className="min-w-0">
            {/* Título con mask scrubbeada + glitch burst. UNA sola máscara para
                todo el bloque (template wrapMask, líneas 743–749): el inner es
                un bloque rígido de dos líneas que sube 115%→0, por lo que la
                línea 1 emerge antes que la 2 (escalonado geométrico natural). */}
            <h2
              ref={glitchRef as RefObject<HTMLHeadingElement | null>}
              className="mb-[clamp(28px,4vw,44px)] text-balance font-sans text-[clamp(32px,4.6vw,60px)] font-semibold leading-[1.02] tracking-[-0.03em] text-text"
            >
              <span className="block overflow-hidden pb-[0.1em]">
                <motion.span style={{ y: reduced ? '0%' : maskY }} className="block">
                  <span className="block">{t('headlineMain')}</span>
                  <span className="block text-faint">{t('headlineSub')}</span>
                </motion.span>
              </span>
            </h2>

            {/* Bloque "// AHORA MISMO" (template líneas 174–180) */}
            <motion.div
              ref={rightNowRef}
              style={revealStyle(rightNow)}
              className="mb-[clamp(30px,4vw,44px)] border-b-[1.5px] border-border pb-[clamp(26px,3vw,34px)]"
            >
              <p className="mb-5.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                <span aria-hidden>{'// '}</span>
                {t('rightNowLabel')}
              </p>
              <ul className="grid max-w-135 gap-4 font-mono text-[15.5px] leading-[1.55] text-muted">
                {rightNowItems.map((item, index) => (
                  <li key={index} className="flex gap-3.5">
                    <span aria-hidden className="shrink-0 text-accent">
                      →
                    </span>
                    <span>
                      {item.prefix}
                      <span
                        className={clsx(
                          'text-text',
                          // Ítem "Leyendo": título del libro en Instrument Serif itálica.
                          item.italic && 'font-serif text-[16px] italic',
                        )}
                      >
                        {item.highlight}
                      </span>
                      {item.suffix}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Bio: solo whoAmI + formation (decisión del usuario, RFC-10.1) */}
            <motion.div
              ref={bioRef}
              style={revealStyle(bio)}
              className="grid max-w-135 gap-5.5 font-mono text-[15.5px] leading-[1.85] text-muted"
            >
              <p>{t('cards.whoAmI.description')}</p>
              <p>{t('cards.formation.description')}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
