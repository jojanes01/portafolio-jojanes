"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Title } from "app/components/shared/Title";
import { AvatarChip } from "app/components/shared/AvatarChip/AvatarChip";

export const Testimonies = () => {
  const t = useTranslations("Testimonies");

  // Claves de los testimonios
  const keys = ["grace", "william", "juan", "jorge", "jairo"] as const;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    const scrollAmount = 1;

    const scrollTestimonies = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      container.scrollLeft += scrollAmount;
      animationId = requestAnimationFrame(scrollTestimonies);
    };

    animationId = requestAnimationFrame(scrollTestimonies);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="relative max-w-6xl sm:mx-auto pb-0 sm:pb-32">
      <Title title={t("title")} />
      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex overflow-x-hidden whitespace-nowrap py-8 space-x-8"
        >
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex space-x-8">
              {keys.map((key) => (
                <Testimony
                  key={`${idx}-${key}`}
                  stars={5} // Puedes ajustar las estrellas dinámicamente
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
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-jojanes-gray to-transparent pointer-events-none brightness-50"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-jojanes-gray to-transparent pointer-events-none brightness-50"></div>
      </div>
    </section>
  );
};

interface TestimonyProps {
  stars: number;
  text: string;
  name: string;
  src: string;
  alt: string;
  description: string;
}

const Testimony = ({
  stars,
  text,
  name,
  src,
  alt,
  description,
}: TestimonyProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 400; // Número máximo de caracteres antes de truncar

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col bg-jojanes-gray border border-[#262827] space-y-4 px-6 py-8 w-[350px] rounded-xl h-full">
      <Stars count={stars} />
      <p className="text-jojanes-subtitle text-base text-wrap flex-grow">
        {isExpanded || text.length <= maxLength
          ? text
          : `${text.slice(0, maxLength)}...`}
        {text.length > maxLength && (
          <button
            onClick={toggleExpand}
            className="text-jojanes-green ml-2 underline hover:text-jojanes-green-light transition"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </p>
      <div className="mt-auto">
        <AvatarChip
          name={name}
          src={src}
          alt={alt}
          description={description}
          type="avatar"
        />
      </div>
    </div>
  );
};

interface StarsProps {
  count: number;
}

const Stars = ({ count }: StarsProps) => (
  <div className="flex flex-row items-center">
    {Array.from({ length: count }, (_, i) => (
      <span
        key={i}
        className="icon-[material-symbols--star] text-lg text-[#aeb2bb]"
        role="img"
        aria-hidden="true"
      />
    ))}
  </div>
);
