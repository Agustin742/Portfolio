'use client'

import { Content } from "@/data/blogContent/content.interface";
import { useLanguage } from "@/hooks";
import Image from "next/image";

const BlogPage = ({ title, image, content }: Content) => {
  const { t } = useLanguage();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
        {t(title)}
      </h1>

      <div className="relative w-full aspect-video mb-8 sm:mb-10">
        <Image
          src={image}
          alt={t(title)}
          width={1200}
          height={800}
          className="w-full h-auto rounded-xl mb-8 sm:mb-10"
        />
      </div>

      {content.map((block, index) => {
        switch (block.type) {

          case "paragraph":
            return (
              <p
                key={index}
                className="mb-5 sm:mb-6 text-base sm:text-lg leading-relaxed"
              >
                {t(block.value)}
              </p>
            );

          case "subtitle":
            return (
              <h2
                key={index}
                id={block.id}
                className="text-xl sm:text-2xl font-semibold mt-8 sm:mt-10 mb-3 sm:mb-4"
              >
                {t(block.value)}
              </h2>
            );

          case "code":
            return (
              <pre
                key={index}
                className="bg-zinc-900 text-white p-4 sm:p-5 rounded-lg overflow-x-auto mb-6 sm:mb-8 text-sm sm:text-base"
              >
                <code>{t(block.value)}</code>
              </pre>
            );

          case "image":
            return (
              <div
                key={index}
                className="flex justify-center my-6 sm:my-8"
              >
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={900}
                  height={600}
                  className="w-full max-w-xl h-auto rounded-xl"
                />
              </div>
            );

          case "list":
            return (
              <ul
                key={index}
                className="list-disc pl-6 mb-6 sm:mb-8 text-base sm:text-lg space-y-2"
              >
                {block.items.map((item, i) => (
                  <li key={i}>{t(item)}</li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-zinc-400 pl-4 italic my-6 sm:my-8 text-base sm:text-lg"
              >
                {t(block.value)}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </article>
  )
}

export default BlogPage