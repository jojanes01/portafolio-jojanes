import { BlogItemList } from "app/components/blog/BlogItemList";
import { Title } from "app/components/shared/Title";
import { Link } from "app/i18n/routing";
import { client } from "app/sanity/lib/client";
import { LATEST_POSTS_QUERY } from "app/sanity/lib/queries";
import { getTranslations } from "next-intl/server";

export const LastestBlog = async () => {
  const t = await getTranslations("LastestBlog");
  const latestPosts: any = await client.fetch(LATEST_POSTS_QUERY);

  return (
    <div className="py-8 max-w-6xl sm:mx-auto">
      <Title title={t("title")} />
      {/* ✅ Corrección: Se aseguraron <li> dentro del <ul> */}
      <ul className="flex flex-col space-y-1 px-4 sm:px-0 pb-4 divide-y divide-jojanes-border">
        {latestPosts.map((post: any) => (
          <li key={post._id} role="listitem" className="py-4">
            <BlogItemList {...post} />
          </li>
        ))}
      </ul>
      <div className="px-4 sm:px-0">
        <Link
          href="/blog"
          className="flex flex-row w-max items-center text-sm text-white border border-jojanes-border rounded-full text-center px-4 py-3 space-x-1 hover:bg-neutral-800 hover:space-x-2"
        >
          <span
            className="icon-[fluent-mdl2--articles]"
            role="img"
            aria-hidden="true"
          />
          <p>{t("buttonAll")}</p>
        </Link>
      </div>
    </div>
  );
};
