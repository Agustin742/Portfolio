'use client'

import { useEffect, type RefObject } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, useInView, type Variants } from 'framer-motion'
import { education } from '@/data/education/education'
import { useGlitch, useReducedMotion } from '@/hooks'
import { fadeUp, maskReveal, withReducedMotion } from '@/lib/motion-variants'

// Índice de la sección en el layout (hero=01, about=02, projects=03, stack=04).
const SECTION_LABEL = '[ 05 ]'
// Stagger entre filas (aparecen de arriba hacia abajo, una tras otra).
const ROW_STAGGER = 0.08

// Contenedor orquestador: encadena la entrada `fadeUp` de cada fila.
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: ROW_STAGGER } },
}
const listVariantsReduced: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
}

const EducationSection = () => {
  const t = useTranslations('education')
  const reduced = useReducedMotion()

  // Glitch del <h2> al entrar en viewport (mismo mecanismo que About/Stack).
  const { ref: titleGlitchRef, trigger: triggerTitleGlitch } = useGlitch()
  const titleInView = useInView(titleGlitchRef, { once: true, amount: 0.8 })
  useEffect(() => {
    if (titleInView) triggerTitleGlitch()
  }, [titleInView, triggerTitleGlitch])

  const rowVariants = reduced ? withReducedMotion(fadeUp) : fadeUp
  const containerVariants = reduced ? listVariantsReduced : listVariants

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
            {SECTION_LABEL}
            {/* Doble espacio del template (colapsado en HTML normal). */}
            {'  '}
            <span>{t('sectionLabel')}</span>
          </div>

          {/* Título con mask-reveal + glitch, mismo tratamiento que los demás. */}
          <h2
            ref={titleGlitchRef as RefObject<HTMLHeadingElement | null>}
            className="m-0 font-sans text-[clamp(34px,5vw,64px)] font-bold uppercase tracking-[-0.03em] text-text"
          >
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                variants={reduced ? withReducedMotion(maskReveal) : maskReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
                className="block"
              >
                {t('title')}
              </motion.span>
            </span>
          </h2>
        </div>

        {/* --------------------------- TABLA --------------------------- */}
        <motion.ol
          aria-label={t('ariaList')}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="m-0 list-none border-t-[1.5px] border-border p-0"
        >
          {education.map((item, index) => {
            const number = String(index + 1).padStart(2, '0')
            return (
              <motion.li
                key={item.id}
                variants={rowVariants}
                aria-label={`${item.title} — ${item.institution}, ${item.year}`}
                className="group grid grid-cols-[80px_1fr_auto] items-center gap-[clamp(16px,4vw,48px)] border-b-[1.5px] border-border px-[clamp(8px,2vw,24px)] py-[clamp(22px,3vw,32px)] transition-[background-color] duration-[400ms] ease-signature hover:bg-bg-warm-hover"
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
                  <div className="mt-[6px] flex items-center gap-2.5 font-mono text-[12px] text-muted">
                    {item.logoSrc && (
                      <Image
                        src={item.logoSrc}
                        alt=""
                        aria-hidden="true"
                        width={72}
                        height={18}
                        className="h-[18px] w-auto object-contain"
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
          })}
        </motion.ol>
      </div>
    </section>
  )
}

export default EducationSection
