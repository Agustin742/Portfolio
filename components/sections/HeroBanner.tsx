'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import clsx from 'clsx'
import { useMounted, useSectionCounter } from '@/hooks'
import { useScramble } from '@/hooks/useScramble'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { maskReveal, withReducedMotion, wordStagger } from '@/lib/motion-variants'

const TIME_ZONE = 'America/Argentina/Buenos_Aires'
const TIME_PLACEHOLDER = '--:--:--'
const TITLE_WORDS = ['FULL', 'STACK', 'DEV'] as const
const WORD_DELAYS = [0.05, 0.13, 0.21] as const
const PARALLAX_FACTOR = 0.06
const TICKER_SEPARATOR = '✱'

/**
 * Media query reactivo y SSR-safe vía `useSyncExternalStore` (mismo patrón
 * sancionado que `useMounted`/`useReducedMotion`). Devuelve `false` en el
 * servidor y en el primer render de hidratación, así el parallax arranca
 * desactivado y no hay mismatch. El breakpoint 768px coincide con `md` de
 * Tailwind (única forma de gatear una animación JS por viewport).
 */
function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === 'undefined') return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    [query],
  )
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

interface InfoRowProps {
  label: string
  children: React.ReactNode
  valueClassName?: string
}

/** Fila etiqueta/valor de la columna de info. Separador inferior tokenizado. */
function InfoRow({ label, children, valueClassName }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-1.5 border-b-[1.5px] border-border py-4 md:px-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <span
        className={clsx(
          'font-mono text-[15px] font-bold uppercase tracking-[0.02em] text-text',
          valueClassName,
        )}
      >
        {children}
      </span>
    </div>
  )
}

const HeroBanner = () => {
  const t = useTranslations('hero')
  const locale = useLocale()
  const mounted = useMounted()
  const reduced = useReducedMotion()

  const roleLabel = `${t('role.prefix')} ${t('role.highlight')}`.toUpperCase()

  // --- Scramble para la palabra DEV ---
  const { text: devText, trigger: triggerDev } = useScramble('DEV')

  // --- Parallax vertical leve del título (desactivado en mobile) ---
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, (value) => value * PARALLAX_FACTOR)

  // --- Counter [00] -> [01] al entrar en viewport ---
  const { ref: counterRef, text: counterText } = useSectionCounter(1)

  // --- Reloj en vivo (hydration-safe: placeholder hasta montar) ---
  const [time, setTime] = useState(TIME_PLACEHOLDER)

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale, {
      timeZone: TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const update = () => setTime(formatter.format(new Date()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [locale])

  const maskVariants = reduced ? withReducedMotion(maskReveal) : maskReveal
  const wordVariants = reduced ? withReducedMotion(wordStagger) : wordStagger

  const descriptionWords = t('description').split(' ')
  const tickerSegments = t('ticker').split(TICKER_SEPARATOR)

  const tickerGroup = (
    <span className="flex shrink-0 items-center whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.15em]">
      {tickerSegments.map((segment, index) => (
        <span key={index} className="flex items-center">
          <span className="px-2 text-text">{segment.trim()}</span>
          <span className="px-2 text-accent">{TICKER_SEPARATOR}</span>
        </span>
      ))}
    </span>
  )

  return (
    <section
      id="hero"
      aria-label="Hero — Presentación"
      className="relative flex min-h-[calc(100dvh-var(--header-h))] w-full scroll-mt-(--header-h) flex-col overflow-hidden md:w-screen"
    >
      <div className="flex flex-1 flex-col gap-10 py-16 md:flex-row md:gap-0 md:py-0">
        {/* Columna izquierda: eyebrow + título + descripción */}
        <div className="flex flex-1 flex-col justify-center md:justify-between md:px-[clamp(20px,4vw,48px)]">
          {/* Eyebrow con counter */}
          <div className="mb-6 mt-6 flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <motion.span ref={counterRef} className="text-accent">
              {counterText}
            </motion.span>
            <span aria-hidden className="text-border">
              —
            </span>
            <span>{roleLabel}</span>
          </div>

          {/* Título */}
          <motion.h1
            style={{ y: isDesktop ? parallaxY : 0 }}
            className="font-sans text-[clamp(64px,11vw,150px)] font-bold uppercase leading-[0.82] tracking-[-0.04em]"
          >
            {TITLE_WORDS.map((word, index) => {
              const isDev = word === 'DEV'
              return (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    variants={maskVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: WORD_DELAYS[index] }}
                    onMouseEnter={isDev ? triggerDev : undefined}
                    data-cursor={isDev ? true : undefined}
                    aria-label={isDev ? 'Developer, con acento visual' : undefined}
                    className={clsx(
                      'block',
                      isDev && 'w-fit bg-accent px-[0.08em] text-bg',
                    )}
                  >
                    {isDev ? devText : word}
                  </motion.span>
                </span>
              )
            })}
          </motion.h1>

          {/* Descripción con stagger palabra por palabra */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-8 max-w-115 font-mono text-[15px] leading-[1.7] text-muted md:mt-0"
          >
            {descriptionWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                custom={index}
                variants={wordVariants}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Columna derecha: info */}
        <aside className="w-full shrink-0 md:flex md:w-[clamp(240px,26vw,340px)] md:flex-col md:border-l-[1.5px] md:border-border">
          <InfoRow label={t('labels.role')}>{roleLabel}</InfoRow>
          <InfoRow label={t('labels.location')}>{t('location')}</InfoRow>
          <InfoRow label={t('labels.stack')}>{t('stack')}</InfoRow>
          <InfoRow label={t('localTime')} valueClassName="text-accent">
            {mounted ? time : TIME_PLACEHOLDER}
          </InfoRow>

          {/* Fila de disponibilidad destacada */}
          <div className="mt-4 flex items-center gap-2.5 bg-accent px-3 py-3 md:mt-0 md:min-h-16 md:flex-1 md:px-6">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-bg animate-blink"
            />
            <span className="font-mono text-[13px] font-bold uppercase tracking-[0.08em] text-bg">
              {t('available')}
            </span>
          </div>
        </aside>
      </div>

      {/* Ticker / marquee */}
      <div
        aria-hidden
        className="overflow-hidden border-t-[1.5px] border-border py-2.75"
      >
        <div className="flex w-max animate-marquee">
          {tickerGroup}
          {tickerGroup}
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
