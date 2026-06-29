'use client'


import { useTranslations } from 'next-intl'
import AlternatingSection from '../commons/AlternatingSection';
import { projects } from '@/data/projects/projects';


const Projects = () => {
  const t = useTranslations('projects');

  const buttonLabels = [t('buttons.gitButton'), t('buttons.webButton')];


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
        mt-20
      '
    >
      <div>
        <h2
          className='
          text-4xl md:text-5xl mb-4
        '
        ><strong>{t('sectionTitle')}</strong></h2>
        <p
          className='
          text-xl md:text-lg mb-2 italic
        '
        >
          {t('sectionSubtitle')}
        </p>
      </div>
      {projects.map((project, index) => (
        <AlternatingSection
          key={index}
          title={t(project.title)}
          description={t(project.description)}
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