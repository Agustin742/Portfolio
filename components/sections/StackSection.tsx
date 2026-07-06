'use client'

import { useRef, useState, type RefObject } from 'react'
import { useTranslations } from 'next-intl'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import clsx from 'clsx'
import {
  CATEGORY_ORDER,
  countByCategory,
  techs,
  type Category,
  type Tech,
  type Tier,
} from '@/data/stack/stack'
import { useGlitch, useReducedMotion, useSectionCounter } from '@/hooks'

// Opacidad del aislamiento por categoría (efecto, no color → constante nombrada).
const ISOLATED_OPACITY = 0.13
// Offset lateral (px) desde el que entra cada tech (desde la derecha).
const TECH_OFFSET = 80
// Duración (en fracción de progreso de scroll) de la entrada de cada tech.
const TECH_WINDOW = 0.4
// Reparto del stagger sobre el progreso: los techs arrancan escalonados en [0, SPREAD].
const TECH_SPREAD = 0.5

// Umbrales del glitch del título (mismo patrón que About/Contact): burst al
// completar el reveal (p ≥ 0.99), rearmado al retroceder (p < 0.6).
const GLITCH_FIRE_AT = 0.99
const GLITCH_REARM_AT = 0.6
// Desplazamiento de la máscara del reveal del título (translateY 115% → 0).
const MASK_SHIFT_PCT = 115

/** Easing cubic-out del template aplicado sobre el progreso lineal del scroll. */
const easeCubicOut = (p: number) => 1 - Math.pow(1 - p, 3)

// font-size por tier (3 tiers exactos del template). Literales estáticos para
// que Tailwind los extraiga; nunca interpolar la clase.
const TIER_CLASS: Record<Tier, string> = {
  1: 'text-[clamp(32px,5vw,70px)]',
  2: 'text-[clamp(24px,3.4vw,46px)]',
  3: 'text-[clamp(19px,2.6vw,34px)]',
}

/** Baraja [0..n-1] una sola vez (Fisher–Yates) para el orden de entrada. */
function shuffledIndices(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i)
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

interface SkillTechProps {
  tech: Tech
  /** Posición barajada (0..total-1) → define el escalonado de entrada. */
  orderPos: number
  total: number
  /** Progreso de scroll compartido del skillsec (mismo para todos los techs). */
  progress: MotionValue<number>
  reduced: boolean
  isCatActive: boolean
  isIsolated: boolean
  ariaLabel: string
}

/**
 * Tech del skillwall. Se extrae a subcomponente porque cada tech deriva su
 * entrada de un `useTransform` con rango PROPIO (según su posición barajada)
 * sobre el `progress` compartido — no se puede llamar `useTransform` dentro de
 * un `.map()` sin violar las reglas de hooks. Así se preserva el stagger del
 * orden Fisher–Yates ligándolo al scroll en vez de a un `delay` one-shot.
 */
const SkillTech = ({
  tech,
  orderPos,
  total,
  progress,
  reduced,
  isCatActive,
  isIsolated,
  ariaLabel,
}: SkillTechProps) => {
  const start = total > 1 ? (orderPos / (total - 1)) * TECH_SPREAD : 0
  const opacity = useTransform(progress, [start, start + TECH_WINDOW], [0, 1])
  const x = useTransform(progress, [start, start + TECH_WINDOW], [TECH_OFFSET, 0])

  return (
    <motion.li
      style={reduced ? undefined : { opacity, x }}
      aria-label={ariaLabel}
      className="list-none"
    >
      <span
        data-cat={tech.category}
        style={isIsolated ? { opacity: ISOLATED_OPACITY } : undefined}
        className={clsx(
          'group relative cursor-default font-sans font-semibold leading-none tracking-[-0.02em] transition-[color,opacity] duration-300 ease-signature hover:text-accent',
          TIER_CLASS[tech.tier],
          isCatActive ? 'text-accent' : 'text-text',
        )}
      >
        {tech.name}
        <sup
          aria-hidden="true"
          className="ml-[0.14em] align-super font-mono text-[0.3em] font-normal tracking-[0.06em] text-faint opacity-0 transition-opacity duration-300 ease-signature group-hover:text-accent group-hover:opacity-100"
        >
          {tech.role}
        </sup>
      </span>
    </motion.li>
  )
}

