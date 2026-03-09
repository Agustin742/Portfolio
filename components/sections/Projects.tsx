'use client'


import { useLanguage } from '@/hooks'
import AlternatingSection from '../commons/AlternatingSection';
import { projects } from '@/data/projects/projects';


const Projects = () => {
  const { t } = useLanguage();

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
        mt-20
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