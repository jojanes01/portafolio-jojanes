import { PortableTextComponents } from "app/components/blog/PortableText";
import { Link } from "app/i18n/routing";
import { Metadata } from "next";
import { client } from "app/sanity/lib/client";
import { POST_QUERY, RELATED_POSTS_QUERY } from "app/sanity/lib/queries";
import { urlFor } from "app/utils/urlFor";
import { getTranslations } from "next-intl/server";
import { PortableText } from "next-sanity";
import Image from "next/image";

interface PostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

function calculateReadingTime(body: any): number {
  if (!body || !Array.isArray(body)) return 5;
  const text = body
    .filter((block: any) => block._type === "block")
    .map((block: any) => block.children?.map((c: any) => c.text).join(""))
    .join(" ");
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const t = await getTranslations("Blog");
  const post: any = await client.fetch(POST_QUERY, { slug });
  
  const readingTime = post?.readingTime || calculateReadingTime(post?.body);
  const relatedPosts = await client.fetch(RELATED_POSTS_QUERY, { currentSlug: slug });

  if (!post) {
    return (
      <div className="min-h-screen bg-jojanes-black flex items-center justify-center">
        <div className="text-center">
          <span className="icon-[tabler--file-off] text-6xl text-jojanes-white-muted mb-4 block" />
          <h1 className="text-3xl font-bold text-jojanes-white mb-2">{t("notFound")}</h1>
          <Link href="/blog" className="text-jojanes-green hover:underline">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const tableOfContents = post.body
    ?.filter((block: any) => block.style === "h2")
    .map((block: any) => ({
      id: block.children?.[0]?.text?.replace(/\s+/g, "-").toLowerCase() || "",
      text: block.children?.[0]?.text || "",
    })) || [];

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://jojanes.com/${locale}/blog/${slug}`;
  const shareTitle = post.title;

  return (
    <main className="min-h-screen bg-jojanes-black">
      <article>
        <header className="relative pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-jojanes-green-glow/30 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-jojanes-green/20 rounded-full blur-[100px]" />
          </div>
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-jojanes-white-muted hover:text-jojanes-green transition-colors mb-8"
            >
              <span className="icon-[tabler--arrow-left]" />
              Volver al Blog
            </Link>

            <div className="flex flex-wrap gap-3 mb-6">
              {post.categories?.map((cat: any) => (
                <Link
                  key={cat.title}
                  href={`/blog?category=${cat.slug?.current || cat.title.toLowerCase()}`}
                  className="px-4 py-1.5 rounded-full bg-jojanes-green/10 border border-jojanes-green/30 text-jojanes-green text-sm font-medium hover:bg-jojanes-green hover:text-jojanes-black transition-all"
                >
                  {cat.title}
                </Link>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-jojanes-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-jojanes-white-muted mb-8 max-w-3xl leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-jojanes-white-muted">
              <div className="flex items-center gap-3">
                <Image
                  src={post.author?.image ? urlFor(post.author.image).url() : ""}
                  alt={post.author?.name || "Author"}
                  width={44}
                  height={44}
                  className="rounded-full border-2 border-jojanes-green/30"
                />
                <div>
                  <p className="text-jojanes-white font-medium">{post.author?.name}</p>
                  <p className="text-xs">{post.author?.bio || "Ingeniero Informático"}</p>
                </div>
              </div>
              
              <span className="hidden sm:inline text-jojanes-border">|</span>
              
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="icon-[tabler--calendar]" />
                  {new Date(post.publishedAt).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="icon-[tabler--clock]" />
                  {readingTime} min de lectura
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-jojanes-border">
              <span className="text-sm text-jojanes-white-muted">Compartir:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-jojanes-surface border border-jojanes-border flex items-center justify-center text-jojanes-white-muted hover:border-jojanes-green hover:text-jojanes-green transition-all"
              >
                <span className="icon-[tabler--brand-twitter]" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-jojanes-surface border border-jojanes-border flex items-center justify-center text-jojanes-white-muted hover:border-jojanes-green hover:text-jojanes-green transition-all"
              >
                <span className="icon-[tabler--brand-linkedin]" />
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`}
                className="w-10 h-10 rounded-full bg-jojanes-surface border border-jojanes-border flex items-center justify-center text-jojanes-white-muted hover:border-jojanes-green hover:text-jojanes-green transition-all"
              >
                <span className="icon-[tabler--mail]" />
              </a>
            </div>
          </div>
        </header>

        {post.mainImage && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-jojanes-green/10">
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
              {post.mainImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-sm text-white/80 text-center">{post.mainImage.caption}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-jojanes-white uppercase tracking-wider mb-4">
                    Tabla de Contenidos
                  </h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item: any) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-jojanes-white-muted hover:text-jojanes-green transition-colors py-1 border-l-2 border-transparent hover:border-jojanes-green pl-3"
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="p-5 rounded-xl bg-jojanes-surface border border-jojanes-border">
                  <h4 className="font-semibold text-jojanes-white mb-3">¿Te gustó?</h4>
                  <p className="text-sm text-jojanes-white-muted mb-4">
                    Comparte este artículo con tus colegas desarrolladores.
                  </p>
                  <button className="w-full py-2.5 rounded-lg bg-jojanes-green text-jojanes-black font-medium hover:shadow-[0_0_20px_rgba(42,233,141,0.4)] transition-all">
                    Suscribirse
                  </button>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="prose prose-invert prose-lg max-w-none">
                <PortableText
                  value={post.body}
                  components={PortableTextComponents}
                />
              </div>

              {post.seo?.keywords && post.seo.keywords.length > 0 && (
                <div className="mt-12 pt-8 border-t border-jojanes-border">
                  <h4 className="text-sm font-semibold text-jojanes-white uppercase tracking-wider mb-4">
                    Palabras clave
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.seo.keywords.map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-jojanes-surface border border-jojanes-border text-jojanes-white-muted text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {relatedPosts && relatedPosts.length > 0 && (
            <section className="mt-20 pt-12 border-t border-jojanes-border">
              <h2 className="text-2xl font-bold text-jojanes-white mb-8">
                <span className="text-jojanes-green mr-2">▹</span>
                Artículos Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map((relatedPost: any) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug.current}`}
                    className="group block p-5 rounded-xl bg-jojanes-surface border border-jojanes-border hover:border-jojanes-green/50 transition-all"
                  >
                    <h3 className="font-bold text-jojanes-white group-hover:text-jojanes-green transition-colors mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-jojanes-white-muted line-clamp-2 mb-4">
                      {relatedPost.description}
                    </p>
                    <span className="text-xs text-jojanes-green">
                      Leer más →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const post: any = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.description,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.description,
      url: `https://jojanes.com/${locale}/blog/${slug}`,
      siteName: "Joan Oviedo",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author?.name || "Joan Oviedo"],
      images: [
        {
          url: post.ogImage ? urlFor(post.ogImage).url() : post.mainImage ? urlFor(post.mainImage).url() : "https://jojanes.com/og-blog.png",
          width: 1200,
          height: 630,
          alt: post.seo?.metaTitle || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.description,
      images: [post.ogImage ? urlFor(post.ogImage).url() : post.mainImage ? urlFor(post.mainImage).url() : "https://jojanes.com/og-blog.png"],
    },
    alternates: {
      canonical: post.seo?.canonicalUrl || `https://jojanes.com/${locale}/blog/${slug}`,
    },
  };
}
