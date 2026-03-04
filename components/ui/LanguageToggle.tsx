'use client'

import { useLanguage } from "@/hooks";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const isEnglish = language === "en";

  return (
    <button
      onClick={() => setLanguage(isEnglish ? "es" : "en")}
      className="
        relative
        w-24 h-8
        overflow-hidden
        rounded-lg
        border-2 border-[#1F4A3A] dark:border-[#2EC4B6]
        text-[#1F4A3A] dark:text-[#2EC4B6]
        text-sm
      "
    >
      <div
        className={`
          flex
          w-[200%]
          h-full
          transition-transform duration-300 ease-in-out
          ${isEnglish ? "-translate-x-1/2" : "translate-x-0"}
        `}
      >
        <span className="w-1/2 flex items-center justify-center">
          Español
        </span>
        <span className="w-1/2 flex items-center justify-center">
          English
        </span>
      </div>
    </button>
  );
}