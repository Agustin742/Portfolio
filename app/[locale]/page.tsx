import AboutMe from "@/components/sections/AboutMe"
import Contact from "@/components/sections/Contact"
import EducationSection from "@/components/sections/EducationSection"
import HeroBanner from "@/components/sections/HeroBanner"
import Projects from "@/components/sections/Projects"
import StackSection from "@/components/sections/StackSection"

export default function HomePage() {
  return (
    <main id="main-content" className="px-6 md:px-0
    flex justify-center
    flex-col items-center
    overflow-x-clip">
      <HeroBanner />
      <AboutMe />
      <Projects />
      <StackSection />
      <EducationSection />
      <Contact />
    </main>
  )
}
