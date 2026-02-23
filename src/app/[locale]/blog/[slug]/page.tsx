import { PortableTextComponents } from "app/components/blog/PortableText";
import { Link } from "app/i18n/routing";
import { client } from "app/sanity/lib/client";
import { POST_QUERY } from "app/sanity/lib/queries";
import { urlFor } from "app/utils/urlFor";
import { getTranslations } from "next-intl/server";
import { PortableText } from "next-sanity";
import Image from "next/image";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const t = await getTranslations("Blog");
  const post: any = await client.fetch(POST_QUERY, { slug });
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen bg-jojanes-black text-jojanes-white">
        <p className="text-2xl font-bold">{t("notFound")}</p>
      </div>
    );
  }

  return (
    <main className="text-jojanes-white min-h-screen">
      <div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-light text-jojanes-green mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-slate-200 mb-4 mr-12">
              {post.description}
            </p>
            <div className="flex flex-col space-y-2 text-sm text-jojanes-subtitle">
              <p>
                {new Date(post.publishedAt).toLocaleDateString(
                  t("localeDate"),
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <div className="flex items-center space-x-2">
                <Image
                  src={urlFor(post.author.image).url() || ""}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full border border-white"
                />
                <div>
                  <p className="text-white">{post.author.name}</p>
                  <p>Ingeniero Informático</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-64 sm:h-72">
            <Image
              src={urlFor(post.mainImage).url() || ""}
              alt={post.mainImage.alt || "Post Image"}
              layout="fill"
              objectFit="contain"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          <div className="sm:col-span-2">
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText
                value={post.body.map((block: any) => {
                  if (block.style === "h2") {
                    return {
                      ...block,
                      id: block.children[0].text
                        .replace(/\s+/g, "-")
                        .toLowerCase(),
                    };
                  }
                  return block;
                })}
                components={PortableTextComponents}
              />
            </div>
          </div>
          <aside className="hidden sm:block border-l pl-6 border-jojanes-gray sticky top-20 self-start">
            <h2 className="text-xl font-bold mb-4 text-jojanes-green">
              Table of Contents
            </h2>
            <ul className="space-y-2 text-sm">
              {post.body
                .filter((block: any) => block.style === "h2")
                .map((block: any, index: number) => {
                  const id = block.children[0].text
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                  return (
                    <li key={index}>
                      <Link
                        href={`#${id}`}
                        className="text-jojanes-white hover:text-jojanes-green transition-colors"
                      >
                        {block.children[0].text}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
