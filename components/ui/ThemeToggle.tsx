'use client'

import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useMounted } from '@/hooks'

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  // Placeholder del mismo tamaño que el ícono para evitar layout shift en SSR.
  if (!mounted) {
    return <div className="h-4.5 w-4.5" aria-hidden />
  }

  // `resolvedTheme` (no `theme`): con `enableSystem`, `theme` puede ser 'system'
  // en la primera visita y el ícono/estado no reflejarían el tema realmente
  // aplicado. `resolvedTheme` siempre es 'light' | 'dark'.
  const isDark = resolvedTheme === 'dark'

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
