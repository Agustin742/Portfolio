import Image from "next/image"
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi"

const ProfileCard = () => {

  return (
    <div
      className="
        bg-[#F9FFFD] text-[#1F4A3A]
        dark:bg-[#1E3A33] dark:text-[#CFEAE4]
        w-full max-w-152 h-62
        md:w-42 md:h-61
        flex md:flex-col
        rounded-l-2xl
        overflow-hidden
        drop-shadow-xl drop-shadow-black/25
      "
    >
      {/* FOTO + BARRA */}
      <div className="relative w-1/2 h-full md:w-full md:h-1/2">
        
        {/* Barra */}
        <div
          className="
            absolute top-0 left-0
            w-10 h-full
            md:w-5
            bg-[#1F4A3A] dark:bg-[#CFEAE4]
            z-10
          "
        />

        {/* Imagen */}
        <Image
          src="/imgs/profile.png" // cambia por tu imagen
          alt="Profile"
          width={305}   // mitad aproximada de 610
          height={251}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* LINKS */}
      <div
        className="
          w-1/2 md:w-full
          flex flex-col
          justify-center
          items-start 
          pl-8 md:pl-2 md:pt-1
          gap-7 md:gap-2
          text-[30px] md:text-[20px]
        "
      >
        <a
          href="mailto:agustintabarcache74@gmail.com"
          rel="noopener noreferrer" 
          className="hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          <FiMail />
          Email
        </a>

        <a
          href="https://www.linkedin.com/in/agustin-tabarcache-42060b2a1"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          <FiLinkedin />
          Linkedin
        </a>

        <a
          href="https://github.com/Agustin742"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          <FiGithub />
          GitHub
        </a>
      </div>
    </div>
  )
}

export default ProfileCard