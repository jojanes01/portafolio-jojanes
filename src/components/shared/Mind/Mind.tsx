"use client";

import { whatsappURL } from "app/utils/whatsappUrl";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────
   Vertical image column — CSS-animation scroll, no RAF
──────────────────────────────────────────────────────────── */
interface ImgColumnProps {
  images: string[];
  direction?: "up" | "down";
  speed?: number; /* seconds for full loop */
  className?: string;
}

const ImgColumn = ({ images, direction = "up", speed = 30, className = "" }: ImgColumnProps) => {
  const doubled = [...images, ...images]; /* seamless loop */

  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div
        className="flex flex-col gap-3"
        style={{
          animation: `img-scroll-${direction} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full rounded-xl overflow-hidden border border-[#1A1F1C]"
            style={{ height: "140px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes img-scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes img-scroll-down {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          div { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Project images per column
──────────────────────────────────────────────────────────── */
const col1 = [
  "/images/projects/gsc/gsc-1.png",
  "/images/projects/paquetes/paquetes-1.png",
  "/images/projects/gsc/gsc-2.png",
  "/images/projects/paquetes/paquetes-2.png",
  "/images/projects/gsc/gsc-3.png",
];
const col2 = [
  "/images/projects/paquetes/paquetes-3.png",
  "/images/projects/gsc/gsc-4.png",
  "/images/projects/concentrese/concentrese-1.png",
  "/images/projects/paquetes/paquetes-4.png",
  "/images/projects/concentrese/concentrese-2.png",
];
const col3 = [
  "/images/projects/concentrese/concentrese-3.png",
  "/images/projects/gsc/gsc-1.png",
  "/images/projects/paquetes/paquetes-1.png",
  "/images/projects/gsc/gsc-3.png",
  "/images/projects/concentrese/concentrese-1.png",
];

const GLOW_EMAIL = "mailto:jojanes011@gmail.com?subject=Let's%20work%20together";

/* ────────────────────────────────────────────────────────────
   Mind — full CTA section
──────────────────────────────────────────────────────────── */
export const Mind = () => {
  const t = useTranslations("Mind");
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#0A0C0B] border-t border-[#1A1F1C]"
      aria-label="CTA section"
    >
      {/* ── Background: scrolling image columns at very low opacity ── */}
      <div
        className="absolute inset-0 flex gap-3 px-3 pointer-events-none select-none"
        aria-hidden="true"
      >
        {mounted && (
          <>
            <ImgColumn
              images={col1}
              direction="up"
              speed={28}
              className="flex-1 opacity-[0.06]"
            />
            <ImgColumn
              images={col2}
              direction="down"
              speed={34}
              className="flex-1 opacity-[0.06]"
            />
            <ImgColumn
              images={col3}
              direction="up"
              speed={24}
              className="hidden sm:block flex-1 opacity-[0.06]"
            />
            <ImgColumn
              images={col1}
              direction="down"
              speed={38}
              className="hidden lg:block flex-1 opacity-[0.06]"
            />
          </>
        )}
      </div>

      {/* ── Top & bottom fades to blend with page ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-full h-20 z-10"
        style={{ background: "linear-gradient(to bottom, #0A0C0B 0%, transparent 100%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-20 z-10"
        style={{ background: "linear-gradient(to top, #0A0C0B 0%, transparent 100%)" }}
      />

      {/* ── Green glow centre ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <div
          style={{
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(42,233,141,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── CTA content ── */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-0 py-24 sm:py-36 flex flex-col items-center text-center">

        {/* Label pill */}
        <div
          className={`
            inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6
            border border-[#1E2420] bg-[#0D0F0E] text-[#4B5553] text-[11px] font-medium uppercase tracking-[0.15em]
            transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-jojanes-green animate-pulse inline-block" aria-hidden="true" />
          {t("label")}
        </div>

        {/* Headline */}
        <h2
          className={`
            font-bold text-[#F0F2F1] leading-tight mb-5
            transition-all duration-700 delay-100
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.03em" }}
        >
          {t("title")}
        </h2>

        {/* Description */}
        <p
          className={`
            text-[#4B5553] text-base sm:text-lg leading-7 max-w-xl mb-10
            transition-all duration-700 delay-[180ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {t("description")}
        </p>

        {/* CTA buttons */}
        <div
          className={`
            flex flex-col sm:flex-row items-center gap-3
            transition-all duration-700 delay-[260ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {/* Primary — WhatsApp */}
          <a
            href={whatsappURL}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="
              group relative inline-flex items-center gap-2.5 px-7 py-3.5
              rounded-full bg-jojanes-green text-[#0A0C0B] font-bold text-sm
              overflow-hidden transition-all duration-300
              hover:shadow-[0_0_32px_rgba(42,233,141,0.5)] hover:scale-[1.04]
            "
          >
            <span className="icon-[tabler--message-circle-2] text-base" aria-hidden="true" />
            {t("button")}
            {/* shine */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
          </a>

          {/* Secondary — Email */}
          <a
            href={GLOW_EMAIL}
            className="
              inline-flex items-center gap-2 text-sm text-[#4B5553]
              hover:text-jojanes-green transition-colors duration-200
            "
          >
            <span className="icon-[tabler--mail] text-base" aria-hidden="true" />
            {t("alt")}
          </a>
        </div>

        {/* Trust row */}
        <div
          className={`
            flex flex-wrap items-center justify-center gap-6 mt-14
            transition-all duration-700 delay-[340ms]
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          {[
            { icon: "icon-[tabler--clock]", text: "Fast turnaround" },
            { icon: "icon-[tabler--shield-check]", text: "NDA-ready" },
            { icon: "icon-[tabler--world]", text: "Remote friendly" },
          ].map(({ icon, text }) => (
            <div key={text} className="inline-flex items-center gap-2 text-xs text-[#2D3530]">
              <span className={`${icon} text-jojanes-green text-sm`} aria-hidden="true" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
