import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Space_Grotesk, Space_Mono, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import Navbar from '@/components/layout/NavBar'
import BackgroundCanvas from '@/components/ui/BackgroundCanvas'
import CustomCursor from '@/components/ui/CustomCursor'
import { PageWipeProvider } from '@/components/ui/PageWipe'
import { routing } from '@/i18n/routing'

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: 'Agustín Tabarcache — Full Stack Developer',
    description: t('description'),
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'es' | 'en')) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans bg-bg dark:bg-bg transition-colors pt-(--header-h)">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BackgroundCanvas />
          <CustomCursor />
          <NextIntlClientProvider messages={messages}>
            <PageWipeProvider>
              <div className="relative z-1">
                <Navbar />
                {children}
              </div>
            </PageWipeProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
