import { CollapsibleCategory } from "app/components/projects/CollapsibleCategory";
import { AppBar } from "app/components/shared/AppBar";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.projects" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://jojanes.com/${locale}/projects`,
      siteName: "Joan Oviedo",
      images: [
        {
          url: "https://jojanes.com/og-services.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      type: "website",
    },
  };
}

export default function ProjectsPage() {
  const t = useTranslations("Projects");

  // Categorías y proyectos dinámicos
  const categories = [
    {
      type: "Aplicaciones Fullstack",
      projects: [
        {
          id: "globalStreaming",
          name: t("items.globalStreaming.name"),
          description: t("items.globalStreaming.description"),
          role: t("items.globalStreaming.role"),
          deliverables: t("items.globalStreaming.deliverables"),
          company: t("items.globalStreaming.company"),
          year: t("items.globalStreaming.year"),
          images: [
            "/images/projects/gsc/gsc-1.png",
            "/images/projects/gsc/gsc-2.png",
            "/images/projects/gsc/gsc-3.png",
            "/images/projects/gsc/gsc-4.png",
          ],
          bg: "/images/projects/gsc/gsc-bg.webp",
          url: "https://globalstreamingcommunity.com",
        },
        {
          id: "paquetesMovistarPrepago",
          name: t("items.paquetesMovistarPrepago.name"),
          description: t("items.paquetesMovistarPrepago.description"),
          role: t("items.paquetesMovistarPrepago.role"),
          deliverables: t("items.paquetesMovistarPrepago.deliverables"),
          company: t("items.paquetesMovistarPrepago.company"),
          year: t("items.paquetesMovistarPrepago.year"),
          images: [
            "/images/projects/paquetes/paquetes-1.png",
            "/images/projects/paquetes/paquetes-2.png",
            "/images/projects/paquetes/paquetes-3.png",
            "/images/projects/paquetes/paquetes-4.png",
          ],
          bg: "/images/projects/paquetes/paquetes-bg.webp",
          url: "https://prepago.movistar.co/paquetes",
        },
        {
          id: "concentreseMovistarPrepago",
          name: t("items.concentreseMovistarPrepago.name"),
          description: t("items.concentreseMovistarPrepago.description"),
          role: t("items.concentreseMovistarPrepago.role"),
          deliverables: t("items.concentreseMovistarPrepago.deliverables"),
          company: t("items.concentreseMovistarPrepago.company"),
          year: t("items.concentreseMovistarPrepago.year"),
          images: [
            "/images/projects/concentrese/concentrese-1.png",
            "/images/projects/concentrese/concentrese-2.png",
            "/images/projects/concentrese/concentrese-3.png",
          ],
          bg: "/images/projects/concentrese/concentrese-bg.webp",
          url: "https://prepago.movistar.co/concentrese",
        },
        // Agrega aquí más proyectos Fullstack
      ],
    },
    {
      type: "Landings",
      projects: [
        {
          id: "juridicosAsociados",
          name: t("items.juridicosAsociados.name"),
          description: t("items.juridicosAsociados.description"),
          role: t("items.juridicosAsociados.role"),
          deliverables: t("items.juridicosAsociados.deliverables"),
          company: t("items.juridicosAsociados.company"),
          year: t("items.juridicosAsociados.year"),
          images: [
            "/images/projects/juridicos/juridicos-1.png",
            "/images/projects/juridicos/juridicos-2.png",
            "/images/projects/juridicos/juridicos-3.png",
            "/images/projects/juridicos/juridicos-4.png",
          ],
          bg: "/images/projects/juridicos/juridicos-bg.webp",
          url: "https://juridicosyasociados.com",
        },
        {
          id: "abogadosCali",
          name: t("items.abogadosCali.name"),
          description: t("items.abogadosCali.description"),
          role: t("items.abogadosCali.role"),
          deliverables: t("items.abogadosCali.deliverables"),
          company: t("items.abogadosCali.company"),
          year: t("items.abogadosCali.year"),
          images: [
            "/images/projects/abogadosCali/abogadosCali-1.png",
            "/images/projects/abogadosCali/abogadosCali-2.png",
            "/images/projects/abogadosCali/abogadosCali-3.png",
          ],
          bg: "/images/projects/abogadosCali/abogadosCali-bg.webp",
          url: "https://abogadoscali.com",
        },
        {
          id: "jjsecurity",
          name: t("items.jjsecurity.name"),
          description: t("items.jjsecurity.description"),
          role: t("items.jjsecurity.role"),
          deliverables: t("items.jjsecurity.deliverables"),
          company: t("items.jjsecurity.company"),
          year: t("items.jjsecurity.year"),
          images: [
            "/images/projects/jjsecurity/jjsecurity-1.png",
            "/images/projects/jjsecurity/jjsecurity-2.png",
            "/images/projects/jjsecurity/jjsecurity-3.png",
            "/images/projects/jjsecurity/jjsecurity-4.png",
          ],
          bg: "/images/projects/jjsecurity/jjsecurity-bg.webp",
          url: "https://jjsecuritygroup.com",
        },
        {
          id: "portfolioAlejandra",
          name: t("items.portfolioAlejandra.name"),
          description: t("items.portfolioAlejandra.description"),
          role: t("items.portfolioAlejandra.role"),
          deliverables: t("items.portfolioAlejandra.deliverables"),
          company: t("items.portfolioAlejandra.company"),
          year: t("items.portfolioAlejandra.year"),
          images: [
            "/images/projects/portfolioAlejandra/portfolioAlejandra-1.png",
            "/images/projects/portfolioAlejandra/portfolioAlejandra-2.png",
            "/images/projects/portfolioAlejandra/portfolioAlejandra-3.png",
          ],
          bg: "/images/projects/portfolioAlejandra/portfolioAlejandra-bg.webp",
          url: "https://alejandra-portafolio.vercel.app/es-CO",
        },
      ],
    },
  ];

  return (
    <main className="px-4 sm:px-0 max-w-6xl sm:mx-auto">
      <AppBar title={t("title")} />
      {categories.map((category) => (
        <CollapsibleCategory key={category.type} category={category} />
      ))}
    </main>
  );
}
