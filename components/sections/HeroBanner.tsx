'use client'
import { useLanguage } from "@/hooks"
import ProfileCard from "../commons/ProfileCard"
import Button from "../ui/Button";


const CV_PATHS: Record<string, string> = {
  es: "/cv/agustin-tabarcache-cv-es.pdf",
  en: "/cv/agustin-tabarcache-cv-en.pdf",
};

const HeroBanner = () => {
  const { t, language } = useLanguage();

  const handleOpenCV = () => {
    const pdfPath = CV_PATHS[language] ?? CV_PATHS["es"];
    window.open(pdfPath, "_blank");
  };

  return (
    <section
      id="hero"
      className="
        W-full 
        max-w-6xl 
        mx-auto 
        px-4
        min-h-[80vh]
        flex 
        flex-col md:flex-row
        items-center 
        justify-center 
        gap-10
        mb-20 md:mb-0
        "
    >
      <ProfileCard />

      <div
        className="
          w-full
          mt-5 md:pl-18
          flex flex-col
          gap-y-1 md:gap-y-0 
        "
      >
        <p className="text-2xl md:text-4xl">{t('hero.greeting')}</p>
        <h1 className="text-3xl md:text-5xl">
          <strong>
            {t("hero.role.prefix")}{" "}
            <span className="text-[#2EC4B6]">
              {t("hero.role.highlight")}
            </span>
          </strong>
        </h1>
        <div className="text-[32px] font-bold md:hidden">
          <Button variant="adapt" text={t('hero.downloadCV')} onClick={handleOpenCV}/>
        </div>
        <p className="
            hidden md:block
            text-base md:text-lg
            min-h-24
          ">
          {t('hero.description')}
        </p>
        <div
          className="
            hidden md:flex justify-end items-center
            gap-5
            mt-2
          "
        >
          <span className="
              border-2 rounded-xl border-[#D3E9E7]
              py-1 px-2
              italic text-[14px]
            ">
            {t('hero.quote')}
          </span>
          <Button variant="small" text={t('hero.downloadCV')} onClick={handleOpenCV} />
        </div>
      </div>
    </section>
  )
}

export default HeroBanner