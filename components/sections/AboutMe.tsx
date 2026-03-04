'use client'
import { 
  SiExpress, 
  SiMongodb, 
  SiNestjs,
  SiNextdotjs, 
  SiPostgresql, 
  SiSpringboot, 
  SiTailwindcss 
} from "react-icons/si";

import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGit,
  FaJsSquare,
  FaJava
} from "react-icons/fa";

import TechItem, { TechItemProps } from "../ui/TechItem"
import { useLanguage } from "@/hooks";
import Expandable, { ExpandableProps } from "../ui/Expandable";

const AboutMe = () => {
  const { t } = useLanguage();

  const knowTechnologies: TechItemProps[] = [
    { icon: FaReact, label: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, label: "Next.js", color: "#000000" },
    { icon: SiNestjs, label: "NestJS", color: "#E0234E" },
    { icon: FaNodeJs, label: "Node.js", color: "#339933" },
    { icon: SiExpress, label: "Express", color: "#000000" },
    { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
    { icon: FaJsSquare, label: "JavaScript", color: "#F7DF1E" },
    { icon: FaHtml5, label: "HTML", color: "#E34F26" },
    { icon: FaCss3Alt, label: "CSS", color: "#1572B6" },
    { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
    { icon: FaGit, label: "Git", color: "#F05032" },
  ];

  const notKnowTechnologies: TechItemProps[] = [
    { icon: FaJava, label: "Java", color: "#007396" },
    { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
    { icon: SiSpringboot, label: "SpringBoot", color: "#6DB33F" },
  ];

  const aboutCards: ExpandableProps[] = [
    {title: t('about.cards.whoAmI.title'), description: t('about.cards.whoAmI.description')},
    {title: t('about.cards.formation.title'), description: t('about.cards.formation.description')},
    {title: t('about.cards.whatILookFor.title'), description: t('about.cards.whatILookFor.description')},
  ]

  return (
    <div 
    id="about"
    className="
    flex flex-col md:flex-row
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
          <Expandable key={index} title={aboutCard.title} description={aboutCard.description} />
        ))}
      </div>
    </div>
  )
}

export default AboutMe