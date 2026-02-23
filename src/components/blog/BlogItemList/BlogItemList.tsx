import { Link } from "app/i18n/routing";
import { getTranslations } from "next-intl/server";

interface BlogItemListProps {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  categories: { title: string }[];
  author: {
    name: string;
  };
}

export const BlogItemList = async ({
  _id,
  title,
  slug,
  publishedAt,
  categories,
  author,
}: BlogItemListProps) => {
  const t = await getTranslations("Blog");

  return (
    <Link href={`/blog/${slug.current}`}>
      <div
        key={_id}
        className="text-white flex flex-col space-y-2 py-8 cursor-pointer"
      >
        <p className="uppercase text-xs text-gray-300">
          {categories[0]?.title}
        </p>
        <h2 className="text-xl sm:text-2xl">{title}</h2>
        <div className="flex flex-row space-x-2 text-sm font-light text-gray-400 items-center">
          <p>
            {new Date(publishedAt).toLocaleDateString(t("localeDate"), {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <span
            className="icon-[tabler--point-filled] text-xs"
            role="img"
            aria-hidden="true"
          />
          <p>
            {t("by")} {author.name}
          </p>
        </div>
      </div>
    </Link>
  );
};
