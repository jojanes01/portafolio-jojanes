"use client";

import { useState } from "react";
import { PostCard } from "../PostCard";
import { FeaturedPost } from "../FeaturedPost/FeaturedPost";

export const BlogWrapper = ({ posts, categories }: any) => {
  const categoryTitles = [
    "Todos",
    ...categories.map((cat: any) => cat.title),
  ];
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const filteredPosts =
    selectedCategory === "Todos"
      ? posts
      : posts.filter((post: any) =>
          post.categories.some((cat: any) => cat.title === selectedCategory)
        );

  return (
    <div className="max-w-6xl mx-auto py-12 flex flex-col space-y-10">
      {posts.length > 0 && <FeaturedPost post={posts[0]} />}

      <div className="my-6">
        <div className="hidden sm:flex space-x-4 overflow-x-auto">
          {categoryTitles.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-jojanes-green text-jojanes-dark"
                  : "text-jojanes-white"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="sm:hidden">
          <select
            className="w-full px-4 py-2 rounded-md bg-jojanes-dark text-jojanes-white border border-jojanes-border"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryTitles.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
