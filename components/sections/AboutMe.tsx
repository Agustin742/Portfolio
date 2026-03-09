'use client'

import { useLanguage } from "@/hooks";

import Expandable from "../ui/Expandable";
import TechItem from "../ui/TechItem";

import { knowTechnologies } from "@/data/aboutMe/knowTechnologies";
import { notKnowTechnologies } from "@/data/aboutMe/notKnowTechnologies";
import { aboutCards } from "@/data/aboutMe/aboutCards";


const AboutMe = () => {
  const { t } = useLanguage();

  return (
    <div 
    id="about"
    className="
    flex flex-col md:flex-row
    mt-10 md:mt-0
    "
    >
    <div 
    className="
      w-full 
      max-w-6xl 
      mx-auto
      px-4
      flex 
      flex-col
      md:mt-20
      md:max-w-2/3
      "
    >
      <div>
        <h2
          className="
          text-3xl md:text-5xl font-bold
        "
        ><strong>{t('about.title')}</strong></h2>
        <p
          className="
          text-base md:text-xl mt-4
        "
        >
          {t('about.description1')}
          <br />
          {t('about.description2')}
          </p>
      </div>

      <div>
        <h3
          className="
          mt-8
          text-[24px]
        "
        ><strong>{t('about.knowTitle')}</strong></h3>
        <div className="
          w-full max-w-230
          grid 
          grid-cols-2 
          sm:grid-cols-4 
          md:grid-cols-5 
          lg:grid-cols-6
          mt-6
        "
        >
          {knowTechnologies.map((knowTechnology, index) => (
            <TechItem key={index} icon={knowTechnology.icon} label={knowTechnology.label} color={knowTechnology.color} />
          ))}
        </div>
      </div>

      <div>
        <h3
          className="
          mt-8
          text-[24px]
        "
        ><strong>{t('about.learningTitle')}</strong></h3>
        <div className="
          w-full max-w-230
          grid 
          grid-cols-2
          sm:grid-cols-4 
          md:grid-cols-5 
          lg:grid-cols-6
          mt-6
        "
        >
          {notKnowTechnologies.map((notKnowTechnology, index) => (
            <TechItem key={index} icon={notKnowTechnology.icon} label={notKnowTechnology.label} color={notKnowTechnology.color} />
          ))}
        </div>
      </div>

      
    </div>

    <div
      className="
      my-auto
      w-full
      md:max-w-1/3
      
      "
      >
        {aboutCards.map((aboutCard, index) => (
          <Expandable key={index} title={t(aboutCard.title)} description={t(aboutCard.description)} />
        ))}
      </div>
    </div>
  )
}

export default AboutMe