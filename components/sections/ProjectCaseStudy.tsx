'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import clsx from 'clsx'
import { FiArrowDown } from 'react-icons/fi'
import { projects, getProjectBySlug } from '@/data/projects/projects'
import { usePageNavigate } from '@/hooks'

/** Bloque técnico de "Lo que construí" (resuelto vía `t.raw`, ver projects.ts). */
interface BuiltBlock {
  title: string
  description: string
}

interface ProjectCaseStudyProps {
  /** Slug validado en la page server (que ya resolvió el `notFound`). */
  slug: string
}

const CONTENT_PADDING = 'px-[clamp(20px,5vw,48px)]'
const SECTION_LABEL =
  'font-mono text-[12px] uppercase tracking-[0.14em] text-accent'
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

/**
 * Case study individual de un proyecto (RFC-16). Es client component porque usa
 * `usePageNavigate` (cortina wipe), `useTranslations` y un `IntersectionObserver`
 * para el botón sticky. Recibe solo el `slug` (serializable) y resuelve el resto
 * de `data/projects` internamente, evitando pasar los `techStacks` (que llevan
 * componentes de icono no serializables) a través del boundary server→client.
 */
export default function ProjectCaseStudy({ slug }: ProjectCaseStudyProps) {
  const t = useTranslations('projects')
  const locale = useLocale()
  const navigate = usePageNavigate()

  // Sentinel bajo el topbar + observer: el botón sticky aparece cuando el
  // topbar sale del viewport. Estado inicial `false` (sentinel visible al
  // cargar) para no mostrar un flash del botón antes de scrollear.
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { rootMargin: '0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const project = getProjectBySlug(slug)
  // La page ya llamó `notFound()`; este guard es defensivo (y estrecha el tipo).
  if (!project) return null

  const index = projects.findIndex((p) => p.slug === slug)
  const total = String(projects.length).padStart(2, '0')
  const currentNumber = String(index + 1).padStart(2, '0')
  const nextProject = projects[(index + 1) % projects.length]

  const title = t(project.title)
  const category = t(project.category)
  const lede = t(project.lede)
  const role = t(project.role)
  const client = t(project.client)
  const challengeHeadline = t(project.caseStudy.challenge.headline)
  const challengeBody = t(project.caseStudy.challenge.body)
  const built = t.raw(project.caseStudy.built) as BuiltBlock[]
  const builtBlocks = Array.isArray(built) ? built : []
  const results = project.caseStudy.results
  const stack = project.stack.join(' · ')

  const nextTitle = t(nextProject.title)

  const homeHref = `/${locale}`
  const cvHref = `/cv/agustin-tabarcache-cv-${locale}.pdf`
  const nextHref = `/${locale}/proyectos/${nextProject.slug}`

  // `navigate` (next-intl) antepone el locale actual, por eso recibe rutas sin
  // prefijo. El `href` del ancla queda con prefijo para el fallback (nueva pestaña).
  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate('/')
  }
  const goNext = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    navigate(`/proyectos/${nextProject.slug}`)
  }

  return (
    <main id="main-content" className="relative overflow-x-clip">
      {/* Botón sticky VOLVER: fuera del flujo, aparece al salir el topbar. */}
      <a
        href={homeHref}
        onClick={goHome}
        aria-label={t('detail.ariaBackHome')}
        data-cursor
        className={clsx(
          'fixed left-4 top-4 z-70 inline-flex items-center gap-2 border-[1.5px] border-border bg-bg/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text backdrop-blur-sm transition-all duration-300 ease-signature hover:border-accent hover:text-accent min-[820px]:px-4 min-[820px]:text-[12px]',
          FOCUS_RING,
          showSticky
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0',
        )}
      >
        <span aria-hidden="true">←</span>
        {t('detail.backShort')}
      </a>

      <div className="mx-auto max-w-300">
        {/* -------------------------- Topbar -------------------------- */}
        <div
          className={clsx(
            'flex items-center justify-between gap-4 py-[clamp(20px,3vw,32px)]',
            CONTENT_PADDING,
          )}
        >
          <a
            href={homeHref}
            onClick={goHome}
            aria-label={t('detail.ariaBackHome')}
            data-cursor
            className={clsx(
              'group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted transition-colors duration-300 ease-signature hover:text-text',
              FOCUS_RING,
            )}
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-signature group-hover:-translate-x-0.5"
            >
              ←
            </span>
            <span className="hidden min-[520px]:inline">
              {t('detail.backHome')}
            </span>
            <span className="min-[520px]:hidden">{t('detail.backShort')}</span>
          </a>

          <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-faint">
            {t('detail.projectLabel')} {currentNumber}{' '}
            <span className="text-accent">/</span> {total}
          </span>

          <a
            href={cvHref}
            download
            data-cursor
            aria-label={t('detail.ariaCv')}
            className={clsx(
              'group inline-flex items-center gap-1.5 border-[1.5px] border-accent bg-accent px-3 py-1.5 font-mono text-[12px] font-bold text-bg transition duration-300 ease-signature hover:-translate-y-0.5 hover:border-accent-hi hover:bg-accent-hi',
              FOCUS_RING,
            )}
          >
            CV
            <FiArrowDown
              aria-hidden="true"
              className="transition-transform duration-300 ease-signature group-hover:translate-y-0.5"
            />
          </a>
        </div>

        {/* Sentinel del observer: al salir del viewport aparece el sticky. */}
        <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />

        <article aria-label={t('detail.ariaArticle', { title })}>
          {/* --------------------------- Hero --------------------------- */}
          <header
            className={clsx(
              'pt-[clamp(24px,4vw,48px)] pb-[clamp(28px,4vw,56px)]',
              CONTENT_PADDING,
            )}
          >
            <p className="mb-[clamp(20px,3vw,32px)] font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
              ( {category} )
            </p>

            <h1 className="font-sans font-semibold uppercase leading-[0.94] tracking-[-0.03em] text-text text-[clamp(40px,8vw,118px)]">
              {title}
            </h1>

            <p className="mt-[clamp(20px,3vw,32px)] max-w-[62ch] font-mono text-[14px] leading-[1.75] text-muted">
              {lede}
            </p>

            {/* Grid meta: 2 col mobile, 4 col ≥820px */}
            <dl className="mt-[clamp(28px,4vw,48px)] grid grid-cols-2 gap-[clamp(16px,3vw,32px)] border-t-[1.5px] border-border pt-[clamp(20px,3vw,32px)] min-[820px]:grid-cols-4">
              <MetaItem label={t('detail.metaRole')} value={role} />
              <MetaItem label={t('detail.metaYear')} value={String(project.year)} />
              <MetaItem label={t('detail.metaClient')} value={client} />
              <MetaItem label={t('detail.metaStack')} value={stack} />
            </dl>
          </header>

          {/* --------------------- Imagen hero full-bleed --------------------- */}
          <div className={CONTENT_PADDING}>
            <div className="relative h-[clamp(280px,52vw,640px)] w-full overflow-hidden border-[1.5px] border-border bg-bg-card">
              <Image
                src={project.image}
                alt={title}
                fill
                sizes="(min-width: 1200px) 1200px, 100vw"
                priority
                className="object-cover"
              />
              {/* Cuadrado decorativo ámbar, esquina inferior izquierda */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-13.5 w-13.5 bg-accent"
              />
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 font-mono text-[11px] uppercase tracking-[0.12em] text-text mix-blend-difference"
              >
                {t('detail.figOverview')}
              </span>
            </div>
          </div>

          {/* ----------------------- [ 01 ] EL DESAFÍO ----------------------- */}
          <section
            aria-label={t('detail.ariaChallenge')}
            className={clsx(
              'py-[clamp(48px,7vw,96px)]',
              CONTENT_PADDING,
            )}
          >
            <p aria-hidden="true" className={clsx('mb-[clamp(24px,4vw,40px)]', SECTION_LABEL)}>
              [ 01 ]{'  '}{t('detail.challengeLabel')}
            </p>
            <div className="grid gap-[clamp(20px,3vw,40px)] min-[820px]:grid-cols-[1fr_1fr]">
              <h2 className="font-sans font-medium leading-[1.15] tracking-[-0.02em] text-text text-[clamp(20px,2.4vw,30px)]">
                {challengeHeadline}
              </h2>
              <p className="font-mono text-[13.5px] leading-[1.8] text-muted">
                {challengeBody}
              </p>
            </div>
          </section>

          {/* -------------------- [ 02 ] LO QUE CONSTRUÍ -------------------- */}
          <section
            aria-label={t('detail.ariaBuilt')}
            className={clsx('bg-bg-warm py-[clamp(48px,7vw,96px)]', CONTENT_PADDING)}
          >
            <div className="mb-[clamp(28px,4vw,48px)] flex flex-wrap items-baseline justify-between gap-4">
              <p aria-hidden="true" className={SECTION_LABEL}>
                [ 02 ]{'  '}{t('detail.builtLabel')}
              </p>
              <h2 className="font-sans font-semibold uppercase tracking-[-0.01em] text-text text-[clamp(20px,2.4vw,32px)]">
                {t('detail.architecture')}
              </h2>
            </div>

            <ol className="grid grid-cols-1 gap-x-[clamp(24px,4vw,56px)] gap-y-[clamp(24px,4vw,44px)] min-[820px]:grid-cols-2">
              {builtBlocks.map((block, i) => (
                <li
                  key={`${block.title}-${i}`}
                  className="flex gap-4 border-t-[1.5px] border-border pt-5"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[13px] text-accent"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-sans text-[clamp(16px,1.6vw,20px)] font-semibold leading-tight text-text">
                      {block.title}
                    </h3>
                    <p className="mt-2 font-mono text-[13px] leading-[1.75] text-muted">
                      {block.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------------------- Resultados (condicional) ---------------------- */}
          {results && results.length > 0 && (
            <section
              aria-label={t('detail.ariaResults')}
              className={clsx('py-[clamp(48px,7vw,96px)]', CONTENT_PADDING)}
            >
              <p aria-hidden="true" className={clsx('mb-[clamp(24px,4vw,40px)]', SECTION_LABEL)}>
                {t('detail.resultsLabel')}
              </p>
              <dl className="grid grid-cols-2 gap-[clamp(20px,3vw,40px)] min-[820px]:grid-cols-4">
                {results.map((result) => (
                  <div
                    key={result.label}
                    className="border-t-[1.5px] border-border pt-5"
                  >
                    <dd className="font-sans text-[clamp(32px,4vw,56px)] font-semibold leading-none tracking-[-0.03em] text-accent">
                      {result.value}
                    </dd>
                    <dt className="mt-3 font-mono text-[12px] uppercase tracking-widest text-muted">
                      {result.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* ------------------------- [ 03 ] GALERÍA ------------------------- */}
          <section
            aria-label={t('detail.ariaGallery')}
            className={clsx('py-[clamp(48px,7vw,96px)]', CONTENT_PADDING)}
          >
            <p aria-hidden="true" className={clsx('mb-[clamp(24px,4vw,40px)]', SECTION_LABEL)}>
              [ 03 ]{'  '}{t('detail.galleryLabel')}
            </p>

            <div className="grid grid-cols-1 gap-4 min-[820px]:grid-cols-2">
              {/* Galería vacía por ahora (RFC-16): placeholder tenue.
                  Cuando `project.gallery` se llene, cada imagen sería una card:

                  {project.gallery?.map((src, i) => (
                    <div
                      key={src}
                      className={clsx(
                        'gcard group relative aspect-video overflow-hidden border-[1.5px] border-border transition-transform duration-300 ease-signature hover:-translate-y-1.5',
                        i === 0 && 'min-[820px]:col-span-2',
                      )}
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-[38px] w-[38px] bg-accent transition-all duration-300 ease-signature group-hover:h-[54px] group-hover:w-[54px]"
                      />
                    </div>
                  ))}
              */}
              <div className="col-span-full flex min-h-[clamp(160px,24vw,280px)] items-center justify-center border-[1.5px] border-dashed border-border">
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-faint">
                  {t('detail.comingSoon')}
                </span>
              </div>
            </div>
          </section>

          {/* --------------------- Siguiente proyecto --------------------- */}
          <nav
            aria-label={t('detail.ariaNext')}
            className="border-t-[1.5px] border-border"
          >
            <a
              href={nextHref}
              onClick={goNext}
              aria-label={t('detail.ariaViewNext', { title: nextTitle })}
              data-cursor
              className={clsx(
                'group flex flex-col gap-3 py-[clamp(40px,6vw,80px)] transition-[padding] duration-500 ease-signature hover:pl-[clamp(28px,4vw,56px)]',
                CONTENT_PADDING,
                FOCUS_RING,
              )}
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                {t('detail.nextProject')}
              </span>
              <span className="flex items-center gap-4 font-sans font-semibold uppercase leading-none tracking-[-0.02em] text-text text-[clamp(28px,5vw,64px)]">
                {nextTitle}
                <span
                  aria-hidden="true"
                  className="text-accent transition-transform duration-300 ease-signature group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </span>
            </a>
          </nav>
        </article>
      </div>
    </main>
  )
}

/** Celda del grid meta del hero (ROL / AÑO / CLIENTE / STACK). */
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        {label}
      </dt>
      <dd className="mt-2 font-mono text-[13px] leading-[1.6] text-text">
        {value}
      </dd>
    </div>
  )
}
