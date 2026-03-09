import Image from "next/image"
import TechStack, { TechStackProps } from "../ui/TechStack";
import { FaGithub } from "react-icons/fa";
import Button from "../ui/Button";
import { FiExternalLink } from "react-icons/fi";

export interface AlternatingSectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  links: { gitHub?: string, web?: string };
  techStacks: TechStackProps[];
  buttonLabels: string[];
}

const AlternatingSection = ({ title, description, image, reverse, techStacks, links, buttonLabels }: AlternatingSectionProps) => {
  const handleClick = (link: string | undefined) => {
    window.open(link, "_blank");
  };
  return (
    <div
      className={`
        md:mb-20
        flex flex-col md:flex-row
        items-center
        gap-10
        ${reverse ? "md:flex-row-reverse" : ""}
      `}
    >
      <div >
        <Image
          src={image}
          alt={title}
          width={700}
          height={500}
          className="h-auto object-cover rounded-xl"
        />
      </div>

      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-base md:text-lg">
          {description}
        </p>
        <h3 className="text-base md:text-lg mt-2">
          <strong>Tecnologias Usadas</strong>
        </h3>
        <div className="m-2 ">
          <div
          className="flex flex-wrap gap-2 w-full">
            {techStacks.map((techStack, index) => (
              <TechStack
                key={index}
                label={techStack.label}
                color={techStack.color}
                icon={techStack.icon}
              />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-4 my-2.5 items-center justify-start w-full">
            {links.gitHub &&
              <Button
                variant="secondary"
                text={buttonLabels[0]}
                icon={FaGithub}
                onClick={() => handleClick(links.gitHub)} />
            }

            {links.web &&
              <Button
                variant="primary"
                text={buttonLabels[1]}
                icon={FiExternalLink}
                onClick={() => handleClick(links.web)} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlternatingSection