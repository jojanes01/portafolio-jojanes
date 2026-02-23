// app/sitemap.ts
import type { MetadataRoute } from "next";

// Ajusta tu dominio
const BASE_URL = "https://jojanes.com";

// Para mayor consistencia, define todas las rutas que tengas en ES y su par en EN
const routes = [
  { es: "/es", en: "/en" },
  { es: "/es/services", en: "/en/services" },
  {
    es: "/es/services/custom-software-development",
    en: "/en/services/custom-software-development",
  },
  { es: "/es/services/seo", en: "/en/services/seo" },
  {
    es: "/es/services/digital-transformation",
    en: "/en/services/digital-transformation",
  },
  { es: "/es/services/cro", en: "/en/services/cro" },
  {
    es: "/es/services/business-intelligence",
    en: "/en/services/business-intelligence",
  },
  {
    es: "/es/services/consulting-support",
    en: "/en/services/consulting-support",
  },
  { es: "/es/projects", en: "/en/projects" },
  { es: "/es/blog", en: "/en/blog" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Genera tu array de objetos para el sitemap, usando el tipo oficial de Next.js
  return routes.map((route) => ({
    url: `${BASE_URL}${route.es}`, // La "versión principal" (aquí en ES)
    lastModified: new Date(), // O fija una fecha tipo '2025-02-17'
    changeFrequency: "monthly", // Sugerencia para Google
    priority: 0.7, // Ajusta según importancia
    alternates: {
      languages: {
        // Aquí declaras las versiones en otros idiomas
        en: `${BASE_URL}${route.en}`,
      },
    },
  }));
}
