"use client";
import { useTranslations } from "next-intl";
import { ProjectFeatured, ProjectCard } from "app/components/landing/Projects/ProjectItem/ProjectItem";

export const ProjectSection = () => {
  const t = useTranslations("Projects");

  const projects = [
    {
      id: "globalStreaming",
      name: t("items.globalStreaming.name"),
      description: t("items.globalStreaming.description"),
      role: t("items.globalStreaming.role"),
      deliverables: t("items.globalStreaming.deliverables"),
      company: t("items.globalStreaming.company"),
      year: t("items.globalStreaming.year"),
      images: [
        "/images/projects/gsc/gsc-1.png",
        "/images/projects/gsc/gsc-2.png",
        "/images/projects/gsc/gsc-3.png",
        "/images/projects/gsc/gsc-4.png",
      ],
      bg: "/images/projects/gsc/gsc-bg.webp",
      url: "https://globalstreamingcommunity.com",
      accentColor: "#2ae98d",
    },
    {
      id: "paquetesMovistarPrepago",
      name: t("items.paquetesMovistarPrepago.name"),
      description: t("items.paquetesMovistarPrepago.description"),
      role: t("items.paquetesMovistarPrepago.role"),
      deliverables: t("items.paquetesMovistarPrepago.deliverables"),
      company: t("items.paquetesMovistarPrepago.company"),
      year: t("items.paquetesMovistarPrepago.year"),
      images: [
        "/images/projects/paquetes/paquetes-1.png",
        "/images/projects/paquetes/paquetes-2.png",
        "/images/projects/paquetes/paquetes-3.png",
        "/images/projects/paquetes/paquetes-4.png",
      ],
      bg: "/images/projects/paquetes/paquetes-bg.webp",
      url: "https://prepago.movistar.co/paquetes",
      accentColor: "#00B8E2",
    },
    {
      id: "concentreseMovistarPrepago",
      name: t("items.concentreseMovistarPrepago.name"),
      description: t("items.concentreseMovistarPrepago.description"),
      role: t("items.concentreseMovistarPrepago.role"),
      deliverables: t("items.concentreseMovistarPrepago.deliverables"),
      company: t("items.concentreseMovistarPrepago.company"),
      year: t("items.concentreseMovistarPrepago.year"),
      images: [
        "/images/projects/concentrese/concentrese-1.png",
        "/images/projects/concentrese/concentrese-2.png",
        "/images/projects/concentrese/concentrese-3.png",
      ],
      bg: "/images/projects/concentrese/concentrese-bg.webp",
      url: "https://prepago.movistar.co/concentrese",
      accentColor: "#00B8E2",
    },
    {
      id: "jjsecurity",
      name: t("items.jjsecurity.name"),
      description: t("items.jjsecurity.description"),
      role: t("items.jjsecurity.role"),
      deliverables: t("items.jjsecurity.deliverables"),
      company: t("items.jjsecurity.company"),
      year: t("items.jjsecurity.year"),
      images: [
        "/images/projects/jjsecurity/jjsecurity-1.png",
        "/images/projects/jjsecurity/jjsecurity-2.png",
        "/images/projects/jjsecurity/jjsecurity-3.png",
        "/images/projects/jjsecurity/jjsecurity-4.png",
      ],
      bg: "/images/projects/jjsecurity/jjsecurity-bg.webp",
      url: "https://jjsecurity.com.co",
      accentColor: "#F59E0B",
    },
  ];

  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="max-w-6xl mx-auto sm:mx-auto pb-8 sm:pb-32 px-4 sm:px-0">
      {/* ── Section Header ── */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="icon-[tabler--point-filled] text-jojanes-green text-xl"
            aria-hidden="true"
          />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#4B5553] font-medium">
            {t("title")}
          </span>
        </div>
        <h2
          className="font-bold text-[#F0F2F1] leading-tight"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            letterSpacing: "-0.025em",
          }}
        >
          Products that ship,{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #2ae98d 0%, #1bc476 100%)",
            }}
          >
            scale, and matter.
          </span>
        </h2>
        <p className="text-[#4B5553] text-sm sm:text-base mt-3 max-w-xl leading-7">
          From enterprise platforms at Telefónica to indie products — here&apos;s a selection of work I&apos;m proud of.
        </p>
      </div>

      {/* ── Featured Project ── */}
      <div className="mb-6">
        <ProjectFeatured project={featured} />
      </div>

      {/* ── Projects Grid ── */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 80} />
          ))}
        </div>
      )}

      {/* ── View all link ── */}
      <div className="mt-10 flex justify-center">
        <a
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#4B5553] hover:text-jojanes-green transition-colors duration-200"
        >
          <span>{t("viewAll") || "View all projects"}</span>
          <span
            className="icon-[heroicons--arrow-right] transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
};
