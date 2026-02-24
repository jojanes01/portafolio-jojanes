"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

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

/* ─── Hook: animate on scroll ─── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return { ref, visible };
}

/* ─── Tech tag pill ─── */
const Tag = ({ children }: { children: string }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium text-[#6B7B72] border border-[#1E2420] bg-[#111712] uppercase tracking-wide">
    {children}
  </span>
);

/* ─── Meta row ─── */
const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-[#1A1F1C]">
    <span className="text-[11px] text-[#4B5553] uppercase tracking-widest font-medium min-w-[80px] pt-0.5">
      {label}
    </span>
    <span className="text-[13px] text-[#C8D4CF] leading-relaxed">{value}</span>
  </div>
);

/* ═══════════════════════════════════════════════
   FEATURED PROJECT — first/hero project card
════════════════════════════════════════════════ */
export const ProjectFeatured = ({ project }: { project: Project }) => {
  const t = useTranslations("Projects");
  const { ref, visible } = useReveal(0);
  const [activeImg, setActiveImg] = useState(0);
  const tags = project.deliverables.split(",").map((s) => s.trim());
  const accent = project.accentColor ?? "#2ae98d";

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        group relative rounded-2xl border border-[#1A1F1C] overflow-hidden
        bg-[#0D0F0E]
        hover:border-[#2a2f2c]
        hover:shadow-[0_0_60px_-12px_rgba(42,233,141,0.12)]
      `}
    >
      {/* Top: Glowing accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}80, transparent)`,
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row">
        {/* ── Left: Details pane ── */}
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:w-[45%] lg:border-r border-[#1A1F1C]">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#4B5553] border border-[#1E2420] px-2.5 py-1 rounded-md">
                {project.year}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#4B5553]">
                ·
              </span>
              <span
                className="text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md"
                style={{ color: accent, background: `${accent}15` }}
              >
                Featured
              </span>
            </div>

            <h3
              className="font-bold text-[#F0F2F1] leading-tight mb-4"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </h3>

            <p className="text-[#6B7B72] text-sm leading-7 mb-6 line-clamp-4">
              {project.description}
            </p>

            {/* Meta rows */}
            <div className="flex flex-col">
              <MetaRow label={t("texts.role")} value={project.role} />
              <MetaRow label={t("texts.company")} value={project.company} />
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name}`}
              className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-[#F0F2F1] hover:text-jojanes-green transition-colors duration-200"
            >
              <span
                className="flex items-center justify-center w-8 h-8 rounded-full border border-[#222] group-hover/btn:border-jojanes-green group-hover/btn:bg-[#0d1a12] transition-all duration-200"
              >
                <span
                  className="icon-[heroicons--arrow-top-right-on-square-solid] text-sm"
                  aria-hidden="true"
                />
              </span>
              {t("texts.site")}
            </a>
          </div>
        </div>

        {/* ── Right: Image showcase ── */}
        <div className="relative lg:w-[55%] min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] overflow-hidden">
          {/* Background blurred from project bg */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${project.bg}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[#0D0F0E]/70" />
          </div>

          {/* Main image */}
          <div className="relative h-full flex items-center justify-center p-6 sm:p-10">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src={project.images[activeImg]}
                alt={`${project.name} screenshot ${activeImg + 1}`}
                width={700}
                height={420}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Image thumbnails strip */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
              {project.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Screenshot ${i + 1}`}
                  className={`
                    w-10 h-7 rounded overflow-hidden border-2 transition-all duration-200 cursor-pointer
                    ${i === activeImg
                      ? "border-jojanes-green opacity-100 scale-105"
                      : "border-[#333] opacity-40 hover:opacity-70"
                    }
                  `}
                >
                  <Image
                    src={src}
                    alt=""
                    width={80}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   GRID CARD — compact card for the grid
════════════════════════════════════════════════ */
export const ProjectCard = ({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) => {
  const t = useTranslations("Projects");
  const { ref, visible } = useReveal(delay);
  const [hovered, setHovered] = useState(false);
  const tags = project.deliverables.split(",").map((s) => s.trim()).slice(0, 3);
  const accent = project.accentColor ?? "#2ae98d";

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div
        className={`
          group relative flex flex-col rounded-2xl border overflow-hidden h-full cursor-default
          bg-[#0D0F0E]
          transition-all duration-300
          ${hovered
            ? "border-[#2ae98d30] shadow-[0_0_40px_-10px_rgba(42,233,141,0.15)]"
            : "border-[#1A1F1C]"
          }
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image area */}
        <div
          className="relative w-full h-44 overflow-hidden flex-shrink-0"
          style={{
            backgroundImage: `url('${project.bg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[#0D0F0E]/60" />
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <div
              className={`
                relative w-full rounded-lg overflow-hidden shadow-xl ring-1 ring-white/10
                transition-transform duration-500
                ${hovered ? "scale-[1.04]" : "scale-100"}
              `}
            >
              <Image
                src={project.images[0]}
                alt={`${project.name} preview`}
                width={480}
                height={270}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Year badge */}
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-[#6B7B72] border border-[#1E2420] bg-[#0D0F0E]/90 backdrop-blur-sm px-2 py-0.5 rounded">
            {project.year}
          </span>

          {/* Company badge */}
          <span
            className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ color: accent, background: `${accent}20` }}
          >
            {project.company}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-bold text-[#F0F2F1] text-base leading-snug mb-2" style={{ letterSpacing: "-0.01em" }}>
            {project.name}
          </h3>

          <p className="text-[#6B7B72] text-[13px] leading-6 flex-1 line-clamp-3 mb-4">
            {project.description}
          </p>

          {/* Role */}
          <div className="flex items-center gap-1.5 mb-4">
            <span
              className="icon-[tabler--user-code] text-sm"
              style={{ color: accent }}
              aria-hidden="true"
            />
            <span className="text-[12px] text-[#4B5553] truncate">{project.role}</span>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 mb-5">
            {tags.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </div>

          {/* CTA link */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.name}`}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#4B5553] hover:text-jojanes-green transition-colors duration-200 mt-auto"
          >
            <span
              className="icon-[material-symbols--arrow-outward-rounded] text-base"
              aria-hidden="true"
            />
            {t("texts.site")}
          </a>
        </div>
      </div>
    </div>
  );
};

/* ─── Legacy export for backward compat ─── */
export const ProjectItem = ({ project }: { project: Project }) => (
  <ProjectFeatured project={project} />
);
