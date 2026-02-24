"use client";
import React, { useRef, useState } from "react";
import { ProjectFeatured, ProjectCard } from "app/components/landing/Projects/ProjectItem/ProjectItem";

interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  deliverables: string;
  company: string;
  year: string;
  url: string;
  images: string[];
  bg: string;
  accentColor?: string;
}

interface Category {
  type: string;
  description?: string;
  icon?: string;
  color?: string;
  projects: Project[];
}

export const CollapsibleCategory = ({
  category,
  defaultOpen = false,
}: {
  category: Category;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const accent = category.color ?? "#2ae98d";

  const [featured, ...rest] = category.projects;

  return (
    <div
      className={`
        rounded-2xl border overflow-hidden transition-all duration-300
        ${isOpen ? "border-[#1E2420]" : "border-[#14181600] hover:border-[#1E2420]"}
        bg-[#0A0C0B]
      `}
    >
      {/* ── Accordion header ── */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 cursor-pointer group text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Category icon */}
          {category.icon && (
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{ borderColor: `${accent}30`, background: `${accent}10` }}
            >
              <span className={`${category.icon} text-xl`} style={{ color: accent }} aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2
                className="font-bold text-lg sm:text-xl text-[#F0F2F1] leading-none transition-colors duration-200"
                style={{ letterSpacing: "-0.015em" }}
              >
                {category.type}
              </h2>
              {/* Count badge */}
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full tabular-nums"
                style={{ color: accent, background: `${accent}15` }}
              >
                {category.projects.length}
              </span>
            </div>
            {category.description && (
              <p className="text-[#4B5553] text-xs mt-1 leading-relaxed hidden sm:block max-w-lg truncate">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Chevron */}
        <span
          className={`
            flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg
            border border-[#1E2420] bg-[#0D0F0E] text-[#4B5553]
            group-hover:border-[#2a2f2c] group-hover:text-[#C8D4CF]
            transition-all duration-300
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
          aria-hidden="true"
        >
          <span className="icon-[tabler--chevron-down] text-base" />
        </span>
      </button>

      {/* ── Smooth height animation via CSS grid trick ── */}
      <div
        className="grid transition-all duration-500 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div ref={contentRef} className="overflow-hidden">
          <div className="px-6 pb-8">
            {/* Thin accent divider */}
            <div
              className="h-px mb-7"
              style={{ backgroundImage: `linear-gradient(to right, ${accent}40, transparent)` }}
              aria-hidden="true"
            />

            {/* Featured card (first project) */}
            {featured && (
              <div className="mb-6">
                <ProjectFeatured project={featured} />
              </div>
            )}

            {/* Grid of remaining cards */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rest.map((project, i) => (
                  <ProjectCard key={project.id} project={project} delay={i * 60} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
