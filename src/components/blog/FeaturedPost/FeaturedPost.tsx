import { Link } from "app/i18n/routing";
import { urlFor } from "app/utils/urlFor";
import Image from "next/image";

export const FeaturedPost = ({ post, index = 0 }: { post: any; index?: number }) => {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div
        className="group relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border border-jojanes-green/30 bg-jojanes-surface transition-all duration-500 hover:border-jojanes-green/60 hover:shadow-[0_0_60px_rgba(42,233,141,0.2)]"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="relative h-64 lg:h-auto overflow-hidden">
          {post.mainImage?.asset ? (
            <Image
              src={urlFor(post.mainImage).url() || ""}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-jojanes-green-glow/30 to-jojanes-black flex items-center justify-center">
              <span className="icon-[tabler--code] text-8xl text-jojanes-green/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-jojanes-surface via-transparent to-transparent" />

          <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-jojanes-green text-jojanes-black text-sm font-bold flex items-center gap-1.5 shadow-lg">
            <span className="icon-[tabler--star-filled] text-xs" />
            Featured
          </div>
        </div>

        <div className="p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-jojanes-green/10 border border-jojanes-green/30 text-jojanes-green text-xs font-medium uppercase tracking-wide">
                {post.categories?.[0]?.title || "Tech"}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-jojanes-white-muted">
                <span className="icon-[tabler--clock] text-sm" />
                {post.readingTime || "5"} min
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-jojanes-white mb-3 group-hover:text-jojanes-green transition-colors duration-300">
              {post.title}
            </h2>

            <p className="text-jojanes-white-muted leading-relaxed line-clamp-3">
              {post.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-jojanes-border">
            <div className="flex items-center gap-2">
              <Image
                src={post.author?.image?.asset ? urlFor(post.author.image).url() : ""}
                alt={post.author?.name || "Author"}
                width={36}
                height={36}
                className="rounded-full border border-jojanes-green/30"
              />
              <div>
                <p className="text-sm text-jojanes-white font-medium">{post.author?.name}</p>
                <p className="text-xs text-jojanes-white-muted">
                  {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <span className="flex items-center gap-1 text-jojanes-green font-medium group-hover:translate-x-1 transition-transform">
              Leer más
              <span className="icon-[tabler--arrow-right]" />
            </span>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-jojanes-green/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-jojanes-green-glow/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </Link>
  );
};
