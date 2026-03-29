"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "app/i18n/routing";
import { whatsappURL } from "app/utils/whatsappUrl";
import { useEffect, useRef, useState } from "react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

const traits = [
  { icon: "icon-[tabler--code]", label: "Clean Code" },
  { icon: "icon-[tabler--rocket]", label: "Ship Fast" },
  { icon: "icon-[tabler--chart-line]", label: "Scale First" },
  { icon: "icon-[tabler--users]", label: "User-Centric" },
  { icon: "icon-[tabler--brand-github]", label: "Open Source" },
  { icon: "icon-[tabler--coffee]", label: "Coffee-Powered" },
];

const quickStats = [
  { value: "6+", label: "Years building" },
  { value: "20+", label: "Products shipped" },
  { value: "1M+", label: "Users served" },
];

export const About = () => {
  const t = useTranslations("About");
  const { ref: headerRef, visible: headerVisible } = useReveal(0);
  const { ref: leftRef, visible: leftVisible } = useReveal(100);
  const { ref: rightRef, visible: rightVisible } = useReveal(200);

  return (
    <section id="about" className="max-w-6xl mx-auto sm:mx-auto pb-0 sm:pb-32 px-4 sm:px-0">
      {/* ── Section header ── */}
      <div
        ref={headerRef}
        className={`transition-all duration-700 ease-out mb-10 sm:mb-14 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="icon-[tabler--point-filled] text-jojanes-green text-xl" aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#4B5553] font-medium">
            {t("title")}
          </span>
        </div>
        <h2
          className="font-bold text-[#F0F2F1] leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.025em" }}
        >
          The person behind the{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #2ae98d 0%, #1bc476 100%)" }}
          >
            code.
          </span>
        </h2>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* ── Left col (2/5): Profile card + stats ── */}
        <div
          ref={leftRef}
          className={`lg:col-span-2 flex flex-col gap-5 transition-all duration-700 ease-out ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {/* Profile card */}
          <div className="relative rounded-2xl border border-[#1A1F1C] bg-[#0D0F0E] overflow-hidden p-6 flex flex-col items-center text-center">
            {/* Glow behind avatar */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(42,233,141,0.08) 0%, transparent 70%)", filter: "blur(20px)" }}
            />
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden mb-4"
              style={{ boxShadow: "0 0 0 2px #2ae98d, 0 0 24px rgba(42,233,141,0.2)" }}
            >
              <Image src="/images/perfil.webp" alt="Joan Oviedo" fill className="object-cover" />
            </div>
            <p className="font-bold text-[#F0F2F1] text-lg">Joan Sebastian Oviedo</p>
            <p className="text-[#4B5553] text-sm mt-1">Senior Fullstack Developer</p>
            <p className="text-[#4B5553] text-xs mt-0.5 flex items-center gap-1 justify-center">
              <span className="icon-[tabler--map-pin] text-jojanes-green text-sm" aria-hidden="true" />
              Cali, Colombia
            </p>

            <div className="w-full h-px bg-[#1A1F1C] my-5" />

            {/* Trait pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {traits.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#1E2420] bg-[#111712] text-[11px] text-[#6B7B72] font-medium"
                >
                  <span className={`${t.icon} text-jojanes-green text-sm`} aria-hidden="true" />
                  {t.label}
                </span>
              ))}
            </div>

            <div className="w-full h-px bg-[#1A1F1C] my-5" />

            {/* CTA */}
            <Link
              href={whatsappURL}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 w-full justify-center rounded-full bg-jojanes-green text-[#0A0C0B] font-semibold text-sm cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(42,233,141,0.45)] hover:scale-[1.02]"
            >
              <span className="icon-[wpf--calendar] text-base" aria-hidden="true" />
              {t("introduction.buttonText")}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
            </Link>
          </div>

          {/* Quick stats card */}
          <div className="rounded-2xl border border-[#1A1F1C] bg-[#0D0F0E] p-6 grid grid-cols-3 gap-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-1">
                <span
                  className="font-bold text-[#F0F2F1] tabular-nums"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#4B5553] uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right col (3/5): Bio paragraphs ── */}
        <div
          ref={rightRef}
          className={`lg:col-span-3 flex flex-col gap-5 transition-all duration-700 ease-out ${rightVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          {/* Bio card */}
          <div className="rounded-2xl border border-[#1A1F1C] bg-[#0D0F0E] p-7 sm:p-8 flex flex-col gap-5 h-full">
            {/* Pull-quote headline */}
            <p className="text-[#F0F2F1] text-lg sm:text-xl font-semibold leading-snug" style={{ letterSpacing: "-0.01em" }}>
              &quot;{t("introduction.headline")}&quot;
            </p>

            <div className="w-full h-px bg-[#1A1F1C]" />

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4">
              <p className="text-[#6B7B72] text-sm sm:text-base leading-7">{t("description.part1")}</p>
              <p className="text-[#6B7B72] text-sm sm:text-base leading-7">{t("description.part2")}</p>
              <p className="text-[#6B7B72] text-sm sm:text-base leading-7">{t("description.part3")}</p>
            </div>

            <div className="w-full h-px bg-[#1A1F1C] mt-auto" />

            {/* Bottom accent row */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#4B5553]">
                <span className="w-2 h-2 rounded-full bg-jojanes-green animate-pulse inline-block" aria-hidden="true" />
                Open to remote opportunities
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#4B5553]">
                <span className="icon-[tabler--world] text-jojanes-green text-sm" aria-hidden="true" />
                English & Spanish fluent
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#4B5553]">
                <span className="icon-[tabler--clock] text-jojanes-green text-sm" aria-hidden="true" />
                UTC-5 (Cali, Colombia)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
