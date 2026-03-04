'use client'

import { createContext } from 'react'

export interface LanguageContextType {
  language: 'es' | 'en'
  setLanguage: (lang: 'es' | 'en') => void
  t: (key: string) => string
}

export const LanguageContext = createContext<LanguageContextType | null>(null)