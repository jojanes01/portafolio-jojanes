import { Chip } from "app/components/shared/Chip";
import { TextWithDesc } from "app/components/shared/TextWithDesc";
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
}

export const ProjectItem = ({ project }: { project: Project }) => {
  const t = useTranslations("Projects");
  return (
    <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 space-x-0 sm:space-x-16 py-8 sm:py-16 text-white">
      {/* Primer div fijo */}
      <div
        className="flex flex-col space-y-6 w-full sm:w-1/2 sm:sticky sm:top-8 sm:h-max"
        style={{ alignSelf: "flex-start" }}
      >
        <Chip>{project.year}</Chip>
        <h3 className="text-xl sm:text-3xl pr-4">{project.name}</h3>
        <p className="text-jojanes-subtitle pr-4">{project.description}</p>
        <TextWithDesc title={t("texts.role")} desc={project.role} />
        <TextWithDesc
          title={t("texts.deliverables")}
          desc={project.deliverables}
        />
        <TextWithDesc title={t("texts.company")} desc={project.company} />
        <TextWithDesc
          title={t("texts.site")}
          desc={
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar el sitio web del proyecto ${project.name}`}
              className="flex items-center space-x-2 text-jojanes-green hover:underline"
            >
              <span>{t("texts.visitSite")}</span>
              <span
                className="icon-[material-symbols--arrow-right-alt-rounded] text-2xl"
                role="img"
                aria-hidden="true"
              />
            </a>
          }
        />
      </div>

      {/* Segundo div con scrollable contenido */}
      <div className="flex flex-col space-y-8 sm:overflow-y-auto">
        <Chip>{project.company}</Chip>
        {project.images.map((image, index) => (
          <ImageItem
            key={index}
            src={image}
            alt={`Vista previa del proyecto ${project.name}`}
            bg={project.bg}
          />
        ))}
      </div>
    </div>
  );
};

interface ImageItemProps {
  src: string;
  alt: string;
  bg: string;
}

const ImageItem = ({ src, alt, bg }: ImageItemProps) => {
  return (
    <div
      className="relative rounded-lg shadow-lg border border-jojanes-border overflow-hidden p-4 sm:p-16"
      style={{
        backgroundImage: `url('${bg}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={490}
        height={168}
        objectFit="contain"
        className="transition-transform duration-300 hover:scale-105 rounded"
      />
    </div>
  );
};
