"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "app/i18n/routing";
import Image from "next/image";
import { whatsappURL } from "app/utils/whatsappUrl";

const services = [
  {
    id: "custom-software-development",
    icon: "icon-[tabler--device-desktop-code]",
    link: "/services/custom-software-development",
  },
  {
    id: "seo",
    icon: "icon-[tabler--brand-google]",
    link: "/services/seo",
  },
  {
    id: "cro",
    icon: "icon-[tabler--cloud]",
    link: "/services/cro",
  },
  {
    id: "digital-transformation",
    icon: "icon-[tabler--device-analytics]",
    link: "/services/digital-transformation",
  },
  {
    id: "business-intelligence",
    icon: "icon-[carbon--dashboard]",
    link: "/services/business-intelligence",
  },
  {
    id: "consulting-support",
    icon: "icon-[tabler--tool]",
    link: "/services/consulting-support",
  },
];

export const Header = () => {
  const t = useTranslations("Header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeMenuTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeMenuTimeout.current) {
      clearTimeout(closeMenuTimeout.current); // Cancelar el temporizador si el usuario vuelve a entrar
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    // Establecer un retraso antes de cerrar el menú
    closeMenuTimeout.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200); // Retraso de 200 ms
  };

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-jojanes-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo-white.png"
                alt="Logo Jojanes"
                width={500}
                height={500}
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button
              type="button"
              className="bg-jojanes-gray rounded-md p-2 inline-flex items-center justify-center text-jojanes-white hover:text-jojanes-green hover:bg-jojanes-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-jojanes-green"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              <span
                className="icon-[tabler--menu-2] h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <Link
              href="/projects"
              className="text-base font-medium text-jojanes-subtitle hover:text-jojanes-green transition-colors"
            >
              {t("menu.projects")}
            </Link>
            <div
              className="relative"
              ref={servicesRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                onClick={handleMouseLeave}
                className="text-base font-medium text-jojanes-subtitle hover:text-jojanes-green transition-colors group inline-flex items-center"
              >
                {t("menu.services")}
                <span
                  className="icon-[heroicons--chevron-down] ml-2 h-5 w-5 group-hover:text-jojanes-green"
                  aria-hidden="true"
                />
              </Link>
              {isServicesOpen && (
                <div className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-jojanes-gray px-5 py-6 sm:gap-8 sm:p-8">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={service.link}
                          onClick={handleMouseLeave}
                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-jojanes-black"
                        >
                          <span
                            className={`${service.icon} flex-shrink-0 h-6 w-6 text-jojanes-green`}
                            aria-hidden="true"
                          />
                          <div className="ml-4">
                            <p className="text-base font-medium text-jojanes-white">
                              {t(`services.${service.id}`)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/learning"
              className="text-base font-medium text-jojanes-subtitle hover:text-jojanes-green transition-colors"
            >
              {t("menu.learning")}
            </Link>
            <Link
              href="/blog"
              className="text-base font-medium text-jojanes-subtitle hover:text-jojanes-green transition-colors"
            >
              {t("menu.blog")}
            </Link>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Link
              href={whatsappURL}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-jojanes-black bg-jojanes-green hover:bg-jojanes-green/90 transition-colors"
            >
              {t("menu.consult")}
              <span
                className="icon-[heroicons--arrow-top-right-on-square-solid] ml-2 -mr-1 h-5 w-5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-jojanes-black ring-opacity-5 bg-jojanes-gray divide-y-2 divide-jojanes-border">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    src="/images/logo-white.png"
                    alt="Logo Jojanes"
                    width={150}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-jojanes-black rounded-md p-2 inline-flex items-center justify-center text-jojanes-white hover:text-jojanes-green hover:bg-jojanes-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-jojanes-green"
                    onClick={toggleMenu}
                  >
                    <span className="sr-only">Close menu</span>
                    <span
                      className="icon-[heroicons--x-mark-solid] h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link
                    href="/projects"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-jojanes-black"
                    onClick={toggleMenu}
                  >
                    <span
                      className="icon-[heroicons--folder-solid] flex-shrink-0 h-6 w-6 text-jojanes-green"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-jojanes-white">
                      {t("menu.projects")}
                    </span>
                  </Link>
                  <Link
                    href="/services"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-jojanes-black"
                    onClick={toggleMenu}
                  >
                    <span
                      className="icon-[heroicons--briefcase-solid] flex-shrink-0 h-6 w-6 text-jojanes-green"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-jojanes-white">
                      {t("menu.services")}
                    </span>
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={service.link}
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-jojanes-black pl-14"
                      onClick={toggleMenu}
                    >
                      <span
                        className={`${service.icon} flex-shrink-0 h-5 w-5 text-jojanes-green`}
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-sm font-medium text-jojanes-subtitle">
                        {t(`services.${service.id}`)}
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/blog"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-jojanes-black"
                    onClick={toggleMenu}
                  >
                    <span
                      className="icon-[heroicons--newspaper-solid] flex-shrink-0 h-6 w-6 text-jojanes-green"
                      aria-hidden="true"
                    />
                    <span className="ml-3 text-base font-medium text-jojanes-white">
                      {t("menu.blog")}
                    </span>
                  </Link>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <Link
                href={whatsappURL}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-bold text-jojanes-black bg-jojanes-green hover:bg-jojanes-green/90 transition-colors"
                onClick={toggleMenu}
              >
                {t("menu.consult")}
                <span
                  className="icon-[heroicons--arrow-top-right-on-square-solid] ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
