import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Link } from "app/i18n/routing";
import { WorkflowHero } from "app/components/workflow/WorkflowHero";
import { WorkflowSteps } from "app/components/workflow/WorkflowSteps";
import { WorkflowStacks } from "app/components/workflow/WorkflowStacks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.workflow" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://jojanes.com/${locale}/workflow`,
      siteName: "Joan Oviedo",
      images: [{ url: "https://jojanes.com/og-services.png", width: 1200, height: 630, alt: t("title") }],
      type: "website",
    },
  };
}

export default async function WorkflowPage() {
  const t = await getTranslations("Workflow");

  return (
    <main className="min-h-screen bg-jojanes-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-0 pb-24 pt-10 sm:pt-14">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 mb-6 text-[11px] text-[#2D3530] uppercase tracking-[0.18em]"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-jojanes-green transition-colors duration-200">
            Home
          </Link>
          <span className="icon-[tabler--chevron-right] text-xs" aria-hidden="true" />
          <span className="text-[#4B5553]">{t("title")}</span>
        </nav>

        <WorkflowHero />
        <WorkflowSteps />
        <WorkflowStacks />

        {/* Divider */}
        <div
          className="mt-6 h-px bg-gradient-to-r from-[#1A1F1C] via-[#2ae98d20] to-[#1A1F1C]"
          aria-hidden="true"
        />
      </div>
    </main>
  );
}
