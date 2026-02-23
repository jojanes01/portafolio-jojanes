import { Chip } from "app/components/shared/Chip";
import { Title } from "app/components/shared/Title";
import { useTranslations } from "next-intl";

export const Experience = () => {
  const t = useTranslations("Experience");

  // Claves de las experiencias
  const keys = [
    "telefonica",
    "indra",
    "prevalentware",
    "grupoAfl",
    "gemda",
    "elroble",
  ] as const;

  return (
    <section id="experience" className="max-w-6xl sm:mx-auto pb-0 sm:pb-32">
      <Title title={t("title")} />
      <div className="flex flex-col space-y-4 px-4 sm:px-0 pb-16 sm:pt-8">
        {keys.map((key) => (
          <ItemExperience
            key={key}
            company={t(`items.${key}.company`)}
            job={t(`items.${key}.job`)}
            date={t(`items.${key}.date`)}
          />
        ))}
      </div>
    </section>
  );
};

interface ItemExperienceProps {
  company: string;
  job: string;
  date: string;
}

const ItemExperience = ({ company, job, date }: ItemExperienceProps) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:justify-between py-6 border-b border-jojanes-border space-x-0 sm:space-x-16">
      <h3 className="text-xl sm:text-3xl text-white">{company}</h3>
      <div className="flex flex-row space-x-2 items-center">
        <Chip>{job}</Chip>
        <Chip>{date}</Chip>
      </div>
    </div>
  );
};
