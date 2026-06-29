import type { Metadata } from 'next'
import { Space_Grotesk, Space_Mono, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageProvider'
import './globals.css'
import Navbar from '@/components/layout/NavBar'

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
})

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'Agustín Tabarcache — Full Stack Developer',
  description:
    'Portfolio de Agustín Tabarcache, desarrollador Full Stack. Proyectos, experiencia y formación en desarrollo web.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans bg-[#0A0A0A] dark:bg-[#0A0A0A] transition-colors pt-24">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
