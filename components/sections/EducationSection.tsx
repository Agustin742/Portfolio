'use client'

import { useRef, type RefObject } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { education, type Education } from '@/data/education/education'
import { useGlitch, useReducedMotion, useSectionCounter } from '@/hooks'

// Offset lateral (px) desde el que entra cada fila: par → izquierda (−), impar
// → derecha (+). Efecto, no color/spacing → constante nombrada.
const ROW_OFFSET = 64

// Umbrales del glitch del título (mismo patrón que About/Contact): burst al
// completar el reveal (p ≥ 0.99), rearmado al retroceder (p < 0.6).
const GLITCH_FIRE_AT = 0.99
const GLITCH_REARM_AT = 0.6
// Desplazamiento de la máscara del reveal del título (translateY 115% → 0).
const MASK_SHIFT_PCT = 115

/** Easing cubic-out del template aplicado sobre el progreso lineal del scroll. */
const easeCubicOut = (p: number) => 1 - Math.pow(1 - p, 3)

interface EducationRowProps {
  item: Education
  index: number
  /** Con reduced motion se renderiza el estado final (opacity 1, x 0) sin ligar al scroll. */
  reduced: boolean
}

/**
 * Fila de la tabla de formación. Cada fila tiene su PROPIO `useScroll` ligado a
 * su ref: por eso se extrae a subcomponente (no se puede llamar `useScroll`/
 * `useTransform` dentro de un `.map()` sin violar las reglas de hooks). El
 * progreso de la fila cruzando el viewport deriva opacity 0→1 y x ±offset→0.
 * Índice par entra desde la IZQUIERDA; impar desde la DERECHA.
 */
const EducationRow = ({ item, index, reduced }: EducationRowProps) => {
  const rowRef = useRef<HTMLLIElement>(null)
  const number = String(index + 1).padStart(2, '0')
  const fromX = index % 2 === 0 ? -ROW_OFFSET : ROW_OFFSET

  // 0 cuando el borde superior de la fila toca el fondo del viewport; 1 cuando
  // ese borde superior apenas entra por abajo del viewport (offset `start
  // 0.85`). Con el header de la sección empujando las filas, las visibles
  // arrancan con su borde superior en ~42.7 / 60.2 / 77.7% del viewport: todas
  // por encima del 85%, así que quedan asentadas en reposo. Un umbral más alto
  // (p. ej. 0.45) las dejaba congeladas a medio revelar al aterrizar; la fila
  // bajo el fold sigue revelándose al scrollear.
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'start 0.85'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const x = useTransform(scrollYProgress, [0, 1], [fromX, 0])

  return (
    <motion.li
      ref={rowRef}
      style={reduced ? undefined : { opacity, x }}
      aria-label={`${item.title} — ${item.institution}, ${item.year}`}
      className="group grid grid-cols-[80px_1fr_auto] items-center gap-[clamp(16px,4vw,48px)] border-b-[1.5px] border-border px-[clamp(8px,2vw,24px)] py-[clamp(22px,3vw,32px)] transition-[background-color] duration-400 ease-signature hover:bg-bg-warm-hover"
    >
      {/* Columna 1 — número (derivado del índice, decorativo). */}
      <span aria-hidden="true" className="font-mono text-[12px] text-faint">
        {number}
      </span>

      {/* Columna 2 — título + institución (+ logo opcional). */}
      <div>
        <div className="font-sans text-[clamp(19px,2.4vw,26px)] font-semibold tracking-[-0.01em] text-text">
          {item.title}
        </div>
        <div className="mt-1.5 flex items-center gap-2.5 font-mono text-[12px] text-muted">
          {item.logoSrc && (
            <Image
              src={item.logoSrc}
              alt=""
              aria-hidden="true"
              width={72}
              height={18}
              className="h-4.5 w-auto object-contain"
            />
          )}
          <span>{item.institution}</span>
        </div>
      </div>

      {/* Columna 3 — año (pasa a accent en hover de la fila). */}
      <div className="font-mono text-[13px] text-faint transition-colors duration-300 ease-signature group-hover:text-accent">
        {item.year}
      </div>
    </motion.li>
  )
}

const EducationSection = () => {
  const t = useTranslations('education')
  const reduced = useReducedMotion()

  // Título ligado al scroll (idéntico a About/Contact): el MISMO ref es target
  // del scroll y del glitch. El mask-reveal se scrubbea con el progreso
  // (cubic-out) y el burst de glitch dispara al completar el reveal (p ≥ 0.99),
  // rearmándose al retroceder (p < 0.6) — en vez del useInView one-shot anterior,
  // que con el salto del nav se armaba en reposo con el título ya arriba.
  const { ref: titleGlitchRef, trigger: triggerTitleGlitch } = useGlitch()
  const { scrollYProgress: titleProgress } = useScroll({
    target: titleGlitchRef,
    offset: ['start 0.82', 'start 0.42'],
  })
  const titleEased = useTransform(titleProgress, easeCubicOut)
  const titleMaskY = useTransform(titleEased, (e) => `${(1 - e) * MASK_SHIFT_PCT}%`)

  const titleGlitchDone = useRef(false)
  useMotionValueEvent(titleProgress, 'change', (p) => {
    if (p >= GLITCH_FIRE_AT && !titleGlitchDone.current) {
      titleGlitchDone.current = true
      triggerTitleGlitch() // no-op interno con prefers-reduced-motion
    } else if (p < GLITCH_REARM_AT) {
      titleGlitchDone.current = false
    }
  })

  // Contador [ 00 ] → [ 05 ] al entrar el label en viewport (índice de sección).
  const { ref: counterRef, text: counterText } = useSectionCounter(5)

  return (
    <section
      id="formacion"
      aria-label={t('ariaSection')}
      className="w-full scroll-mt-(--header-h) border-b-[1.5px] border-border bg-bg-warm px-[clamp(20px,4vw,48px)] py-[clamp(32px,5vw,64px)]"
    >
      <div className="mx-auto max-w-420">
        {/* -------------------------- HEADER -------------------------- */}
        <div className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-baseline justify-between gap-4">
          {/* Label decorativa [ 05 ]  FORMACIÓN & CERTIFICACIONES (corchetes). */}
          <div
            aria-hidden="true"
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent"
          >
            <motion.span ref={counterRef}>{counterText}</motion.span>
            {/* Doble espacio del template (colapsado en HTML normal). */}
            {'  '}
            <span>{t('sectionLabel')}</span>
          </div>

          {/* Título con mask-reveal ligado al scroll + glitch, mismo tratamiento
              que About/Contact (scrub, no one-shot). */}
          <h2
            ref={titleGlitchRef as RefObject<HTMLHeadingElement | null>}
            className="m-0 font-sans text-[clamp(34px,5vw,64px)] font-bold uppercase tracking-[-0.03em] text-text"
          >
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                style={{ y: reduced ? '0%' : titleMaskY }}
                className="block"
              >
                {t('title')}
              </motion.span>
            </span>
          </h2>
        </div>

        {/* --------------------------- TABLA --------------------------- */}
        {/* Cada fila entra intercalada L/R ligada a su propio scroll (ver EducationRow). */}
        <ol
          aria-label={t('ariaList')}
          className="m-0 list-none border-t-[1.5px] border-border p-0"
        >
          {education.map((item, index) => (
            <EducationRow
              key={item.id}
              item={item}
              index={index}
              reduced={reduced}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default EducationSection
