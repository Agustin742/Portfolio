"use client";

import Image from "next/image";
import { useLanguage } from "@/hooks";

import { images } from "@/data/studies/images";

const StudiesCarrousel = () => {
  const { t } = useLanguage()

  const duplicated = [...images, ...images];

  return (
    <section className="w-screen overflow-hidden py-10 bg-animated-gradient">
      <div className="flex items-center justify-center mb-7 dark:text-[#1F4A3A] text-xl">
        <h2 className=""><strong>{t('studies.certified')}</strong></h2>
      </div>
      <div className="flex w-max animate-carousel gap-20 items-center">
        {duplicated.map((image, index) => (
          <div key={`${image.image}-${index}`} className="flex shrink-0">
            <Image
              src={image.image}
              alt={image.alt}
              height={80}
              width={200}
              sizes="200px"
              className="h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudiesCarrousel;