'use client'

import { useState, useMemo } from 'react'
import { LanguageContext } from './LanguageContext'
import { translations } from '@/translations'

export type Language = 'es' | 'en'

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguage] = useState<Language>('es')

  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split('.')
      let value: unknown =
        translations[language as keyof typeof translations]

      for (const k of keys) {
        if (
          typeof value === 'object' &&
          value !== null &&
          k in value
        ) {
          value = (value as Record<string, unknown>)[k]
        } else {
          return key
        }
      }

      return typeof value === 'string' ? value : key
    }
  }, [language])

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  )
}