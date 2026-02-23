import { BenefitCard } from "app/components/services/BenefitCard";
import { UseCaseCard } from "app/components/services/UseCaseCard";
import { whatsappURL } from "app/utils/whatsappUrl";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Services.list" });

  // ✅ Verifica si el slug existe en la lista de servicios
  const serviceTitle = t(`${slug}.title`, { default: null });
  const serviceDescription = t(`${slug}.description`, { default: null });

  if (!serviceTitle) {
    notFound(); // Retorna 404 si el slug no existe
  }

  return {
    title: serviceTitle,
    description: serviceDescription,
    keywords: [
      serviceTitle,
      "Servicios de desarrollo",
      "SEO",
      "CRO",
      "Transformación Digital",
      "Business Intelligence",
    ],
    openGraph: {
      title: serviceTitle,
      description: serviceDescription,
      url: `https://jojanes.com/${locale}/services/${slug}`,
      siteName: "Joan Oviedo",
      images: [
        {
          url: `https://jojanes.com/images/services/${slug}.webp`,
          width: 1200,
          height: 630,
          alt: serviceTitle,
        },
      ],
      type: "article",
      locale: locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: serviceTitle,
      description: serviceDescription,
      images: [`https://jojanes.com/images/services/${slug}.webp`],
    },
    alternates: {
      canonical: `https://jojanes.com/${locale}/services/${slug}`,
      languages: {
        es: `https://jojanes.com/es/services/${slug}`,
        en: `https://jojanes.com/en/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({ params }: { params: any }) {
  const t = await getTranslations("Services.list");
  const { slug } = await params;

  const serviceTitle = t(`${slug}.title`);
  const serviceDescription = t(`${slug}.description`);
  const serviceDetails = t(`${slug}.details`);
  const serviceQuote = t(`${slug}.quote`);
  const serviceImage = t(`${slug}.image`);
  const benefitKeys = ["benefit1", "benefit2", "benefit3", "benefit4"];
  const useCaseKeys = ["useCase1", "useCase2", "useCase3", "useCase4"];
  const processKeys = ["step1", "step2", "step3", "step4", "step5", "step6"];
  const faqKeys = ["faq1", "faq2", "faq3", "faq4"];

  if (!serviceTitle) {
    notFound();
  }

  return (
    <main className="flex flex-col space-y-16 py-8 px-4 sm:px-0 max-w-6xl mx-auto text-jojanes-white">
      <header className="text-center space-y-6">
        <h1 className="text-5xl font-black text-jojanes-green">
          {serviceTitle}
        </h1>
        <p className="text-xl text-jojanes-subtitle max-w-2xl mx-auto">
          {serviceDescription}
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-jojanes-green">
            {serviceQuote}
          </h2>
          <p className="text-lg">{serviceDetails}</p>
          <Link
            href={whatsappURL}
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-jojanes-green text-jojanes-black font-bold rounded-lg transition-transform hover:scale-105"
          >
            <span
              className="icon-[tabler--message-circle] mr-2 text-2xl"
              role="img"
              aria-hidden="true"
            />
            {t("button")}
            <span
              className="icon-[tabler--arrow-right] ml-2 text-2xl"
              role="img"
              aria-hidden="true"
            />{" "}
          </Link>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image
            src={`/images/services/${serviceImage}`}
            alt={serviceTitle}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-center text-jojanes-green">
          {t("titleUseCases")}
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {useCaseKeys.map((key) => (
            <UseCaseCard
              key={key}
              title={t(`${slug}.useCases.${key}.title`)}
              example={t(`${slug}.useCases.${key}.example`)}
              icon={t(`${slug}.useCases.${key}.icon`)}
            />
          ))}
        </div>
      </section>

      <section className="bg-jojanes-gray p-8 rounded-lg space-y-8">
        <h3 className="text-3xl font-bold text-center text-jojanes-green">
          {t("titleProcess")}
        </h3>
        <ul className="grid md:grid-cols-2 gap-6">
          {processKeys.map((key) => (
            <li key={key} className="flex items-center space-x-4">
              <span
                className="icon-[bi--check2-circle] text-jojanes-green text-3xl"
                role="img"
              />
              <span className="text-lg">{t(`${slug}.process.${key}`)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-center text-jojanes-green">
          {t("titleBenefits")}
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {benefitKeys.map((key) => (
            <BenefitCard
              key={key}
              title={t(`${slug}.benefits.${key}.title`)}
              description={t(`${slug}.benefits.${key}.description`)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h3 className="text-3xl font-bold text-center text-jojanes-green">
          {t("titleFAQ")}
        </h3>
        <div className="space-y-6">
          {faqKeys.map((key) => (
            <div key={key} className="bg-jojanes-gray p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-2">
                {t(`${slug}.faq.${key}.question`)}
              </h4>
              <p className="text-jojanes-subtitle">
                {t(`${slug}.faq.${key}.answer`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center">
        <Link
          href={whatsappURL}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="inline-flex items-center px-8 py-4 bg-jojanes-green text-jojanes-black font-bold rounded-lg text-lg transition-transform hover:scale-105"
        >
          {t("buttonStart")}
          <span
            className="icon-[tabler--arrow-right] ml-2 text-2xl"
            role="img"
            aria-hidden="true"
          />
        </Link>
      </footer>
    </main>
  );
}
