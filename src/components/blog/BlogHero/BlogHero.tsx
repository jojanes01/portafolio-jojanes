"use client";

import { useEffect, useState } from "react";

const ROTATING_WORDS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Docker",
  "AWS",
  "PostgreSQL",
  "GraphQL",
];

export const BlogHero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-jojanes-black">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-jojanes-green-glow/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-jojanes-green/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-jojanes-green-glow/10 rounded-full blur-[150px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #2ae98d 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
      </div>

      <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-jojanes-green/10 border border-jojanes-green/20 text-jojanes-green text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-jojanes-green animate-pulse" />
          <span>Blog Técnico de Programación</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
          <span className="text-jojanes-white">Explora el </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-jojanes-green via-jojanes-green-light to-jojanes-white bg-clip-text text-transparent">
              {ROTATING_WORDS[currentWord]}
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-jojanes-green/0 via-jojanes-green to-jojanes-green/0" />
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-jojanes-white-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Artículos técnicos, tutoriales y mejores prácticas de desarrollo.
          Comparte mi viaje como desarrollador y aprende junto conmigo.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-center">
          <div className="group relative px-6 py-3 rounded-full bg-jojanes-green text-jojanes-black font-semibold cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(42,233,141,0.5)] hover:scale-105">
            <span className="relative z-10">Últimos Artículos</span>
            <div className="absolute inset-0 bg-gradient-to-r from-jojanes-green-light to-jojanes-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <a
            href="#categories"
            className="group px-6 py-3 rounded-full border border-jojanes-border text-jojanes-white font-medium cursor-pointer transition-all duration-300 hover:border-jojanes-green hover:text-jojanes-green"
          >
            Explorar Categorías
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { number: "50+", label: "Artículos" },
            { number: "6+", label: "Años" },
            { number: "10K+", label: "Lectores" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 delay-${index * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="text-3xl sm:text-4xl font-bold text-jojanes-green mb-1">{stat.number}</div>
              <div className="text-sm text-jojanes-white-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-jojanes-white-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};
