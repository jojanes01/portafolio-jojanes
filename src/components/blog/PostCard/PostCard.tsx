import { AvatarChip } from "app/components/shared/AvatarChip/AvatarChip";
import { Link } from "app/i18n/routing";
import { urlFor } from "app/utils/urlFor";

export const PostCard = ({ post }: any) => {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div className="shadow-md border border-jojanes-border rounded-lg p-6 text-jojanes-white hover:bg-jojanes-gray-dark cursor-pointer">
        <div className="flex justify-between text-sm text-jojanes-gray-light">
          <span className="bg-jojanes-gray px-2 py-0.5 uppercase rounded-full text-[11px] text-jojanes-green-dark">
            {post.categories[0]?.title || "Uncategorized"}
          </span>
          <span>
            {new Date(post.publishedAt)
              .toLocaleDateString("es-ES", { day: "2-digit", month: "short" })
              .replace(".", "")}
          </span>
        </div>
        <h3 className="text-xl font-bold mt-2 text-jojanes-green">
          {post.title}
        </h3>
        <p className="mt-2 text-jojanes-gray-light">{post.description}</p>
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
    </Link>
  );
};
