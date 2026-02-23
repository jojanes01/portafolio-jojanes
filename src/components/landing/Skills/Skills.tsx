import { Chip } from "app/components/shared/Chip";
import { Title } from "app/components/shared/Title";
import { useTranslations } from "next-intl";

const skillsData = [
  "Next.js",
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Azure",
  "Docker",
  "Jest",
  "Git",
  "Figma",
  "Tailwind CSS",
];

export const Skills = () => {
  const t = useTranslations("Skills");

  return (
    <section className="max-w-6xl sm:mx-auto pb-0 sm:pb-32">
      <Title title={t("title")} />
      <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-32 sm:items-start px-4 sm:px-0 py-4 text-jojanes-subtitle ">
        <p>{t("description")}</p>
        <div className="flex flex-wrap justify-start sm:justify-end gap-2 py-4 sm:py-0 transform sm:-translate-y-12">
          {skillsData.map((skill) => (
            <Chip key={skill}>
              <p className="text-lg">{skill}</p>
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
};
