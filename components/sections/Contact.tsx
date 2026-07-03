'use client'

import { useRef, type RefObject } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { contactInfo, socials } from '@/data/contact/contact'
import {
  useGlitch,
  useLocalClock,
  useReducedMotion,
  useSectionCounter,
} from '@/hooks'
// Label mono superior de cada columna del grid (decorativo, aria-hidden).
const COLUMN_LABEL =
  'mb-[14px] font-mono text-[11px] tracking-[0.12em] text-faint'

// Desplazamiento vertical de entrada de cada columna (translateY px → 0).
const COL_SHIFT_PX = 28

// Umbrales del glitch del título (mismo patrón que About): burst al completar
// el reveal (p ≥ 0.99), rearmado al retroceder (p < 0.6).
const GLITCH_FIRE_AT = 0.99
const GLITCH_REARM_AT = 0.6
// Desplazamiento de la máscara del reveal (translateY 115% → 0).
const MASK_SHIFT_PCT = 115

/** Easing cubic-out del template aplicado sobre el progreso lineal del scroll. */
const easeCubicOut = (p: number) => 1 - Math.pow(1 - p, 3)

const Contact = () => {
  const t = useTranslations('contact')
  const locale = useLocale()
  const reduced = useReducedMotion()

  // Reloj live en accent (patrón del Hero, extraído a hook reutilizable).
  const time = useLocalClock(locale)

  // Contador [ 00 ] → [ 06 ] al entrar el label en viewport (índice de sección).
  const { ref: counterRef, text: counterText } = useSectionCounter(6)

  // Año dinámico para el copyright (texto fijo, no i18n).
  const year = new Date().getFullYear()

  // --- Título ligado al scroll (idéntico a About): el MISMO ref es target del
  // scroll y del glitch. El mask-reveal se scrubbea con el progreso (cubic-out)
  // y el burst de glitch dispara al completar el reveal (p ≥ 0.99), rearmándose
  // al retroceder (p < 0.6) — en vez del useInView one-shot anterior, que
  // disparaba una sola vez y sin sincronizar con el final del reveal.
  const { ref: titleGlitchRef, trigger: triggerTitleGlitch } = useGlitch()
  const { scrollYProgress: titleProgress } = useScroll({
    target: titleGlitchRef,
    offset: ['start 0.82', 'start 0.42'],
  })
  const titleEased = useTransform(titleProgress, easeCubicOut)
  const titleMaskY = useTransform(titleEased, (e) => `${(1 - e) * MASK_SHIFT_PCT}%`)

  const glitchDone = useRef(false)
  useMotionValueEvent(titleProgress, 'change', (p) => {
    if (p >= GLITCH_FIRE_AT && !glitchDone.current) {
      glitchDone.current = true
      triggerTitleGlitch() // no-op interno con prefers-reduced-motion
    } else if (p < GLITCH_REARM_AT) {
      glitchDone.current = false
    }
  })

  // --- Fade escalonado de las 3 columnas ligado al scroll del grid.
  // Offset `start center`: progreso 0 cuando el borde superior del grid toca el
  // fondo del viewport; 1 cuando llega al centro. A diferencia de `end end` (que
  // no completa en la última sección: el footer de abajo impide que el borde
  // inferior del grid alcance el fondo del viewport, así el progreso se queda
  // corto y las columnas nunca asientan en opacity 1), con `start center` el
  // progreso máximo alcanzable ronda ~0.74. Por eso los rangos de cada columna
  // completan temprano (≤ 0.55) para revelarse por completo con margen.
  const gridRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'start center'],
  })
  const col1Opacity = useTransform(gridProgress, [0, 0.35], [0, 1])
  const col1Y = useTransform(gridProgress, [0, 0.35], [COL_SHIFT_PX, 0])
  const col2Opacity = useTransform(gridProgress, [0.12, 0.45], [0, 1])
  const col2Y = useTransform(gridProgress, [0.12, 0.45], [COL_SHIFT_PX, 0])
  const col3Opacity = useTransform(gridProgress, [0.24, 0.55], [0, 1])
  const col3Y = useTransform(gridProgress, [0.24, 0.55], [COL_SHIFT_PX, 0])

  return (
    <section
      id="contacto"
      aria-label={t('ariaSection')}
      className="w-full scroll-mt-(--header-h) px-[clamp(20px,4vw,48px)] pt-[clamp(56px,9vw,130px)] pb-0"
    >
      <div className="mx-auto max-w-420">
        {/* Label decorativa [ 06 ]  CONTACTO (corchetes, bloque propio). */}
        <div
          aria-hidden="true"
          className="mb-[clamp(36px,5vw,60px)] font-mono text-[12px] tracking-[0.14em] text-accent"
        >
          <motion.span ref={counterRef}>{counterText}</motion.span>
          {/* Doble espacio del template (colapsado en HTML normal). */}
          {'  '}
          <span>{t('sectionLabel')}</span>
        </div>

        {/* Título gigante HABLE + MOS con mask-reveal ligado al scroll + glitch. */}
        <h2
          ref={titleGlitchRef as RefObject<HTMLHeadingElement | null>}
          className="m-0 mb-[clamp(40px,6vw,72px)] font-sans text-[clamp(56px,13vw,180px)] font-bold uppercase leading-[0.84] tracking-[-0.04em] text-text"
        >
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span
              style={{ y: reduced ? '0%' : titleMaskY }}
              className="block"
            >
              {t('titleLead')}
              {/* Caja ámbar: se revela junto con el resto del título. */}
              <span className="bg-accent px-[0.06em] text-bg">
                {t('titleAccent')}
              </span>
            </motion.span>
          </span>
        </h2>

        {/* Grid de 3 columnas: ESCRIBIME / REDES / ESTADO (fade ligado al scroll). */}
        <div
          ref={gridRef}
          className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(28px,4vw,56px)] pb-[clamp(48px,7vw,90px)]"
        >
          {/* Columna 1 — ESCRIBIME */}
          <motion.div
            style={reduced ? undefined : { opacity: col1Opacity, y: col1Y }}
            className="min-w-0"
          >
            <div aria-hidden="true" className={COLUMN_LABEL}>
              {t('writeMe')}
            </div>
            <address className="not-italic">
              <a
                href={`mailto:${contactInfo.email}`}
                data-cursor
                className="block font-sans text-[clamp(15px,1.7vw,22px)] tracking-[-0.01em] text-text no-underline transition-colors duration-300 ease-signature hover:text-accent hover:underline"
              >
                {contactInfo.email}
              </a>
            </address>
          </motion.div>

          {/* Columna 2 — REDES */}
          <motion.div
            style={reduced ? undefined : { opacity: col2Opacity, y: col2Y }}
          >
            <div aria-hidden="true" className={COLUMN_LABEL}>
              {t('socials')}
            </div>
            <div className="flex flex-col gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('ariaSocial', { name: s.label })}
                  data-cursor
                  className="w-fit font-sans text-[clamp(18px,2vw,22px)] font-medium text-muted no-underline transition-colors duration-300 ease-signature hover:text-text hover:underline"
                >
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Columna 3 — ESTADO */}
          <motion.div
            style={reduced ? undefined : { opacity: col3Opacity, y: col3Y }}
          >
            <div aria-hidden="true" className={COLUMN_LABEL}>
              {t('status')}
            </div>
            <p className="flex items-center gap-2.5 font-mono text-[14px] text-text">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full bg-accent animate-blink"
              />
              {t('available')}
            </p>
            <p className="mt-3 font-mono text-[13px] text-faint">
              {t('localTime')}
              <span className="text-accent">{time}</span>
            </p>
          </motion.div>
        </div>

        {/* Barra de footer: absorbida dentro de la sección de contacto. */}
        <footer
          role="contentinfo"
          aria-label={t('ariaFooter')}
          className="flex flex-wrap items-center justify-between gap-3.5 border-t-[1.5px] border-border pt-6 pb-8 font-mono text-[11px] tracking-[0.06em] text-faint"
        >
          <span>© {year} AGUSTÍN TABARCACHE</span>
          <span>{t('footerTagline')}</span>
          <span>{contactInfo.location.toUpperCase()}</span>
        </footer>
      </div>
    </section>
  )
}

export default Contact
