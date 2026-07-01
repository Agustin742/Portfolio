'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from 'react-icons/fi'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Placeholder del mismo tamaño que el ícono para evitar layout shift en SSR.
  if (!mounted) {
    return <div className="h-4.5 w-4.5" aria-hidden />
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-pressed={isDark}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      data-cursor
      className="flex items-center justify-center text-muted transition-colors duration-300 ease-signature hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {isDark ? <FiMoon size={18} aria-hidden /> : <FiSun size={18} aria-hidden />}
    </button>
  )
}

export default ThemeToggle
