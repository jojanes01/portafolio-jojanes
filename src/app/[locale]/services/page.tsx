import { ServiceCard } from "app/components/services/ServiceCard";
import { AppBar } from "app/components/shared/AppBar";
import { services } from "app/utils/data/services";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.services" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://jojanes.com/${locale}/services`,
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

export default async function ServicesPage() {
  const t = await getTranslations("Services");

  return (
    <main className="px-4 sm:px-0 max-w-6xl sm:mx-auto">
      <AppBar title={t("title")} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4 sm:py-16">
        {services.map((service) => {
          const title = t(`list.${service.id}.title`);
          const description = t(`list.${service.id}.description`);
          return (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={title}
              description={description}
              link={service.link}
            />
          );
        })}
      </div>
    </main>
  );
}
