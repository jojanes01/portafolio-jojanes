import { BlogWrapper } from "app/components/blog/BlogWrapper";
import { AppBar } from "app/components/shared/AppBar";
import { client } from "app/sanity/lib/client";
import { CATEGORIES_QUERY, POSTS_QUERY } from "app/sanity/lib/queries";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.blog" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://jojanes.com/${locale}/blog`,
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

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);
  const categories = await client.fetch(CATEGORIES_QUERY);
  return (
    <main className="px-4 sm:px-0 max-w-6xl sm:mx-auto">
      <AppBar title="Blog" />
      <BlogWrapper posts={posts} categories={categories} />{" "}
    </main>
  );
}
