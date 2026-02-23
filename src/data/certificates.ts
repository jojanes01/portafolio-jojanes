export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string;
  imageUrl: string;
  importance: 1 | 2 | 3;
  category:
    | "Frontend"
    | "Backend"
    | "Product & Business"
    | "DevOps & Tools"
    | "Languages"
    | "Soft Skills";
}

// MUY IMPORTANTE:
// 1. Agrega aquí tus certificados más importantes que no son de Platzi (ej. Liderazgo).
// 2. He inferido los títulos y años a partir de los nombres de archivo. Por favor, ¡revísalos y ajústalos!

export const certificates: Certificate[] = [
  // --- IMPORTANCIA 1: Habilidades Clave ---
  {
    id: 1,
    title: "Next.js con App Router",
    issuer: "Platzi",
    year: "2024",
    imageUrl: "/images/learning/diploma-nextjs-14.png", //
    importance: 1,
    category: "Frontend",
  },
  {
    id: 2,
    title: "NestJS: Desarrollo Backend Profesional",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-nestjs-2021.png", //
    importance: 1,
    category: "Backend",
  },
  {
    id: 3,
    title: "Introducción a Product Management",
    issuer: "Platzi",
    year: "2024",
    imageUrl: "/images/learning/diploma-intro-product-management.png", //
    importance: 1,
    category: "Product & Business",
  },
  {
    id: 4,
    title: "Automatización con N8N",
    issuer: "Platzi",
    year: "2024",
    imageUrl: "/images/learning/diploma-n8n.png", //
    importance: 1,
    category: "DevOps & Tools",
  },
  {
    id: 5,
    title: "Gestión de Negocios Digitales",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-negocios-digitales.png", //
    importance: 1,
    category: "Product & Business",
  },

  // --- IMPORTANCIA 2: Habilidades Relevantes ---
  {
    id: 6,
    title: "Fundamentos de C#",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-csharp.png", //
    importance: 2,
    category: "Backend",
  },
  {
    id: 7,
    title: "C#: Programación Orientada a Objetos",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-c-sharp-poo.png", //
    importance: 2,
    category: "Backend",
  },
  {
    id: 8,
    title: "Git y GitHub Profesional",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-git-github.png", //
    importance: 2,
    category: "DevOps & Tools",
  },
  {
    id: 9,
    title: "Introducción al Marketing Digital",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-introduccion-marketing.png", //
    importance: 2,
    category: "Product & Business",
  },
  {
    id: 10,
    title: "Creación de Marca Personal",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-marca-personal.png", //
    importance: 2,
    category: "Soft Skills",
  },
  {
    id: 11,
    title: "Fundamentos de E-commerce",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-fundamentos-ecommerce.png", //
    importance: 2,
    category: "Product & Business",
  },
  {
    id: 12,
    title: "Creación de Modelos de Negocio",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-modelos-negocio.png", //
    importance: 2,
    category: "Product & Business",
  },
  {
    id: 13,
    title: "Estrategias de Venta B2B",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-ventas-b2b.png", //
    importance: 2,
    category: "Product & Business",
  },
  {
    id: 14,
    title: "Creación de Páginas Web",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-paginas-web-2022.png", //
    importance: 2,
    category: "Frontend",
  },
  {
    id: 15,
    title: "Cómo Conseguir tus Primeros Clientes",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-tus-primeros-clientes.png", //
    importance: 2,
    category: "Product & Business",
  },
  {
    id: 16,
    title: "Cómo Empezar tu Negocio desde Cero",
    issuer: "Platzi",
    year: "2023",
    imageUrl: "/images/learning/diploma-negocios-desde-cero.png", //
    importance: 2,
    category: "Product & Business",
  },

  // --- IMPORTANCIA 3: Habilidades Fundacionales y Complementarias ---
  {
    id: 17,
    title: "Diseño para Programadores",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-diseno-programadores.png", //
    importance: 3,
    category: "Frontend",
  },
  {
    id: 18,
    title: "Inglés: Artículos y Verbos Modales",
    issuer: "Platzi",
    year: "2021",
    imageUrl: "/images/learning/diploma-articulos-verbosmodales.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 19,
    title: "Inglés: Preguntas y Respuestas",
    issuer: "Platzi",
    year: "2021",
    imageUrl: "/images/learning/diploma-basico-preguntas-respuestas.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 20,
    title: "Inglés: Estrategias de Aprendizaje",
    issuer: "Platzi",
    year: "2021",
    imageUrl: "/images/learning/diploma-estrategias-ingles.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 21,
    title: "Inglés para Principiantes",
    issuer: "Platzi",
    year: "2020",
    imageUrl: "/images/learning/diploma-ingles-basico-principiantes.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 22,
    title: "Inglés para Principiantes (2020)",
    issuer: "Platzi",
    year: "2020",
    imageUrl: "/images/learning/diploma-ingles-principiantes-2020.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 23,
    title: "Inglés: Presente Simple y Vocabulario",
    issuer: "Platzi",
    year: "2021",
    imageUrl:
      "/images/learning/diploma-presente-simple-vocabulario-comun-2021.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 24,
    title: "Inglés: Descripciones Personales",
    issuer: "Platzi",
    year: "2021",
    imageUrl: "/images/learning/diploma-taller-descripciones-personales.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 25,
    title: "Inglés: Taller de Elementos de Trabajo",
    issuer: "Platzi",
    year: "2021",
    imageUrl: "/images/learning/diploma-taller-elementos-trabajo.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 26,
    title: "Inglés: Descripción de la Familia",
    issuer: "Platzi",
    year: "2021",
    imageUrl: "/images/learning/diploma-descripcion-familia.png", //
    importance: 3,
    category: "Languages",
  },
  {
    id: 27,
    title: "Computación Básica",
    issuer: "Platzi",
    year: "2020",
    imageUrl: "/images/learning/diploma-computacion-basica.png", //
    importance: 3,
    category: "DevOps & Tools",
  },
  {
    id: 28,
    title: "Pre-work: Blockchain",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-prework-blockchain.png", //
    importance: 3,
    category: "Backend",
  },
  {
    id: 29,
    title: "Introducción a Canvas",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-canvas.png", //
    importance: 3,
    category: "Frontend",
  },
  {
    id: 30,
    title: "Gestión de Contenido Digital",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-contenido.png", //
    importance: 3,
    category: "Soft Skills",
  },
  {
    id: 31,
    title: "Community Management",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-communitymanager.png", //
    importance: 3,
    category: "Soft Skills",
  },
  {
    id: 32,
    title: "Organiza tu Oficina Virtual con Notion",
    issuer: "Platzi",
    year: "2022",
    imageUrl: "/images/learning/diploma-oficina-virtual-notion.png", //
    importance: 3,
    category: "DevOps & Tools",
  },
];
