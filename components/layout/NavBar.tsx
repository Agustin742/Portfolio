'use client'

import { Fade as Hamburger } from 'hamburger-react'
import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { FiArrowDown } from 'react-icons/fi'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageToggle from '../ui/LanguageToggle'
import { useScramble } from '@/hooks/useScramble'

type NavLabelKey = 'about' | 'projects' | 'stack' | 'contact' | 'education'

type NavItem = { href: string; labelKey: NavLabelKey }

const NAV_ITEMS: readonly NavItem[] = [
  { href: '#sobre', labelKey: 'about' },
  { href: '#proyectos', labelKey: 'projects' },
  { href: '#stack', labelKey: 'stack' },
  { href: '#formacion', labelKey: 'education' },
  { href: '#contacto', labelKey: 'contact' },
] as const

interface NavLinkProps {
  href: string
  label: string
  onNavigate?: () => void
  ref?: React.Ref<HTMLAnchorElement>
}

/**
 * Link de navegación con scramble al hover + underline animado. `useScramble`
 * es un hook, por eso vive acá (un componente por link) y no dentro del `.map`.
 * En React 19 `ref` es un prop normal, sin necesidad de `forwardRef`.
 */
function NavLink({ href, label, onNavigate, ref }: NavLinkProps) {
  const { text, trigger } = useScramble(label.toUpperCase().replace(/\s+/g, '_'))

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      onMouseEnter={trigger}
      onFocus={trigger}
      onClick={onNavigate}
      data-cursor
      className="group relative inline-flex items-center font-mono text-[12px] tracking-[0.04em] text-muted transition-colors duration-300 ease-signature hover:text-text focus-visible:text-text focus-visible:outline-none"
    >
      <span aria-hidden>[</span>
      <span aria-hidden className="mx-1.5">
        {text}
      </span>
      <span aria-hidden>]</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-400 ease-signature group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </a>
  )
}

interface CvButtonProps {
  href: string
  onNavigate?: () => void
}

function CvButton({ href, onNavigate }: CvButtonProps) {
  return (
    <a
      href={href}
      download
      onClick={onNavigate}
      data-cursor
      aria-label="Descargar CV"
      className="group inline-flex items-center gap-1.5 border-[1.5px] border-accent bg-accent px-3 py-1.5 font-mono text-[12px] font-bold text-bg transition duration-300 ease-signature hover:-translate-y-0.5 hover:border-accent-hi hover:bg-accent-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      CV
      <FiArrowDown
        aria-hidden
        className="transition-transform duration-300 ease-signature group-hover:translate-y-0.5"
      />
    </a>
  )
}

export default function NavBar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const hamburgerWrapRef = useRef<HTMLDivElement>(null)

  const cvHref = `/cv/agustin-tabarcache-cv-${locale}.pdf`

  // Al abrir el menú mobile: mover el foco al primer link y, mientras esté
  // abierto, cerrar con Escape devolviendo el foco al botón hamburger.
  useEffect(() => {
    if (!isOpen) return
    firstLinkRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        hamburgerWrapRef.current
          ?.querySelector<HTMLElement>('.hamburger-react')
          ?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // hamburger-react renderiza su propio <div role="button"> con aria-expanded y
  // aria-label, pero no expone aria-controls; lo añadimos sobre ese nodo.
  useEffect(() => {
    hamburgerWrapRef.current
      ?.querySelector('.hamburger-react')
      ?.setAttribute('aria-controls', 'nav-menu')
  }, [])

  // Mide el alto real del header y lo publica en `--header-h` (única fuente de
  // verdad del offset de layout). Los valores de globals.css son solo el
  // fallback SSR/no-JS; acá los reemplazamos con la medición runtime apenas está
  // disponible, así el offset sigue el alto real en cualquier breakpoint o si
  // cambia el contenido (idioma, wrap de links) sin hardcodear valores. Usamos
  // `offsetHeight` porque incluye el borde inferior (`border-b-[1.5px]`), a
  // diferencia de `contentRect.height`.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const setHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--header-h',
        `${header.offsetHeight}px`,
      )
    }
    const resizeObserver = new ResizeObserver(setHeaderHeight)
    resizeObserver.observe(header)
    setHeaderHeight()
    return () => resizeObserver.disconnect()
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-50 w-full border-b-[1.5px] border-border bg-bg/70 py-5 px-[clamp(20px,4vw,48px)] backdrop-blur-sm"
    >
      <a
        href="#main-content"
        className="sr-only rounded-none focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:border-[1.5px] focus:border-accent focus:bg-bg focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:text-text focus:outline-none"
      >
        {t('skipToContent')}
      </a>

      <nav aria-label="Navegación principal" id="nav-menu">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <a
            href={`/${locale}#hero`}
            data-cursor
            className="font-mono text-[13px] font-bold tracking-tight text-text transition-colors duration-300 ease-signature hover:text-accent focus-visible:text-accent focus-visible:outline-none"
          >
            AGUSTÍN TABARCACHE<span className="text-accent">.DEV</span>
          </a>

          {/* Links desktop */}
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={`/${locale}${item.href}`} label={t(item.labelKey)} />
              </li>
            ))}
          </ul>

          {/* Cluster derecho desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <LanguageToggle />
            <CvButton href={cvHref} />
          </div>

          {/* Hamburger mobile */}
          <div ref={hamburgerWrapRef} className="flex items-center md:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={22}
              rounded
              color="var(--color-text)"
              label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            />
          </div>
        </div>

        {/* Menú mobile */}
        {isOpen && (
          <div className="mt-5 flex flex-col gap-6 border-t-[1.5px] border-border pt-6 md:hidden">
            <ul className="flex flex-col gap-5">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.href}>
                  <NavLink
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`/${locale}${item.href}`}
                    label={t(item.labelKey)}
                    onNavigate={closeMenu}
                  />
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <LanguageToggle />
              <CvButton href={cvHref} onNavigate={closeMenu} />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
