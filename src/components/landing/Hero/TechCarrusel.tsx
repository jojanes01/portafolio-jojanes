"use client";

const TECH_STACK = [
    { icon: "icon-[file-icons--nextjs]", label: "Next.js", color: "#FFFFFF" },
    { icon: "icon-[mdi--react]", label: "React", color: "#61DAFB" },
    { icon: "icon-[devicon--spring]", label: "Spring Boot", color: "#6DB33F" },
    { icon: "icon-[devicon--typescript]", label: "TypeScript", color: "#3178C6" },
    { icon: "icon-[devicon--nodejs]", label: "Node.js", color: "#339933" },
    { icon: "icon-[mdi--aws]", label: "AWS", color: "#FF9900" },
    { icon: "icon-[devicon--postgresql]", label: "PostgreSQL", color: "#4169E1" },
    { icon: "icon-[devicon--azure]", label: "Azure", color: "#0089D6" },
    { icon: "icon-[logos--graphql]", label: "GraphQL", color: "#E10098" },
    { icon: "icon-[devicon--docker]", label: "Docker", color: "#2496ED" },
    { icon: "icon-[devicon--figma]", label: "Figma", color: "#F24E1E" },
    { icon: "icon-[simple-icons--sanity]", label: "Sanity", color: "#F03E2F" },
];

/* Duplicate for seamless loop */
const DOUBLED = [...TECH_STACK, ...TECH_STACK];

interface TechItemProps {
    icon: string;
    label: string;
    color: string;
}

const TechItem = ({ icon, label, color }: TechItemProps) => (
    <div className="flex flex-col items-center gap-2 px-6 sm:px-10 group cursor-default select-none">
        <span
            className={`${icon} text-4xl sm:text-5xl transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(42,233,141,0.5)]`}
            style={{ color }}
            role="img"
            aria-hidden="true"
        />
        <span className="text-[10px] sm:text-xs text-[#4B5553] font-medium tracking-wider uppercase transition-colors duration-300 group-hover:text-jojanes-green">
            {label}
        </span>
    </div>
);

export const TechCarrusel = () => {
    return (
        <div className="relative mt-14 sm:mt-16">
            {/* Section label */}
            <p className="text-center text-[11px] text-[#3D4743] uppercase tracking-[0.2em] font-medium mb-6">
                Tech Stack
            </p>

            {/* Fade masks on edges */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 h-full w-16 sm:w-28 z-10"
                style={{
                    background:
                        "linear-gradient(to right, #0e100f 0%, transparent 100%)",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-full w-16 sm:w-28 z-10"
                style={{
                    background:
                        "linear-gradient(to left, #0e100f 0%, transparent 100%)",
                }}
            />

            {/* Scrolling track */}
            <div className="overflow-hidden">
                <div className="flex carousel-track" aria-label="Tech stack carousel">
                    {DOUBLED.map((tech, i) => (
                        <TechItem key={i} {...tech} />
                    ))}
                </div>
            </div>

            {/* Thin divider below */}
            <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-[#222] to-transparent" />

            <style jsx>{`
        .carousel-track {
          animation: scroll-left 28s linear infinite;
          width: max-content;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .carousel-track {
            animation: none;
          }
        }
      `}</style>
        </div>
    );
};
