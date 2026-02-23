import { getTranslations } from "next-intl/server";
import { Link } from "app/i18n/routing";
import { AvatarChip } from "app/components/shared/AvatarChip/AvatarChip";
import { Carrusel } from "app/components/shared/Carrusel";
import { whatsappURL } from "app/utils/whatsappUrl";

export const Hero = async () => {
  const t = await getTranslations("Hero");

  return (
    <section className="flex flex-col max-w-6xl sm:mx-auto space-y-8 px-4 sm:px-0 pb-0 sm:pb-24">
      <div className="pt-10 sm:pt-16">
        <AvatarChip
          src="/images/perfil.webp"
          alt={t("avatar.alt")}
          name={
            <span>
              Joan <span className="hidden sm:inline">Sebastian</span> Oviedo
            </span>
          }
          description={t("avatar.description")}
          type="hero"
        />
      </div>
      <h1 className="text-white font-medium leading-9 text-4xl sm:text-7xl sm:leading-[84px] min-h-[84px]">
        {t("headline")}
      </h1>
      <h2 className="text-[#b3c2cb] text-lg sm:text-[20px] sm:leading-8 w-full sm:w-[650px]">
        {t("subheadline")}
      </h2>
      <div className="flex flex-row space-x-2">
        <Link
          href={whatsappURL}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="bg-jojanes-white flex flex-row space-x-2 items-center rounded-full w-max px-4 py-2 text-base"
        >
          <span
            className="icon-[wpf--calendar]"
            role="img"
            aria-hidden="true"
          />
          <div>{t("buttons.getStarted")}</div>
        </Link>
        <Link
          href="#projects"
          className="bg-transparent border border-jojanes-border flex flex-row space-x-2 items-center rounded-full w-max px-4 py-2 text-white text-base"
        >
          <span className="icon-[mdi--web]" role="img" aria-hidden="true" />
          <div>{t("buttons.viewPortfolio")}</div>
        </Link>
      </div>
      <Carrusel />
    </section>
  );
};
