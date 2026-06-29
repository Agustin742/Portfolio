'use client'

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

type MenuItem = {
  name: string;
  href: string;
};


const Footer = () => {
  const tNav = useTranslations("nav")
  const t = useTranslations("footer")
  const pathname = usePathname();
  const router = useRouter()

  const menuItems: MenuItem[] = [
    { name: "about", href: "about" },
    { name: "projects", href: "projects" },
  ];

  const scrollTo = (id: string) => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <section id="footer" className="max-w-8xl">
      <div className="flex flex-col md:flex-row gap-8 md:gap-14 my-4">

        <div className="w-full md:w-1/2 p-3">
          <p>
            {t('description.line1')}<br />
            {t('description.line2')}<br />
            {t('description.line3')}
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-[#D3E9E7] dark:bg-[#244A42] rounded-2xl p-3">
          <p>
            <strong>&copy; {new Date().getFullYear()} - Agustin</strong><br />
              {t('stack')}<br />
            <a
              href="https://github.com/Agustin742/Portfolio"
              className="hover:opacity-70 transition-opacity"
            >
              {t('repo')}
            </a>
          </p>
        </div>

      </div>
      <span className="flex grow h-0.5 bg-[#6E9B8A] rounded-full"></span>

      <div className="w-full my-5 flex justify-between">
        <div>
          <ul className="hidden md:flex gap-6 text-lg ">
            {menuItems.map((item) => (
              <li key={item.href} className="hover:opacity-70 transition-opacity">
                <button onClick={() => scrollTo(item.href)}>
                  <strong>{tNav(item.name)}</strong>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-[40px] flex gap-8">
          <a href="mailto:agustintabarcache74@gmail.com"
            className="hover:opacity-70 transition-opacity"
            rel="noopener noreferrer"
          ><FiMail />
          </a>
          <a
            href="https://www.linkedin.com/in/agustin-tabarcache-42060b2a1"
            className="hover:opacity-70 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          ><FiLinkedin />
          </a>
          <a
            href="https://github.com/Agustin742"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          ><FiGithub />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Footer