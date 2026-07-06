'use client'

import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

interface ProjectLinksProps {
  /** Links del proyecto; cada botón se renderiza solo si su URL existe. */
  links: { gitHub?: string; web?: string }
  /**
   * `compact` (default): botones icon-only cuadrados, para el footer de las
   * cards. `full`: ícono + label, para el hero de la página de detalle.
   */
  variant?: 'compact' | 'full'
  /** Título del proyecto, para desambiguar el aria-label entre varias cards. */
  title?: string
  /** Clases del contenedor (posicionamiento/stacking según el consumidor). */
  className?: string
}

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

/**
 * Botones de enlace externo (GitHub / sitio en producción) de un proyecto.
 * Renderiza cada botón solo si su URL está presente y no vacía; si no hay
 * ninguna, devuelve `null`. Pensado para vivir por encima de un "stretched
 * link" (la card entera es un ancla al case study): en `compact` los botones
 * llevan `relative z-2` para quedar por encima del overlay y seguir siendo
 * clickeables sin anidar anclas.
 */
export default function ProjectLinks({
  links,
  variant = 'compact',
  title,
  className,
}: ProjectLinksProps) {
  const t = useTranslations('projects.buttons')

  const hasGit = Boolean(links.gitHub)
  const hasWeb = Boolean(links.web)
  if (!hasGit && !hasWeb) return null

  const label = (base: string) => (title ? `${base} — ${title}` : base)

  // Sin color de texto en el base: cada variante fija el suyo, así no compiten
  // `text-*` (el ganador dependería del orden de emisión del CSS, no de clsx).
  const baseButton =
    'inline-flex items-center border-[1.5px] border-border transition-colors duration-300 ease-signature hover:border-accent hover:text-accent'

  const compact =
    'relative z-2 h-9 w-9 justify-center bg-bg/80 backdrop-blur-sm text-text'
  const full =
    'gap-2.5 px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] text-text'

  const buttonClass = clsx(
    baseButton,
    variant === 'compact' ? compact : full,
    FOCUS_RING,
  )

  return (
    <div className={clsx('flex items-center gap-2.5', className)}>
      {hasGit && (
        <a
          href={links.gitHub}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          aria-label={label(t('gitButton'))}
          title={label(t('gitButton'))}
          className={buttonClass}
        >
          <FiGithub aria-hidden="true" />
          {variant === 'full' && <span>{t('gitButton')}</span>}
        </a>
      )}

      {hasWeb && (
        <a
          href={links.web}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          aria-label={label(t('webButton'))}
          title={label(t('webButton'))}
          className={buttonClass}
        >
          <FiExternalLink aria-hidden="true" />
          {variant === 'full' && <span>{t('webButton')}</span>}
        </a>
      )}
    </div>
  )
}
