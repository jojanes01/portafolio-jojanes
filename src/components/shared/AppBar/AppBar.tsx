import { getTranslations } from "next-intl/server";
import { AvatarChip } from "app/components/shared/AvatarChip/AvatarChip";

interface AppBarProps {
  title: string;
}

export const AppBar = async ({ title }: AppBarProps) => {
  const t = await getTranslations("Hero");
  return (
    <section className="flex flex-row justify-between items-center py-4 sm:py-8">
      <h1 className="text-white text-4xl">{title}</h1>
      <div className="hidden sm:flex">
        <AvatarChip
          src="/images/perfil.webp"
          alt="Joan Sebastian Oviedo"
          name={
            <span>
              Joan <span className="hidden sm:inline">Sebastian</span> Oviedo
            </span>
          }
          description={t("avatar.description")}
          type="hero"
        />
      </div>
    </section>
  );
};
