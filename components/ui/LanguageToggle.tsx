'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import clsx from 'clsx'

type Locale = 'es' | 'en'

const LOCALES: ReadonlyArray<{ code: Locale; label: string }> = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

export default function LanguageToggle() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const switchTo = (next: Locale) => {
    if (next === locale) return
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false })
    })
  }

  return (
    <div
      role="group"
      aria-label="Cambiar idioma"
      className="inline-flex border-[1.5px] border-border font-mono text-[12px] leading-none"
    >
      {LOCALES.map(({ code, label }, index) => {
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            onClick={() => switchTo(code)}
            disabled={isPending}
            aria-pressed={active}
            data-cursor
            className={clsx(
              'px-2 py-1.5 transition-colors duration-300 ease-signature focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
              index > 0 && 'border-l-[1.5px] border-border',
              active
                ? 'bg-accent font-bold text-bg'
                : 'text-muted hover:text-text',
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
