import { blogsInfo } from "@/data/blog/blog"
import BlogCard from "../commons/BlogCard"

const Blog = () => {
  return (
    <section
      id="blog"
      className="relative overflow-hidden py-20 w-full">

      <h2 className="absolute top-0 left-0 text-[8rem] md:text-[12rem]  font-bold text-black/30 select-none whitespace-nowrap -z-1">
        Blog
      </h2>

      <div className="
      -mt-25 md:-mt-10 z-0 pt-40
      relative 
      grid sm:grid-cols-1 md:grid-cols-3 
      gap-8 md:gap-14
      justify-items-center
      ">
        {blogsInfo.map((blogInfo, index) => (
          <BlogCard
          key={index}
          slug={blogInfo.slug} 
          image={blogInfo.image} 
          fecha={blogInfo.fecha} 
          title={blogInfo.title} 
          description={blogInfo.description} 
          type={blogInfo.type} />
        ))}
      </div>

    </section>
  )
}

export default Blog