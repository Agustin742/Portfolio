import BlogPage from "@/components/commons/BlogPage"
import { blogsInfo } from "@/data/blog/blog"
import { blogContent } from "@/data/blogContent"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return blogsInfo.map(post => ({
    slug: post.slug
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params

  const post = blogContent.find(p => p.slug === slug)

  if (!post) return notFound()

  return (
    <BlogPage
    slug={post.slug}
    title={post.title}
    content={post.content}
    image={post.image}
    />
  )
}