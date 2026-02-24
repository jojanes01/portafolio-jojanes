"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function WorkflowHero() {
  const t = useTranslations("Workflow");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const baseTransition = "transition-all duration-700 ease-out";
  const fadeSlide = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";

  return (
    <section className="relative w-full pb-12 sm:pb-16">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(42,233,141,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 right-0 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(42,233,141,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-0 relative">
        {/* Badge */}
        <div
          className={`${baseTransition} ${fadeSlide} inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#222] bg-jojanes-dark text-sm text-jojanes-white-muted mb-6`}
          style={{ transitionDelay: "0ms" }}
        >
          <span className="icon-[tabler--sparkles] text-jojanes-green text-base" aria-hidden="true" />
          {t("subtitle")}
        </div>

        {/* Headline with gradient on highlight */}
        <h1
          className={`${baseTransition} ${fadeSlide} font-bold tracking-tight text-jojanes-white`}
          style={{
            transitionDelay: "80ms",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          {t("headlineBefore")}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #2ae98d 0%, #F0F2F1 100%)",
            }}
          >
            {t("headlineHighlight")}
          </span>
          {t("headlineAfter")}
        </h1>

        {/* Description */}
        <p
          className={`${baseTransition} ${fadeSlide} mt-5 text-jojanes-white-muted text-base sm:text-lg leading-7 max-w-[620px]`}
          style={{ transitionDelay: "160ms" }}
        >
          {t("headlineDescription")}
        </p>

        {/* Productivity counter */}
        <div
          className={`${baseTransition} ${fadeSlide} mt-8 flex items-baseline gap-3`}
          style={{ transitionDelay: "240ms" }}
        >
          <span className="text-xs uppercase tracking-widest text-jojanes-white-muted font-medium">
            {t("productivityClaim")}
          </span>
          <span
            className="font-bold tabular-nums text-jojanes-green"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.02em",
              textShadow: "0 0 24px rgba(42,233,141,0.35)",
            }}
          >
            {t("productivityValue")}
          </span>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-20"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #0A0C0B 100%)",
        }}
      />
    </section>
  );
}
