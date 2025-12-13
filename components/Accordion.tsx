"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-primary-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left group transition-colors hover:text-primary-600"
      >
        <span className="font-serif text-lg text-primary-900 group-hover:text-primary-600 transition-colors">
          {title}
        </span>
        <ChevronDown
          className={`text-primary-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
      
      {/* Animación de apertura usando grid css */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-primary-600 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}