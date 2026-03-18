import { useTranslations } from "next-intl";
import { Link } from "app/i18n/routing";
import Image from "next/image";
import { whatsappURL } from "app/utils/whatsappUrl";

const socials = [
  { label: "GitHub", href: "https://github.com/jojanes011", icon: "icon-[tabler--brand-github]" },
  { label: "LinkedIn", href: "https://linkedin.com/in/jojanes", icon: "icon-[tabler--brand-linkedin]" },
  { label: "WhatsApp", href: whatsappURL, icon: "icon-[tabler--brand-whatsapp]" },
];

export const Footer = () => {
  const t = useTranslations("Footer");

  const navLinks = [
    { href: "/", label: t("usefulLinks.home") },
    { href: "#projects", label: t("usefulLinks.projects") },
    { href: "#experience", label: t("usefulLinks.experience") },
    { href: "#skills", label: t("usefulLinks.skills") },
    { href: "#about", label: t("usefulLinks.about") },
    { href: "/blog", label: t("usefulLinks.testimonies") },
  ];

  return (
    <footer className="relative border-t border-[#1A1F1C] bg-[#0A0C0B] overflow-hidden">
      {/* Top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(42,233,141,0.3) 50%, transparent 100%)" }}
      />

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-0 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">

          {/* ── Col 1: Email CTA ── */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.png"
                alt="Jojanes"
                width={120}
                height={32}
                className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-[#4B5553] text-sm leading-6 max-w-xs">
              Senior Fullstack Developer crafting impactful digital experiences — available for freelance & remote roles.
            </p>
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-[#1E2420] bg-[#0D0F0E]">
              <span className="w-1.5 h-1.5 rounded-full bg-jojanes-green animate-pulse inline-block" aria-hidden="true" />
              <span className="text-[11px] text-[#4B5553] font-medium">Open to opportunities</span>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={label}
                  className="
                    flex items-center justify-center w-9 h-9 rounded-lg
                    border border-[#1E2420] bg-[#0D0F0E] text-[#4B5553]
                    hover:border-jojanes-green hover:text-jojanes-green
                    transition-all duration-200
                  "
                >
                  <span className={`${icon} text-base`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#2D3530] font-medium">
              {t("usefulLinksTitle")}
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href + label}
                  href={href}
                  className="group inline-flex items-center gap-2 text-sm text-[#4B5553] hover:text-jojanes-green transition-colors duration-200"
                >
                  <span
                    className="icon-[tabler--arrow-right] text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    aria-hidden="true"
                  />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Contact ── */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#2D3530] font-medium">
              {t("contactTitle")}
            </p>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <a
                href={`mailto:${t("email")}`}
                className="group inline-flex items-center gap-2.5 text-sm text-[#4B5553] hover:text-jojanes-green transition-colors duration-200"
              >
                <span className="icon-[tabler--mail] text-base text-[#2D3530] group-hover:text-jojanes-green transition-colors" aria-hidden="true" />
                {t("email")}
              </a>
              {/* Phone */}
              <a
                href="tel:+573184471432"
                className="group inline-flex items-center gap-2.5 text-sm text-[#4B5553] hover:text-jojanes-green transition-colors duration-200"
              >
                <span className="icon-[tabler--phone] text-base text-[#2D3530] group-hover:text-jojanes-green transition-colors" aria-hidden="true" />
                {t("phone")}
              </a>
              {/* Location */}
              <span className="inline-flex items-center gap-2.5 text-sm text-[#4B5553]">
                <span className="icon-[tabler--map-pin] text-base text-[#2D3530]" aria-hidden="true" />
                Cali, Colombia · UTC-5
              </span>
            </div>

            {/* CTA */}
            <a
              href={whatsappURL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="
                group relative mt-2 inline-flex items-center gap-2 px-4 py-2.5
                rounded-full bg-jojanes-green text-[#0A0C0B] text-sm font-bold
                self-start overflow-hidden
                hover:shadow-[0_0_20px_rgba(42,233,141,0.4)] hover:scale-[1.03]
                transition-all duration-300
              "
            >
              <span className="icon-[tabler--message-circle] text-base" aria-hidden="true" />
              Let&apos;s work together
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#1A1F1C]">
        <div className="max-w-6xl mx-auto px-4 sm:px-0 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#2D3530] text-xs">{t("copyright")}</p>
          <div className="flex items-center gap-1 text-[#2D3530] text-xs">
            <span>Built with</span>
            <span className="icon-[tabler--heart-filled] text-jojanes-green text-xs mx-0.5" aria-hidden="true" />
            <span>in Cali — Next.js · Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
