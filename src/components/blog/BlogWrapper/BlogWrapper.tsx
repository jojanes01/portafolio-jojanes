"use client";

import { useState } from "react";
import { PostCard } from "../PostCard/PostCard";
import { FeaturedPost } from "../FeaturedPost/FeaturedPost";

export const BlogWrapper = ({ posts, categories }: any) => {
  const featuredPosts = posts.filter((post: any) => post.featured);
  const regularPosts = posts.filter((post: any) => !post.featured);
  
  const categoryTitles = [
    { title: "Todos", slug: "all" },
    ...categories.map((cat: any) => ({ title: cat.title, slug: cat.slug?.current || cat.title.toLowerCase() })),
  ];
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  const filteredRegularPosts =
    selectedCategory === "Todos"
      ? regularPosts
      : regularPosts.filter((post: any) =>
          post.categories.some((cat: any) => cat.title === selectedCategory)
        );

  const filteredFeaturedPosts =
    selectedCategory === "Todos"
      ? featuredPosts
      : featuredPosts.filter((post: any) =>
          post.categories.some((cat: any) => cat.title === selectedCategory)
        );

  return (
    <div className="flex flex-col space-y-12">
      {featuredPosts.length > 0 && selectedCategory === "Todos" && (
        <section>
          <h2 className="text-2xl font-bold text-jojanes-white mb-6">
            <span className="text-jojanes-green mr-2">▹</span>
            Artículos Destacados
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {featuredPosts.map((post: any, index: number) => (
              <FeaturedPost key={post._id} post={post} index={index} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-jojanes-white">
            <span className="text-jojanes-green mr-2">▹</span>
            Filtrar por Categoría
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {categoryTitles.map((category: any) => (
            <button
              key={category.title}
              onClick={() => setSelectedCategory(category.title)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.title
                  ? "bg-jojanes-green text-jojanes-black shadow-[0_0_20px_rgba(42,233,141,0.4)]"
                  : "bg-jojanes-surface border border-jojanes-border text-jojanes-white-muted hover:border-jojanes-green/50 hover:text-jojanes-green"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </section>

      {filteredFeaturedPosts.length > 0 && selectedCategory !== "Todos" && (
        <section>
          <h2 className="text-2xl font-bold text-jojanes-white mb-6">
            <span className="text-jojanes-green mr-2">▹</span>
            Artículos Destacados
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {filteredFeaturedPosts.map((post: any, index: number) => (
              <FeaturedPost key={post._id} post={post} index={index} />
            ))}
          </div>
        </section>
      )}

      {filteredRegularPosts.length > 0 || filteredFeaturedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRegularPosts.map((post: any, index: number) => (
            <PostCard key={post._id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-jojanes-surface border border-jojanes-border mb-6">
            <span className="icon-[tabler--search] text-3xl text-jojanes-white-muted" />
          </div>
          <h3 className="text-xl font-semibold text-jojanes-white mb-2">
            No se encontraron artículos
          </h3>
          <p className="text-jojanes-white-muted">
            No hay artículos en esta categoría todavía.
          </p>
        </div>
      )}

      {(filteredRegularPosts.length >= 12 || posts.length >= 12) && (
        <div className="text-center pt-8">
          <button className="px-8 py-3 rounded-full border border-jojanes-green text-jojanes-green font-medium hover:bg-jojanes-green hover:text-jojanes-black transition-all duration-300">
            Cargar más artículos
          </button>
        </div>
      )}
    </div>
  );
};
