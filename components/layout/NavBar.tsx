"use client";

import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import { useLanguage } from "@/hooks";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageToggle from "../ui/LanguageToggle";
import Button from "../ui/Button";

type MenuItem = {
  name: string;
  href: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const menuItems: MenuItem[] = [
    { name: "nav.about", href: "about" },
    { name: "nav.projects", href: "projects" },
    { name: "nav.blog", href: "blog" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setIsOpen(false);
  };

  return (
    <nav className="flex flex-col">
      <div className="
        h-24
        flex
        justify-between
        items-center
        px-6 md:px-11
        fixed top-0 left-0 w-full z-50
        backdrop-blur-sm
      ">
        <div className="text-2xl">
          <button onClick={() => scrollTo('hero')}>
            <strong>Agustin Tabarcache</strong>
          </button>
        </div>

        {/* Lado derecho */}
        <div className="flex items-center gap-4">
          {/* Desktop menu */}
          <ul className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <li key={item.href}>
                <button onClick={() => scrollTo(item.href)}>
                  {t(item.name)}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex md:items-center gap-1.5">
            <ThemeToggle />
            <LanguageToggle />
          </div>

          <div className="h-9 w-41.5 md:h-10 md:w-56">
            <Button variant="adapt" text={t('nav.contact')} onClick={() => scrollTo('contact')} />
          </div>

          {/* Mobile botones */}
          <div className="flex items-center gap-4 md:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={24}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <ul
        className={`
          z-100
          bg-[#F3FAF8] dark:bg-[#162c26]
          fixed top-24 left-0 w-full
          bg-background
          overflow-hidden
          flex flex-col items-center gap-6 md:hidden
          transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0"}
        `}
      >
        {menuItems.map((item) => (
          <li key={item.href}>
            <button onClick={() => scrollTo(item.href)}>
              {t(item.name)}
            </button>
          </li>
        ))}
        <li>
          <ThemeToggle />
        </li>
        <li>
          <LanguageToggle />
        </li>
      </ul>
    </nav>
  );
}