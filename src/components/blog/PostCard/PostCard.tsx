"use client";

import { useState } from "react";
import { AvatarChip } from "app/components/shared/AvatarChip/AvatarChip";
import { Link } from "app/i18n/routing";
import { urlFor } from "app/utils/urlFor";
import Image from "next/image";

export const PostCard = ({ post, index = 0 }: { post: any; index?: number }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`relative h-full bg-jojanes-surface border border-jojanes-border rounded-2xl overflow-hidden transition-all duration-500 ${isHovered ? "border-jojanes-green/50 shadow-[0_0_40px_rgba(42,233,141,0.15)]" : "hover:border-jojanes-green/30 hover:shadow-[0_0_20px_rgba(42,233,141,0.08)]"}`}>
        <div className="relative h-48 overflow-hidden">
          {!imageError && post.mainImage?.asset ? (
            <Image
              src={urlFor(post.mainImage).url() || ""}
              alt={post.title}
              fill
              className={`object-cover transition-all duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-jojanes-green-glow/20 to-jojanes-black flex items-center justify-center">
              <span className="icon-[tabler--code] text-6xl text-jojanes-green/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-jojanes-surface via-transparent to-transparent" />
          
          {post.featured && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-jojanes-green text-jojanes-black text-xs font-bold flex items-center gap-1">
              <span className="icon-[tabler--star-filled] text-xs" />
              Featured
            </div>
          )}
          
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-jojanes-black/70 backdrop-blur-sm border border-jojanes-green/30 text-jojanes-green text-xs font-medium uppercase tracking-wide">
              {post.categories?.[0]?.title || "Tech"}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-sm text-jojanes-white-muted mb-3">
            <span>{formattedDate}</span>
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <span className="icon-[tabler--clock] text-xs" />
                {post.readingTime} min
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-jojanes-white mb-2 line-clamp-2 group-hover:text-jojanes-green transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-jojanes-white-muted text-sm line-clamp-2 mb-4 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-jojanes-border">
            <div className="flex items-center gap-2">
              <AvatarChip
                name={post.author?.name || "Author"}
                src={post.author?.image?.asset ? urlFor(post.author.image).url() : ""}
                alt={post.author?.name || "Author"}
                description={post.author?.bio || ""}
                type="blog"
              />
            </div>
            <span className={`flex items-center gap-1 text-sm text-jojanes-green transition-all duration-300 ${isHovered ? "translate-x-1" : ""}`}>
              Leer más
              <span className={`icon-[tabler--arrow-right] text-sm transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </span>
          </div>
        </div>

        <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute top-0 left-0 w-20 h-20 bg-jojanes-green/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-jojanes-green/5 rounded-full blur-2xl" />
        </div>
      </div>
    </Link>
  );
};
