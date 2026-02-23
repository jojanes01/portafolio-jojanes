"use client";
import { useEffect, useRef } from "react";

export const Carrusel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    const scrollAmount = 1;

    const scrollIcons = () => {
      // Si el scrollLeft es mayor o igual a la mitad del ancho del contenedor, reinicia a 0
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollAmount;
      }
      animationId = requestAnimationFrame(scrollIcons);
    };

    animationId = requestAnimationFrame(scrollIcons);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-hidden whitespace-nowrap py-16"
    >
      <div className="flex space-x-8">
        {/* Contenido original */}
        <span
          className="icon-[file-icons--nextjs] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--react] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--spring] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--azure] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--figma] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[logos--graphql] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--nodejs] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--aws] text-5xl text-white px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        {/* Duplicar contenido para efecto de loop */}
        <span
          className="icon-[file-icons--nextjs] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--react] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--spring] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--azure] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--figma] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[logos--graphql] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--nodejs] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--aws] text-5xl text-white px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[file-icons--nextjs] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--react] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--spring] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--azure] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--figma] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[logos--graphql] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--nodejs] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--aws] text-5xl text-white px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        {/* Duplicar contenido para efecto de loop */}
        <span
          className="icon-[file-icons--nextjs] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--react] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--spring] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--azure] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--figma] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[logos--graphql] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--nodejs] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--aws] text-5xl text-white px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[file-icons--nextjs] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--react] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--spring] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--azure] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--figma] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[logos--graphql] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--nodejs] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--aws] text-5xl text-white px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        {/* Duplicar contenido para efecto de loop */}
        <span
          className="icon-[file-icons--nextjs] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--react] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--spring] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--azure] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--figma] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[logos--graphql] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--nodejs] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--aws] text-5xl text-white px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[file-icons--nextjs] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--react] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--spring] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--azure] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--figma] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[logos--graphql] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--nodejs] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--aws] text-5xl text-white px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        {/* Duplicar contenido para efecto de loop */}
        <span
          className="icon-[file-icons--nextjs] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--react] text-white text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--spring] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--azure] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--figma] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[logos--graphql] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[devicon--nodejs] text-5xl px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
        <span
          className="icon-[mdi--aws] text-5xl text-white px-0 sm:px-24"
          role="img"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
