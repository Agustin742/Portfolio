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

  if (!mounted) {
    return <div className="w-14 h-8 rounded-full bg-[#1F4A3A]" aria-hidden />
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`
        relative
        w-14 h-8
        flex items-center
        rounded-full
        transition-colors duration-300
        ${isDark ? 'bg-[#1F4A3A]' : 'bg-[#2EC4B6]'}
      `}
    >
      {/* Circle */}
      <div
        className={`
          absolute
          w-6 h-6
          bg-[#F3FAF8]
          rounded-full
          shadow-md
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${isDark ? 'translate-x-7' : 'translate-x-1'}
        `}
      >
        <span className="transition-opacity duration-200">
          {isDark ? (
            <FiMoon size={14} color="#1F4A3A" />
          ) : (
            <FiSun size={14} color="#2EC4B6" />
          )}
        </span>
      </div>
    </button>
  )
}

export default ThemeToggle