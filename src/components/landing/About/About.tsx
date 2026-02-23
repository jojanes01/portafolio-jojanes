import Image from "next/image";
import { Title } from "../../shared/Title";
import { useTranslations } from "next-intl";
import { Link } from "app/i18n/routing";
import { whatsappURL } from "app/utils/whatsappUrl";

export const About = () => {
  const t = useTranslations("About");

  return (
    <section id="about" className="max-w-6xl sm:mx-auto pb-0 sm:pb-32">
      <Title title={t("title")} />
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-12 py-8 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-6 w-full sm:w-1/2">
          <div className="w-[64px] h-[64px] rounded-full overflow-hidden flex-shrink-0">
            <Image
              width={108}
              height={108}
              src={"/images/perfil.webp"}
              alt="Joan"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col space-y-8">
            <p className="text-white text-xl sm:text-2xl">
              {t("introduction.headline")}
            </p>
            <Link
              href={whatsappURL}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="bg-jojanes-white flex flex-row space-x-2 items-center rounded-full w-max px-4 py-3"
            >
              <span
                className="icon-[wpf--calendar]"
                role="img"
                aria-hidden="true"
              />
              <div>{t("introduction.buttonText")}</div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <p className="text-jojanes-subtitle">{t("description.part1")}</p>
          <br />
          <p className="text-jojanes-subtitle">{t("description.part2")}</p>
          <br />
          <p className="text-jojanes-subtitle">{t("description.part3")}</p>
        </div>
      </div>
    </section>
  );
};
