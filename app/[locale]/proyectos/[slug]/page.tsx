import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { projects, getProjectBySlug } from '@/data/projects/projects'
import ProjectCaseStudy from '@/components/sections/ProjectCaseStudy'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  // `project.title` es una KEY i18n; se resuelve al texto real para el <title>.
  const t = await getTranslations({ locale, namespace: 'projects' })
  return { title: `${t(project.title)} — Agustín Tabarcache` }
}

// Solo los slugs; Next los combina con los locales del layout [locale] padre.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  setRequestLocale(locale)

  return <ProjectCaseStudy slug={slug} />
}
