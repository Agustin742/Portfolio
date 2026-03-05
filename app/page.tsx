'use client'

import AboutMe from "@/components/sections/AboutMe"
import HeroBanner from "@/components/sections/HeroBanner"
import Projects from "@/components/sections/Projects"

export default function HomePage() {

  return (
    <main className="px-6 md:px-11 
    flex justify-center 
    flex-col items-center">
      <HeroBanner />
      <AboutMe />
      <Projects />
    </main>
  )
}