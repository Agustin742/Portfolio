'use client'

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

import { useTransition } from 'react'

export default function LanguageToggle() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const isEnglish = locale === 'en'

  const toggle = () => {
    const next = isEnglish ? 'es' : 'en'
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false })
    })
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`
        relative w-24 h-8 overflow-hidden rounded-lg
        border-2 border-[#1F4A3A] dark:border-[#2EC4B6]
        text-[#1F4A3A] dark:text-[#2EC4B6]
        text-sm
        transition-opacity duration-150
        ${isPending ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <div
        className={`
          flex w-[200%] h-full
          transition-transform duration-300 ease-in-out
          ${isEnglish ? '-translate-x-1/2' : 'translate-x-0'}
        `}
      >
        <span className="w-1/2 flex items-center justify-center">Español</span>
        <span className="w-1/2 flex items-center justify-center">English</span>
      </div>
    </button>
  )
}