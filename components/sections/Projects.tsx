'use client'

import { SiMongodb, SiNestjs, SiNextdotjs, SiPostgresql, SiTailwindcss } from 'react-icons/si'
import { FaNodeJs, FaReact } from 'react-icons/fa'
import { useLanguage } from '@/hooks'
import { TechStackProps } from '../ui/TechStack';
import AlternatingSection from '../commons/AlternatingSection';

export interface AlternatingSectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  links: { gitHub?: string, web?: string };
  techStacks: TechStackProps[];
}

const Projects = () => {
  const { t } = useLanguage();

  const projects: AlternatingSectionProps[] = [
    {
      title: t('projects.items.wasifix.title'),
      description: t('projects.items.wasifix.description'),
      image: '/imgs/project.png',
      links: {
        gitHub: 'https://github.com/',
        web: 'https://github.com/'
      },
      techStacks: [
        { label: 'React', icon: FaReact, color: '#61DAFB' },
        { label: 'Tailwind', icon: SiTailwindcss, color: '#38BDF8' },
        { label: 'MongoDB', icon: SiMongodb, color: '#47A248' }
      ]
    },

    {
      title: t('projects.items.taskflow.title'),
      description: t('projects.items.taskflow.description'),
      image: '/imgs/project.png',
      links: {
        gitHub: 'https://github.com/',
        web: 'https://github.com/'
      },
      techStacks: [
        { label: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { label: 'NestJS', icon: SiNestjs, color: '#E0234E' },
        { label: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { label: 'Tailwind', icon: SiTailwindcss, color: '#38BDF8' },
      ]
    },

    {
      title: t('projects.items.devconnect.title'),
      description: t('projects.items.devconnect.description'),
      image: '/imgs/project.png',
      links: {
        gitHub: 'https://github.com/',
        web: 'https://github.com/'
      },
      techStacks: [
        { label: 'NestJS', icon: SiNestjs, color: '#E0234E' },
        { label: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { label: 'Node.js', icon: FaNodeJs, color: '#339933' },
      ]
    },
  ];

  const buttonLabels = [t('projects.buttons.gitButton'), t('projects.buttons.webButton')];


  return (
    <div
    id='projects'
      className='
        w-full 
        max-w-6xl 
        mx-auto
        px-4
        flex 
        flex-col
        md:mt-20
      '
    >
      <div>
        <h2
          className='
          text-4xl md:text-5xl mb-4
        '
        ><strong>{t('projects.sectionTitle')}</strong></h2>
        <p
          className='
          text-xl md:text-lg mb-2 italic
        '
        >
          {t('projects.sectionSubtitle')}
        </p>
      </div>
      {projects.map((project, index) => (
        <AlternatingSection
          key={index}
          title={project.title}
          description={project.description}
          image={project.image}
          techStacks={project.techStacks}
          links={project.links}
          reverse={Boolean(index % 2)}
          buttonLabels={buttonLabels}
        />
      ))}
    </div>
  )
}

export default Projects