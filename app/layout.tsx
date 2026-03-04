import { Poppins } from 'next/font/google'
import { ThemeProvider } from '@/context'
import { LanguageProvider } from '@/context/LanguageProvider'
import './globals.css'
import Navbar from '@/components/layout/NavBar'

const poppins = Poppins({ weight: ['300', '400', '700', '900'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <LanguageProvider>
        <ThemeProvider>
          <body className={`${poppins.className} text-[#1F4A3A] dark:text-[#CFEAE4] bg-[#F3FAF8] dark:bg-[#162c26] transition-colors pt-24`}>
            <Navbar />
            {children}
          </body>
        </ThemeProvider>
      </LanguageProvider>
    </html>
  )
}