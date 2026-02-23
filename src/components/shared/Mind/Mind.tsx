"use client";

import { whatsappURL } from "app/utils/whatsappUrl";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef } from "react";

export const Mind = () => {
  const t = useTranslations("Mind");
  const containerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    containerRefs.forEach((ref, index) => {
      const container = ref.current;
      if (!container) return;

      let animationId: number;
      const direction = index % 2 === 0 ? 1 : -1; // Alternar dirección

      const animateScroll = () => {
        container.scrollTop += direction;

        if (
          direction === 1 &&
          container.scrollTop >= container.scrollHeight / 2
        ) {
          container.scrollTop = 0; // Reinicia hacia arriba
        } else if (direction === -1 && container.scrollTop <= 0) {
          container.scrollTop = container.scrollHeight / 2; // Reinicia hacia abajo
        }

        animationId = requestAnimationFrame(animateScroll);
      };

      animationId = requestAnimationFrame(animateScroll);

      return () => cancelAnimationFrame(animationId);
    });
  }, []);

  return (
    <div className="relative text-white pt-16 pb-72 sm:pb-48 px-4 sm:px-0 overflow-hidden max-w-6xl sm:mx-auto">
      {/* Sombras al inicio y al final */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#0e100f] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#0e100f] to-transparent z-20 pointer-events-none" />

      {/* Texto sobrepuesto */}
      <div className="absolute inset-0 mt-32 sm:mt-0 flex flex-col justify-center items-center sm:items-start z-10 text-center sm:text-left space-y-4 px-4 sm:px-0">
        <p className="text-2xl sm:text-4xl font-bold text-neutral-200">
          {t("title")}
        </p>
        <p className="text-base text-jojanes-subtitle sm:text-xl max-w-xl">
          {t("description")}
        </p>
        <Link
          href={whatsappURL}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition"
        >
          {t("button")}
        </Link>
      </div>

      {/* Contenedor de los carruseles */}
      <div className="flex flex-row space-x-2 sm:space-x-4 h-[200px] sm:h-[600px] overflow-hidden relative z-0">
        {/* Carrusel 1 */}
        <div
          ref={containerRefs[0]}
          className="flex flex-col space-y-4 overflow-hidden scroll-auto h-full w-1/2 sm:w-1/3"
        >
          {Array(10)
            .fill("/images/projects/gsc/gsc-1.png")
            .map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Image ${idx}`}
                className="w-full object-cover rounded-lg opacity-5"
              />
            ))}
        </div>
        {/* Carrusel 2 */}
        <div
          ref={containerRefs[1]}
          className="flex flex-col space-y-4 overflow-hidden scroll-auto h-full w-1/2 sm:w-1/3"
        >
          {Array(10)
            .fill("/images/projects/gsc/gsc-2.png")
            .map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Image ${idx}`}
                className="w-full object-cover rounded-lg opacity-5"
              />
            ))}
        </div>
        {/* Carrusel 3 */}
        <div
          ref={containerRefs[2]}
          className="opacity-5 hidden sm:flex flex-col space-y-4 overflow-hidden scroll-auto h-full w-1/3"
        >
          {Array(10)
            .fill("/images/projects/gsc/gsc-3.png")
            .map((src, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-center rounded-lg shadow-lg border border-jojanes-border overflow-hidden p-4 sm:p-16"
                style={{
                  backgroundImage: `url('/images/projects/gsc/gsc-bg.webp')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <img
                  src={src}
                  alt={`Image ${idx}`}
                  className="relative z-50 w-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
