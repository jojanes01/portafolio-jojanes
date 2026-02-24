"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "app/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { whatsappURL } from "app/utils/whatsappUrl";

/* ─── Services config ─── */
const services = [
  { id: "custom-software-development", icon: "icon-[tabler--device-desktop-code]", link: "/services/custom-software-development" },
  { id: "seo", icon: "icon-[tabler--brand-google]", link: "/services/seo" },
  { id: "cro", icon: "icon-[tabler--chart-bar]", link: "/services/cro" },
  { id: "digital-transformation", icon: "icon-[tabler--device-analytics]", link: "/services/digital-transformation" },
  { id: "business-intelligence", icon: "icon-[carbon--dashboard]", link: "/services/business-intelligence" },
  { id: "consulting-support", icon: "icon-[tabler--tool]", link: "/services/consulting-support" },
];

/* ─── Nav links ─── */
const navLinks = (t: (k: string) => string) => [
  { href: "/projects", label: t("menu.projects"), icon: "icon-[tabler--folder]" },
  { href: "/learning", label: t("menu.learning"), icon: "icon-[tabler--book]" },
  { href: "/workflow", label: t("menu.workflow"), icon: "icon-[tabler--sparkles]" },
  { href: "/blog", label: t("menu.blog"), icon: "icon-[tabler--pencil]" },
];

/* ─── Locale toggle (inline in header) ─── */
const LocaleToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const locale = useLocale();

  const toggle = () => {
    const next = locale === "en" ? "es" : "en";
    const base = pathname.replace(`/${locale}`, "") || "/";
    const qs = params.toString();
    router.push(`/${next}${qs ? `${base}?${qs}` : base}`);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        border border-[#1E2420] bg-[#0D0F0E] text-[#6B7B72] text-xs font-bold
        hover:border-jojanes-green hover:text-jojanes-green
        transition-all duration-200 cursor-pointer select-none uppercase tracking-wider
      "
    >
      <span className="icon-[tabler--language] text-sm" aria-hidden="true" />
      {locale === "en" ? "ES" : "EN"}
    </button>
  );
};

/* ─── Header ─── */
export const Header = () => {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<NodeJS.Timeout | null>(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const openServices = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setServicesOpen(true);
  };
  const closeServices = () => { leaveTimer.current = setTimeout(() => setServicesOpen(false), 180); };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`
          sticky top-0 left-0 w-full z-50
          transition-all duration-300
          ${scrolled
            ? "bg-[#0e100f]/80 backdrop-blur-xl border-b border-[#1A1F1C] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-0">
          <div className="flex items-center justify-between h-16 sm:h-[68px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo-white.png"
                alt="Jojanes"
                width={500}
                height={500}
                className="h-7 sm:h-8 w-auto"
                priority
              />
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks(t).map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative px-3.5 py-2 text-sm font-medium rounded-lg
                    transition-colors duration-200
                    ${isActive(href)
                      ? "text-[#F0F2F1]"
                      : "text-[#6B7B72] hover:text-[#C8D4CF] hover:bg-[#0D0F0E]"
                    }
                  `}
                >
                  {label}
                  {isActive(href) && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-jojanes-green"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              ))}

              {/* Services dropdown */}
              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
              >
                <Link
                  href="/services"
                  onClick={closeServices}
                  className={`
                    inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg
                    transition-colors duration-200
                    ${isActive("/services")
                      ? "text-[#F0F2F1]"
                      : "text-[#6B7B72] hover:text-[#C8D4CF] hover:bg-[#0D0F0E]"
                    }
                  `}
                >
                  {t("menu.services")}
                  <span
                    className={`icon-[tabler--chevron-down] text-base transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </Link>

                {/* Dropdown */}
                <div
                  className={`
                    absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72
                    transition-all duration-200 origin-top
                    ${servicesOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}
                  `}
                >
                  <div className="rounded-xl border border-[#1A1F1C] bg-[#0D0F0E] shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden p-2">
                    {services.map((svc) => (
                      <Link
                        key={svc.id}
                        href={svc.link}
                        onClick={closeServices}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#111712] group transition-colors duration-150"
                      >
                        <span
                          className={`${svc.icon} text-xl text-[#4B5553] group-hover:text-jojanes-green transition-colors`}
                          aria-hidden="true"
                        />
                        <span className="text-sm text-[#6B7B72] group-hover:text-[#C8D4CF] transition-colors">
                          {t(`services.${svc.id}`)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* ── Desktop right side ── */}
            <div className="hidden md:flex items-center gap-3">
              <LocaleToggle />
              <Link
                href={whatsappURL}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="
                  group relative inline-flex items-center gap-2 px-4 py-2
                  rounded-full bg-jojanes-green text-[#0A0C0B] text-sm font-bold
                  overflow-hidden transition-all duration-300
                  hover:shadow-[0_0_20px_rgba(42,233,141,0.4)] hover:scale-[1.03]
                "
              >
                <span className="icon-[tabler--message-circle] text-base" aria-hidden="true" />
                {t("menu.consult")}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                />
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="
                md:hidden flex items-center justify-center w-9 h-9 rounded-lg
                border border-[#1E2420] bg-[#0D0F0E] text-[#6B7B72]
                hover:border-jojanes-green hover:text-jojanes-green
                transition-all duration-200
              "
            >
              <span className="icon-[tabler--menu-2] text-xl" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer panel ── */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[280px] z-[70] md:hidden
          bg-[#0A0C0B] border-l border-[#1A1F1C]
          flex flex-col
          transition-transform duration-300 ease-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#1A1F1C]">
          <Image
            src="/images/logo-white.png"
            alt="Jojanes"
            width={120}
            height={32}
            className="h-7 w-auto"
          />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="
              flex items-center justify-center w-9 h-9 rounded-lg
              border border-[#1E2420] text-[#6B7B72]
              hover:border-jojanes-green hover:text-jojanes-green
              transition-all duration-200
            "
          >
            <span className="icon-[tabler--x] text-xl" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-1">
          {navLinks(t).map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200
                ${isActive(href)
                  ? "bg-[#111712] text-jojanes-green border border-[#1E2420]"
                  : "text-[#6B7B72] hover:bg-[#0D0F0E] hover:text-[#C8D4CF]"
                }
              `}
            >
              <span className={`${icon} text-base`} aria-hidden="true" />
              {label}
            </Link>
          ))}

          {/* Services group */}
          <div className="mt-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#2D3530] font-medium px-4 mb-2">
              {t("menu.services")}
            </p>
            {services.map((svc) => (
              <Link
                key={svc.id}
                href={svc.link}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-[#4B5553] hover:bg-[#0D0F0E] hover:text-[#C8D4CF] transition-colors duration-150"
              >
                <span className={`${svc.icon} text-base text-[#2D3530]`} aria-hidden="true" />
                {t(`services.${svc.id}`)}
              </Link>
            ))}
          </div>
        </nav>

        {/* Drawer footer */}
        <div className="px-4 pb-6 flex flex-col gap-3 border-t border-[#1A1F1C] pt-5">
          <LocaleToggle />
          <Link
            href={whatsappURL}
            rel="nofollow noopener noreferrer"
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className="
              flex items-center justify-center gap-2 w-full px-4 py-3
              rounded-full bg-jojanes-green text-[#0A0C0B] text-sm font-bold
              hover:shadow-[0_0_20px_rgba(42,233,141,0.4)] transition-all duration-300
            "
          >
            <span className="icon-[tabler--message-circle] text-base" aria-hidden="true" />
            {t("menu.consult")}
          </Link>
        </div>
      </div>
    </>
  );
};
