import { Title } from "app/components/shared/Title";
import { useTranslations } from "next-intl";
import { ProjectItem } from "app/components/landing/Projects/ProjectItem/ProjectItem";

export const ProjectSection = () => {
  const t = useTranslations("Projects");

  // Proyectos dinámicos
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
    },
  ];

  return (
    <section id="projects" className="max-w-6xl sm:mx-auto pb-8 sm:pb-24">
      <Title title={t("title")} />
      <div className="px-4 sm:px-0">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