const StackSection = () => {
  const t = useTranslations('stack')
  const reduced = useReducedMotion()

  // Categoría bajo el cursor en el rail → aísla los techs (patrón del template
  // `.skillsec:has(...)`, acá en estado React en vez de CSS `:has()`).
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null)

  // Orden barajado (una sola vez, estable entre renders). Solo alimenta el
  // escalonado de la entrada → no altera el HTML de SSR ni la semántica, por
  // eso es seguro respecto de la hidratación.
  const [order] = useState(() => shuffledIndices(techs.length))

  // Título ligado al scroll (idéntico a About/Contact): el MISMO ref es target
  // del scroll y del glitch. El mask-reveal se scrubbea con el progreso
  // (cubic-out) y el burst de glitch dispara al completar el reveal (p ≥ 0.99),
  // rearmándose al retroceder (p < 0.6) — en vez del useInView one-shot anterior,
  // que con el salto del nav disparaba recién con el título ya arriba (armándose
  // en reposo).
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

  // Contador [ 00 ] → [ 04 ] al entrar el label en viewport (índice de sección).
  const { ref: counterRef, text: counterText } = useSectionCounter(4)

  // Scroll-driven: progreso del skillsec cruzando el viewport. Alimenta el rail
  // (main) y cada tech (subcomponente) — un único `useScroll` para todo el grupo.
  const skillsecRef = useRef<HTMLDivElement>(null)
  // Offset `start 0.35`: el progreso completa cuando el BORDE SUPERIOR del
  // contenedor entra al tercio superior del viewport (antes `center center`, que
  // completaba recién con el centro del contenedor —muy alto— en el centro del
  // viewport → con el título arriba el progreso era ~0.1 y el skillwall visible
  // aparecía casi vacío). Como ambos offsets referencian `start`, la altura del
  // contenedor no distorsiona el progreso: al quedar el título bajo el header,
  // el top del skillwall ronda el tercio superior → progreso ~0.85–1.0 → los
  // techs (stagger [0, 0.5] + ventana 0.4) y el rail ([0.1, 0.6]) ya asentados.
  const { scrollYProgress } = useScroll({
    target: skillsecRef,
    offset: ['start end', 'start 0.35'],
  })
  // El rail entra desde la izquierda (−120px→0), un poco después de los techs.
  const railOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])
  const railX = useTransform(scrollYProgress, [0.1, 0.6], [-120, 0])

  return (
    <section
      id="stack"
      aria-label={t('ariaSection')}
      className="w-full scroll-mt-(--header-h) border-b-[1.5px] border-border px-[clamp(20px,4vw,48px)] py-[clamp(32px,5vw,64px)]"
    >
      <div className="mx-auto max-w-420">
        {/* -------------------------- HEADER -------------------------- */}
        <div className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-baseline justify-between gap-4">
          {/* Label decorativa [ 04 ]  STACK & HERRAMIENTAS (corchetes). */}
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

        {/* --------------------------- SKILLSEC --------------------------- */}
        {/* Grid: 1 columna en mobile; rail | skillwall a partir de 760px. */}
        {/* Ref del scroll compartido: rail y techs derivan su entrada de aquí. */}
        <div
          ref={skillsecRef}
          className="grid grid-cols-1 items-start gap-[clamp(28px,5vw,76px)] border-t-[1.5px] border-border pt-[clamp(34px,5vw,58px)] min-[760px]:grid-cols-[clamp(160px,22vw,250px)_1fr]"
        >
          {/* ------------------- LEFT: category rail ------------------- */}
          <motion.div
            style={reduced ? undefined : { opacity: railOpacity, x: railX }}
            className="flex flex-col border-l-2 border-accent pl-[clamp(16px,2vw,22px)] font-mono"
          >
            <ul aria-label={t('ariaCategories')} className="m-0 flex list-none flex-col p-0">
              {CATEGORY_ORDER.map((category, index) => {
                const isActive = hoveredCategory === category
                const count = countByCategory(category)
                const name = t(`categories.${category}`)
                return (
                  <li
                    key={category}
                    aria-label={t('categoryAria', {
                      name: t(`categoriesAria.${category}`),
                      count,
                    })}
                    onMouseEnter={() => setHoveredCategory(category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={clsx(
                      'flex cursor-default items-baseline justify-between gap-2.5 border-b-[1.5px] py-3 text-[12px] tracking-[0.08em] transition-[color,border-color] duration-300 ease-signature',
                      isActive ? 'border-accent text-text' : 'border-border text-muted',
                    )}
                  >
                    <span>
                      <span className={isActive ? 'text-text' : 'text-accent'}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {'  '}
                      {name}
                    </span>
                    <span className={isActive ? 'text-text' : 'text-faint'}>
                      {String(count).padStart(2, '0')}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* Hint: flecha accent + texto faint. */}
            <p className="mt-[clamp(22px,3vw,32px)] flex items-start gap-2 text-[10.5px] leading-[1.75] tracking-wider text-muted">
              <span aria-hidden="true" className="text-accent">
                →
              </span>
              <span>{t('hint')}</span>
            </p>
          </motion.div>

          {/* ------------------- RIGHT: skillwall ------------------- */}
          <ul
            aria-label={t('ariaTechnologies')}
            className="m-0 flex list-none flex-wrap items-baseline gap-x-[clamp(18px,2.6vw,42px)] gap-y-[clamp(8px,1.2vw,18px)] p-0"
          >
            {techs.map((tech, index) => {
              // Aislamiento por categoría: cat activa → accent; resto → opacity .13.
              const isCatActive = hoveredCategory === tech.category
              const isIsolated =
                hoveredCategory !== null && hoveredCategory !== tech.category
              return (
                <SkillTech
                  key={tech.name}
                  tech={tech}
                  orderPos={order[index]}
                  total={techs.length}
                  progress={scrollYProgress}
                  reduced={reduced}
                  isCatActive={isCatActive}
                  isIsolated={isIsolated}
                  ariaLabel={t('techAria', {
                    name: tech.name,
                    category: t(`categoriesAria.${tech.category}`),
                    role: tech.role,
                  })}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default StackSection
