"use client";
import React, { useState } from "react";
import { ProjectItem } from "app/components/landing/Projects/ProjectItem/ProjectItem";

export const CollapsibleCategory = ({ category }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="mt-8 border-b border-jojanes-border pb-6">
      <div
        onClick={toggleOpen}
        className="cursor-pointer flex items-center justify-between group"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-jojanes-white group-hover:text-jojanes-green transition duration-300">
          {category.type}
        </h2>
        <span
          className={`icon-[line-md--chevron-down-circle] text-jojanes-green text-3xl transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          role="img"
          aria-hidden="true"
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-full" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-6 mt-6">
          {category.projects.map((project: any) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
