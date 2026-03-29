"use client";
import { useTranslations } from "next-intl";
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
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

/* Company metadata for visual accents */
const companyMeta: Record<string, { color: string; icon: string; location: string }> = {
  telefonica: { color: "#00B8E2", icon: "icon-[simple-icons--movistar]", location: "Cali, Colombia" },
  indra: { color: "#E63946", icon: "icon-[tabler--plane]", location: "Spain (Remote)" },
  prevalentware: { color: "#8B5CF6", icon: "icon-[tabler--code-dots]", location: "Cali, Colombia" },
  grupoAfl: { color: "#F59E0B", icon: "icon-[tabler--building]", location: "Cali, Colombia" },
  gemda: { color: "#2ae98d", icon: "icon-[tabler--device-laptop]", location: "Cali, Colombia" },
  elroble: { color: "#F97316", icon: "icon-[tabler--tree]", location: "Cali, Colombia" },
};

interface ExperienceItemProps {
  company: string;
  job: string;
  date: string;
  isLast: boolean;
  delay: number;
  meta: { color: string; icon: string; location: string };
}

const ExperienceItem = ({ company, job, date, isLast, delay, meta }: ExperienceItemProps) => {
  const { ref, visible } = useReveal(delay);

  return (
    <div
      ref={ref}
      className={`relative flex gap-5 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
        }`}
    >
      {/* ── Timeline column ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10"
          style={{ borderColor: meta.color, background: `${meta.color}15` }}
        >
          <span className={`${meta.icon} text-base`} style={{ color: meta.color }} aria-hidden="true" />
        </div>
        {/* Connecting line */}
        {!isLast && (
          <div className="w-px flex-1 my-1" style={{ background: "linear-gradient(to bottom, #1A1F1C, transparent)" }} />
        )}
      </div>

      {/* ── Content ── */}
      <div
        className={`flex-1 rounded-2xl border bg-[#0D0F0E] p-5 sm:p-6 mb-4 transition-all duration-300 hover:border-[#2a2f2c] hover:shadow-[0_0_30px_-8px_rgba(42,233,141,0.1)] group`}
        style={{ borderColor: "#1A1F1C" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          {/* Company + role */}
          <div className="flex flex-col gap-1.5">
            <h3
              className="font-bold text-[#F0F2F1] text-base sm:text-lg leading-snug"
              style={{ letterSpacing: "-0.01em" }}
            >
              {company}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold"
                style={{ color: meta.color, background: `${meta.color}18` }}
              >
                <span className="icon-[tabler--briefcase] text-xs" aria-hidden="true" />
                {job}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#4B5553]">
                <span className="icon-[tabler--map-pin] text-xs" aria-hidden="true" />
                {meta.location}
              </span>
            </div>
          </div>

          {/* Date badge */}
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#4B5553] border border-[#1E2420] bg-[#111712] px-3 py-1 rounded-full whitespace-nowrap self-start">
            <span className="icon-[tabler--calendar] text-xs text-jojanes-green" aria-hidden="true" />
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Experience = () => {
  const t = useTranslations("Experience");
  const { ref: headerRef, visible: headerVisible } = useReveal(0);

  const keys = ["telefonica", "indra", "prevalentware", "grupoAfl", "gemda", "elroble"] as const;

  return (
    <section id="experience" className="max-w-6xl mx-auto sm:mx-auto pb-0 sm:pb-32 px-4 sm:px-0">
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
          Where I&apos;ve built{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #2ae98d 0%, #1bc476 100%)" }}
          >
            real impact.
          </span>
        </h2>
        <p className="text-[#4B5553] text-sm sm:text-base mt-3 max-w-xl leading-7">
          6+ years across enterprise, startups, and freelance — from Telefónica&apos;s 1M-user platforms to independent product launches.
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="flex flex-col">
        {keys.map((key, i) => (
          <ExperienceItem
            key={key}
            company={t(`items.${key}.company`)}
            job={t(`items.${key}.job`)}
            date={t(`items.${key}.date`)}
            isLast={i === keys.length - 1}
            delay={i * 80}
            meta={companyMeta[key]}
          />
        ))}
      </div>
    </section>
  );
};
