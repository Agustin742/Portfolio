import Footer from "@/components/layout/Footer"
import AboutMe from "@/components/sections/AboutMe"
import Contact from "@/components/sections/Contact"
import HeroBanner from "@/components/sections/HeroBanner"
import Projects from "@/components/sections/Projects"
import StackSection from "@/components/sections/StackSection"
import StudiesCarrousel from "@/components/sections/StudiesCarrousel"

export default function HomePage() {
  return (
    <main id="main-content" className="px-6 md:px-0
    flex justify-center
    flex-col items-center
    overflow-x-clip">
      <HeroBanner />
      <AboutMe />
      <StudiesCarrousel />
      <Projects />
      <StackSection />
      <Contact />
      <Footer />
    </main>
  )
}
