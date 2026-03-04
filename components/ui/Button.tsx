'use client'

import { IconType } from "react-icons";

interface ButtonProps {
  variant: 'adapt' | 'primary' | 'secondary' | 'small';
  icon?: IconType;
  text: string;
  onClick?: () => void;
}


const Button = ({ variant, icon: Icon, text, onClick }: ButtonProps) => {

  const stylesTypes = (variant: string) => {
    return {
      adapt: 'bg-[#2EC4B6] w-full h-full text-[#F3FAF8]',
      primary: 'bg-[#2EC4B6] py-3.5 px-13 text-[#F3FAF8] font-bold',
      secondary: 'border-2 border-[#1F4A3A] dark:border-[#2EC4B6] py-3.5 px-13 text-[#1F4A3A] dark:text-[#2EC4B6]',
      small: 'bg-[#2EC4B6] p-2 text-[#F3FAF8] font-bold text-sm'
    }[variant] || ''
  }

  return (
    <button
    onClick={onClick}
      className={`
        ${stylesTypes(variant)} 
        rounded-lg 
        flex items-center justify-center gap-2
        transform transition-all duration-300 ease-in-out 
        hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[#1E3A33] 
        active:translate-y-0.5 active:shadow-md
        `}
    >
      {Icon && <Icon size={18} />}
      {text}
    </button>
  )
}

export default Button