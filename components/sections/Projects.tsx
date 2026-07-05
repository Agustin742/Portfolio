'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import clsx from 'clsx'
import { projects } from '@/data/projects/projects'
import ProjectLinks from '@/components/commons/ProjectLinks'
import {
  useGlitch,
  usePageNavigate,
  useReducedMotion,
  useSectionCounter,
} from '@/hooks'
import { maskReveal, withReducedMotion } from '@/lib/motion-variants'

const PROJECT_COUNT = projects.length
// Total del contador grande: "NN / 03".
const COUNTER_TOTAL = String(PROJECT_COUNT).padStart(2, '0')
// A partir de 860px (breakpoint del template, no default de Tailwind) rige el
// layout sticky; por debajo, columna estática. Solo variantes min-[860px]:.
const IMAGE_SIZES = '(min-width: 860px) 64vw, 100vw'
// Separador visual del stack en el footer de la card.
const STACK_SEPARATOR = ' · '
// Breakpoint del layout sticky (mismo 860px del template, no default Tailwind).
const DESKTOP_QUERY = '(min-width: 860px)'

/**
 * Media query reactivo y SSR-safe vía `useSyncExternalStore` (mismo patrón que
 * `HeroBanner`/`useReducedMotion`). Devuelve `false` en el servidor y en el
 * primer render de hidratación, así ninguna card recibe `inert` hasta saber si
 * estamos en desktop (evita mismatch y deja las cards accesibles en mobile).
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

const Projects = () => {
  const t = useTranslations('projects')
  const navigate = usePageNavigate()
  const reduced = useReducedMotion()
  // ≥860px: layout sticky con crossfade. Gobierna el `inert` de las cards
  // inactivas (que en desktop siguen en el DOM con opacity:0).
  const isDesktop = useMediaQuery(DESKTOP_QUERY)

  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  // Espejo del índice para comparar dentro del listener sin re-suscribirse.
  const activeIndexRef = useRef(0)

  // Dos instancias de glitch: título (one-shot al entrar) y contador (por
  // cambio de índice). Desestructuradas en el call-site: la regla
  // react-hooks/refs no permite acceder a propiedades de un objeto que
  // contiene un ref durante el render.
  const { ref: titleGlitchRef, trigger: triggerTitleGlitch } = useGlitch()
  const { ref: counterGlitchRef, trigger: triggerCounterGlitch } = useGlitch()

  // Contador [ 00 ] → [ 03 ] al entrar el label en viewport (índice de sección).
  const { ref: labelCounterRef, text: labelCounterText } = useSectionCounter(3)

  // Progreso 0→1 a lo largo del track de 330vh (sticky de 100vh adentro).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Deriva activeIndex en PROJECT_COUNT rangos iguales. Solo toca estado
  // React cuando el índice realmente cambia (no en cada frame de scroll).
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const next = Math.min(
      PROJECT_COUNT - 1,
      Math.max(0, Math.floor(progress * PROJECT_COUNT)),
    )
    if (next === activeIndexRef.current) return
    activeIndexRef.current = next
    setActiveIndex(next)
    triggerCounterGlitch() // no-op interno con prefers-reduced-motion
  })

  // Glitch burst del título cuando la sección entra en viewport (una vez).
  const titleInView = useInView(titleGlitchRef, { once: true, amount: 0.8 })
  useEffect(() => {
    if (titleInView) triggerTitleGlitch()
  }, [titleInView, triggerTitleGlitch])

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      aria-label={t('ariaSection')}
      // Track de ~110vh por proyecto (template: 440vh / 4 → acá 330vh / 3).
      // Literal fijo: Tailwind extrae clases estáticamente, no interpola.
      // Full-bleed: cancela el padding real del <main> con márgenes negativos
      // exactos (-mx-6 mobile / -mx-11 md) y compensa el ancho (calc(100%+3rem/
      // 5.5rem)), en vez de left-1/2 + w-screen. Seguro porque <main> es
      // overflow-x-clip. Los paneles LEFT/RIGHT ponen el padding interno.
      className="w-[calc(100%+3rem)] -mx-6 md:w-[calc(100%+5.5rem)] md:pl-12 md:-mx-11 scroll-mt-(--header-h) min-[860px]:h-[550vh]"
    >
      {/* Contenedor pinneado: sticky bajo el navbar (top = --header-h) y alto
          = viewport menos el header, para que el panel entre completo. */}
      <div className="flex flex-col min-[860px]:sticky min-[860px]:top-(--header-h) min-[860px]:h-[calc(100dvh-var(--header-h))] min-[860px]:flex-row min-[860px]:overflow-hidden">
        {/* ------------------- LEFT: panel estático ------------------- */}
        <div className="flex flex-col gap-8 border-border bg-bg-projects p-[clamp(24px,4vw,48px)] min-[860px]:w-[clamp(300px,36vw,470px)] min-[860px]:shrink-0 min-[860px]:justify-between min-[860px]:border-r-[1.5px]">
          <div>
            {/* Label de sección: mismo patrón [ NN ] doble espacio de AboutMe */}
            <div
              aria-hidden="true"
              className="mb-[clamp(20px,3vw,36px)] font-mono text-[12px] uppercase tracking-[0.14em] text-accent"
            >
              <motion.span ref={labelCounterRef}>{labelCounterText}</motion.span>
              {/* Doble espacio del template (el HTML colapsa espacios normales) */}
              {'  '}
              <span>{t('sectionTitle')}</span>
            </div>

            {/* Mask reveal (sube 115%→0 tras la máscara) + glitch al asentarse,
                mismo mecanismo que los headings de About/Stack. El glitch sigue
                disparando sobre el <h2> (textShadow/transform directo al nodo),
                sin interferir con el motion.span interno del reveal. */}
            <h2
              ref={titleGlitchRef as RefObject<HTMLHeadingElement | null>}
              className="font-sans text-[clamp(34px,4vw,54px)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-text"
            >
              <motion.span
                className="block overflow-hidden pb-[0.1em]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
              >
                <motion.span
                  variants={reduced ? withReducedMotion(maskReveal) : maskReveal}
                  className="block"
                >
                  {t('sectionTitle')}
                </motion.span>
              </motion.span>
            </h2>

            <p className="mt-4 max-w-70 font-mono text-[13px] leading-[1.7] text-muted">
              {t('sectionSubtitle')}
            </p>
          </div>

          {/* Contador + progress bars + hint: solo en el layout sticky */}
          <div className="hidden min-[860px]:block">
            <p
              ref={counterGlitchRef as RefObject<HTMLParagraphElement | null>}
              className="font-sans text-[clamp(56px,7vw,104px)] font-semibold leading-none tracking-[-0.04em] text-accent"
            >
              {String(activeIndex + 1).padStart(2, '0')}
              <span className="text-[0.38em] font-normal text-muted">
                {' / '}
                {COUNTER_TOTAL}
              </span>
            </p>

            {/* Progress bars: completadas/activa en accent, resto en border */}
            <div aria-hidden="true" className="mt-7 flex gap-2">
              {projects.map((project, index) => (
                <span
                  key={project.title}
                  className={clsx(
                    'h-0.5 flex-1 transition-colors duration-700 ease-signature',
                    index <= activeIndex ? 'bg-accent' : 'bg-border',
                  )}
                />
              ))}
            </div>

            <p className="mt-9 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span
                aria-hidden="true"
                className="inline-block text-accent animate-scrollpulse motion-reduce:animate-none"
              >
                ↓
              </span>
              {t('scrollHint')}
            </p>
          </div>
        </div>

        {/* --------------- RIGHT: cards que rotan con el scroll --------------- */}
        <div className="relative min-w-0 flex-1 p-[clamp(20px,3vw,40px)] min-[860px]:h-full">
          <ul
            aria-label={t('ariaList')}
            className="flex flex-col gap-14 min-[860px]:relative min-[860px]:block min-[860px]:h-full"
          >
            {projects.map((project, index) => {
              const title = t(project.title)
              const stack = project.techStacks
                .map((tech) => tech.label)
                .join(STACK_SEPARATOR)
              // Ruta real del case study (RFC-16): construida con el `slug`
              // canónico del proyecto, no con el título traducido (que daría un
              // slug distinto por idioma y no matchea la ruta). `navigate`
              // (next-intl) antepone el locale actual al hacer push.
              const href = `/proyectos/${project.slug}`
              const isActive = index === activeIndex

              return (
                <li
                  key={project.title}
                  // Fuera del tab order y del árbol ARIA en desktop sin usar
                  // `visibility` (que rompía el fundido con su salto discreto):
                  // `inert` quita foco + interacción + accesibilidad. En mobile
                  // (isDesktop=false) las 3 cards quedan apiladas e interactivas.
                  inert={!isActive && isDesktop}
                  className={clsx(
                    // `relative group`: ancla el stretched-link (overlay que hace
                    // clickeable toda la card) y habilita el group-hover de la
                    // imagen/flecha aunque el ancla sea un hermano del contenido.
                    'relative group',
                    // Desktop: stack absoluto con crossfade (solo opacity+transform,
                    // sin visibility). z + pointer-events controlan el apilado.
                    // El z va condicionado por estado (no en base + override) para
                    // que no dependa del orden de emisión del CSS de Tailwind.
                    'min-[860px]:absolute min-[860px]:inset-0 min-[860px]:transition-[opacity,transform] min-[860px]:duration-700 min-[860px]:ease-signature motion-reduce:transition-none',
                    // Card activa: al frente (z alto), interactiva, sin desplazar.
                    isActive && 'min-[860px]:z-2',
                    // Card inactiva: fundida (opacity 0), z bajo, sin puntero y
                    // desplazada 26px (solo con motion; en reduced-motion corte
                    // directo de opacidad sin translate).
                    !isActive &&
                      'min-[860px]:pointer-events-none min-[860px]:z-1 min-[860px]:opacity-0 min-[860px]:motion-safe:translate-y-6.5',
                  )}
                >
                  {/* Contenido (no interactivo salvo los botones): la navegación
                      al case study la resuelve el stretched-link de abajo. */}
                  <div className="flex h-full flex-col">
                    {/* Imagen: aspect fijo en mobile, flex-1 dentro del sticky */}
                    <div className="relative aspect-video w-full overflow-hidden border-[1.5px] border-border bg-bg-card min-[860px]:aspect-auto min-[860px]:min-h-0 min-[860px]:flex-1">
                      <Image
                        src={project.image}
                        alt={title}
                        fill
                        sizes={IMAGE_SIZES}
                        className="object-cover transition-transform duration-700 ease-signature group-hover:scale-103 motion-reduce:transition-none"
                      />
                      {/* Enlaces externos en la esquina inferior izquierda de la
                          imagen: no alteran la altura del footer (que en el layout
                          sticky es sensible al recorte) y quedan por encima del
                          overlay vía `relative z-2` dentro de ProjectLinks. */}
                      <ProjectLinks
                        links={project.links}
                        title={title}
                        className="absolute bottom-3 left-3"
                      />
                    </div>

                    {/* Footer de card: título / stack / año + indicador */}
                    <div className="mt-5 flex flex-col gap-2">
                      <h3 className="font-sans text-[clamp(24px,2.8vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-text">
                        {title}
                      </h3>
                      <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
                        {stack}
                      </p>
                      <p className="mt-1 flex items-center justify-between border-t-[1.5px] border-border pt-3 font-mono text-[12px] text-muted">
                        <span>{project.year}</span>
                        <span
                          aria-hidden="true"
                          className="text-accent transition-transform duration-300 ease-signature group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                        >
                          ↗
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Stretched-link: cubre toda la card (z-1, debajo de los
                      botones z-2) para que el clic general navegue al case study
                      sin anidar un <a> dentro de otro. */}
                  <a
                    href={href}
                    onClick={(event) => {
                      event.preventDefault()
                      navigate(href) // cortina wipe + router.push (RFC-06)
                    }}
                    aria-label={t('viewProject', { title })}
                    data-cursor
                    className="absolute inset-0 z-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Projects
