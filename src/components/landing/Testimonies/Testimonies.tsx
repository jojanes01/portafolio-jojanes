"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

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

/* ─── Stars ─── */
const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-base ${i < count ? "text-[#F59E0B]" : "text-[#1A1F1C]"}`}
      >
        ★
      </span>
    ))}
  </div>
);

/* ─── Single testimony card ─── */
interface TestimonyProps {
  stars: number;
  text: string;
  name: string;
  src: string;
  alt: string;
  description: string;
}

const TestimonyCard = ({ stars, text, name, src, alt, description }: TestimonyProps) => {
  const [expanded, setExpanded] = useState(false);
  const MAX = 220;
  const needsTruncate = text.length > MAX;

  return (
    <div
      className="
        flex flex-col gap-4 p-6 rounded-2xl border border-[#1A1F1C] bg-[#0D0F0E]
        w-[300px] sm:w-[340px] flex-shrink-0
        hover:border-[#2a2f2c] hover:shadow-[0_0_30px_-8px_rgba(42,233,141,0.10)]
        transition-all duration-300
      "
    >
      {/* Stars + quote icon */}
      <div className="flex items-center justify-between">
        <Stars count={stars} />
        <span className="text-2xl text-[#1E2420] font-serif leading-none select-none">&quot;</span>
      </div>

      {/* Text */}
      <p className="text-[#6B7B72] text-sm leading-6 flex-1">
        {!expanded && needsTruncate ? `${text.slice(0, MAX)}…` : text}
        {needsTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-jojanes-green text-xs font-medium hover:underline transition"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      {/* Divider */}
      <div className="h-px bg-[#1A1F1C]" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-[#1E2420] flex-shrink-0">
          <Image src={src} alt={alt} width={36} height={36} className="object-cover w-full h-full" />
        </div>
        <div>
          <p className="text-[#D0D8D4] text-sm font-semibold leading-none mb-0.5">{name}</p>
          <p className="text-[#4B5553] text-[11px]">{description}</p>
        </div>
      </div>
    </div>
  );
};

/* ─── Testimonies section ─── */
export const Testimonies = () => {
  const t = useTranslations("Testimonies");
  const { ref: headerRef, visible: headerVisible } = useReveal(0);

  const keys = ["grace", "william", "juan", "jorge", "jairo"] as const;

  /* CSS-animation carousel – same pattern as TechCarrusel */
  return (
    <section className="relative w-full overflow-x-hidden max-w-6xl mx-auto pb-0 sm:pb-32">
      {/* ── Section header ── */}
      <div
        ref={headerRef}
        className={`
          px-4 sm:px-0 transition-all duration-700 ease-out mb-10 sm:mb-14
          ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
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
          What people say{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #2ae98d 0%, #1bc476 100%)" }}
          >
            about working with me.
          </span>
        </h2>

        {/* Trust row */}
        <div className="flex flex-wrap items-center gap-4 mt-5">
          <div className="flex -space-x-2">
            {keys.slice(0, 5).map((key) => (
              <div
                key={key}
                className="w-8 h-8 rounded-full border-2 border-[#0e100f] overflow-hidden"
              >
                <Image
                  src={t(`${key}.avatar`) as string}
                  alt={t(`${key}.name`)}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-[#4B5553]">
            <span className="text-[#F0F2F1] font-semibold">{keys.length} professionals</span>{" "}
            have shared their experience working with me
          </p>
        </div>
      </div>

      {/* ── Scrolling carousel ── */}
      <div className="relative overflow-hidden w-full">
        {/* Fade masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-full w-16 sm:w-28 z-10"
          style={{ background: "linear-gradient(to right, #0e100f 0%, transparent 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-full w-16 sm:w-28 z-10"
          style={{ background: "linear-gradient(to left, #0e100f 0%, transparent 100%)" }}
        />

        {/* Track */}
        <div className="flex gap-4 testimonies-track py-4">
          {/* Double for seamless loop */}
          {[0, 1].map((pass) => (
            <div key={pass} className="flex gap-4 flex-shrink-0">
              {keys.map((key) => (
                <TestimonyCard
                  key={`${pass}-${key}`}
                  stars={5}
                  text={t(`${key}.text`)}
                  name={t(`${key}.name`)}
                  src={t(`${key}.avatar`) as string}
                  alt={t(`${key}.name`)}
                  description={t(`${key}.description`)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonies-track {
          animation: testimonies-scroll 36s linear infinite;
          width: max-content;
        }
        .testimonies-track:hover {
          animation-play-state: paused;
        }
        @keyframes testimonies-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonies-track { animation: none; }
        }
      `}</style>
    </section>
  );
};
