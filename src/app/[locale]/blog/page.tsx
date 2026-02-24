import { BlogHero } from "app/components/blog/BlogHero/BlogHero";
import { BlogWrapper } from "app/components/blog/BlogWrapper/BlogWrapper";
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
          url: "https://jojanes.com/og-blog.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://jojanes.com/og-blog.png"],
    },
    alternates: {
      languages: {
        en: "https://jojanes.com/en/blog",
        es: "https://jojanes.com/es/blog",
      },
    },
  };
}

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);
  const categories = await client.fetch(CATEGORIES_QUERY);

  return (
    <main className="min-h-screen bg-jojanes-black">
      <BlogHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" id="categories">
        <BlogWrapper posts={posts} categories={categories} />
      </div>
    </main>
  );
}
