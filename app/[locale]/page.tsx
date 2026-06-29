import Footer from "@/components/layout/Footer"
import AboutMe from "@/components/sections/AboutMe"
import Contact from "@/components/sections/Contact"
import HeroBanner from "@/components/sections/HeroBanner"
import Projects from "@/components/sections/Projects"
import StudiesCarrousel from "@/components/sections/StudiesCarrousel"

export default function HomePage() {
  return (
    <main className="px-6 md:px-11
    flex justify-center
    flex-col items-center
    overflow-x-hidden">
      <HeroBanner />
      <AboutMe />
      <StudiesCarrousel />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
