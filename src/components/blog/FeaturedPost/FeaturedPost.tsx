import { AvatarChip } from "app/components/shared/AvatarChip/AvatarChip";
import { Link } from "app/i18n/routing";
import { urlFor } from "app/utils/urlFor";
import Image from "next/image";

export const FeaturedPost = ({ post }: any) => {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 hover:bg-jojanes-gray-dark cursor-pointer shadow-2xl border border-jojanes-border rounded-lg overflow-hidden h-80">
        <div className="relative w-full h-56 md:h-auto">
          <Image
            src={urlFor(post.mainImage).url() || ""}
            alt={post.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="p-6 flex flex-col justify-between text-jojanes-white">
          <div>
            <div className="flex justify-between text-sm text-jojanes-gray-light">
              <span className="bg-jojanes-gray px-2 py-0.5 uppercase rounded-full text-[11px] text-jojanes-green-dark">
                {post.categories[0]?.title || "Uncategorized"}
              </span>
              <span>
                {new Date(post.publishedAt)
                  .toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                  })
                  .replace(".", "")}
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-2 text-jojanes-green">
              {post.title}
            </h2>
            <p className="mt-2 text-sm mr-0 sm:mr-28 sm:text-base text-jojanes-gray-light">
              {post.description}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <AvatarChip
              name={post.author.name}
              src={urlFor(post.author.image).url() || ""}
              alt={post.author.name}
              description={post.author.bio}
              type="blog"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
