import { useTranslations } from "next-intl";
import { Link } from "app/i18n/routing";
import Image from "next/image";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="mx-4 sm:mx-0">
      <div className="flex flex-col sm:flex-row sm:justify-between max-w-6xl mx-auto items-center sm:items-start space-y-4 sm:space-y-0 border-t border-jojanes-border py-8 px-8 sm:px-0">
        <a
          href={`mailto:${t("email")}`}
          className="text-white text-2xl sm:text-4xl mb-4"
        >
          {t("email")}
        </a>
        <div className="flex flex-col space-y-4">
          <p className="text-2xl font-bold text-jojanes-white mb-4">
            {t("usefulLinksTitle")}
          </p>
          <nav className="flex flex-col space-y-2 text-white">
            {[
              { href: "/", label: t("usefulLinks.home") },
              { href: "#projects", label: t("usefulLinks.projects") },
              { href: "#testimonies", label: t("usefulLinks.testimonies") },
              { href: "#experience", label: t("usefulLinks.experience") },
              { href: "#skills", label: t("usefulLinks.skills") },
              { href: "#about", label: t("usefulLinks.about") },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-jojanes-green transition-colors duration-300 flex items-center space-x-2"
              >
                <span className="icon-[heroicons--chevron-right] w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col space-y-2 items-center sm:items-start text-jojanes-subtitle pt-6 sm:pt-0">
          <p className="text-white mb-1 text-2xl">{t("contactTitle")}</p>
          <a href="tel:+573184471432" className="text-jojanes-subtitle">
            {t("phone")}
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 border-t max-w-6xl sm:mx-auto border-jojanes-border py-8">
        <Image
          src="/images/logo-white.png"
          alt="Logo Jojanes"
          width={150}
          height={40}
        />
        <p className="text-jojanes-subtitle text-center">{t("copyright")}</p>
      </div>
    </footer>
  );
};
