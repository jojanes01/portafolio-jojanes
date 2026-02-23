import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "app/components/shared/Header";
import { Footer } from "app/components/shared/Footer";
import { routing } from "app/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ChangeLocale } from "app/components/shared/ChangeLocale";
import { Whatsapp } from "app/components/shared/Whatsapp";
import { Mind } from "app/components/shared/Mind";
import { GoogleAnalytics } from "@next/third-parties/google";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params; // ✅ Esperar params antes de usarlo
  const t = await getTranslations({ locale, namespace: "Metadata.index" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "Desarrollo de software",
      "Landing pages",
      "SEO",
      "Programador en Cali",
      "Desarrollo web personalizado",
      "Joan Oviedo",
      "Optimización web",
      "Páginas a medida",
      "Posicionamiento en buscadores",
      "Ingeniería de software",
    ],
    authors: [{ name: "Joan Oviedo", url: "https://jojanes.com" }],
    robots: "index, follow",
    alternates: {
      canonical: `https://jojanes.com/${locale}`,
      languages: {
        es: "https://jojanes.com/es",
        en: "https://jojanes.com/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://jojanes.com/${locale}`,
      siteName: "Joan Oviedo | Software Engineer",
      images: [
        {
          url: "https://jojanes.com/og-image.png",
          width: 1200,
          height: 1200,
          alt: t("title"),
        },
      ],
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://jojanes.com/og-image.png"],
    },
  };
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "700", "100", "200", "500", "600", "800", "900"],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "es")) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${dmSans.className}`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <ChangeLocale />
          <Whatsapp />
          <Mind />
          <Footer />
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-8BGXT7JEC4" />
    </html>
  );
}
