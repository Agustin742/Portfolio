"use client"

import { useState } from "react"

export interface ExpandableProps {
  title: string;
  description: string;
} 

const Expandable = ({ title, description }: ExpandableProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="
    w-full 
    bg-[#F9FFFD] dark:bg-[#1E3A33]
    border-3 border-[#6E9B8A] dark:border-[#2F6F63] 
    rounded-lg 
    overflow-hidden 
    shadow-2xl shadow-black/40
    mb-8">

      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 text-left"
      >
        <span className="font-medium text-lg">
          <strong>{title}</strong>
        </span>

        {/* Tres puntos */}
        <div className="flex gap-1 text-[#6E9B8A] dark:text-[#2F6F63]">
          <span
            className={`w-2 h-2 rounded-full bg-current transition-transform duration-300 ${open ? "translate-y-1" : ""
              }`}
          />
          <span
            className={`w-2 h-2 rounded-full bg-current transition-transform duration-300 delay-75 ${open ? "translate-y-1" : ""
              }`}
          />
          <span
            className={`w-2 h-2 rounded-full bg-current transition-transform duration-300 delay-150 ${open ? "translate-y-1" : ""
              }`}
          />
        </div>
      </button>

      {/* Contenido */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">

          {/* Línea divisoria */}
          <div className="border-t-3 border-[#6E9B8A] dark:border-[#2F6F63]" />

          {/* Texto */}
          <div className="px-4 py-3 text-base">
            {description}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Expandable