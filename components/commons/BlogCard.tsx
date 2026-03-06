'use client'

import Image from "next/image"
import Button from "../ui/Button"
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks";

export interface BlogCardProps {
  slug: string
  image: string
  fecha: string
  title: string
  description: string
  type: string
}

const BlogCard = ({ slug, image, fecha, title, description, type }: BlogCardProps) => {

  const router = useRouter();

  const { t } = useLanguage();
  const goToPost = (slug: string) => {
    
    router.push(`/blog/${slug}`);
  }

  return (
    <div
      className="min-w-90"
    >
      <div className="aspect-video w-full">
        <Image
          src={image}
          height={550}
          width={800}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="py-2">
        <p className="flex items-center gap-3 text-sm mb-2">
          <strong>{t(fecha)}</strong>
          <span className="flex grow h-0.5 bg-[#6E9B8A] rounded-full"></span>
        </p>

        <h3 className="line-clamp-1 mb-2 wrap-break-word">
          <strong>{t(title)}</strong>
        </h3>

        <p className="line-clamp-3 min-h-18 break-all">{t(description)}</p>

        <div className="flex items-center gap-3 text-sm mb-2">
          <p><strong>{t(type)}</strong></p>
          <span className="flex grow h-0.5 bg-[#6E9B8A] rounded-full"></span>
          <Button variant="small" text={t('blog.button')} onClick={() => goToPost(slug)} />
        </div>
      </div>
    </div>
  )
}

export default BlogCard