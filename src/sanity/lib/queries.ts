import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, mainImage, description, publishedAt, categories[]->{title}, author->{name, image}
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, description, body, mainImage, publishedAt, categories[]->{title}, author->{name, image}
}`);

export const LATEST_POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3]{
  _id, title, slug, mainImage, description, publishedAt, categories[]->{title}, author->{name, image}
}`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"]{
    _id,
    title,
    // Aquí puedes añadir más campos si los necesitas, por ejemplo slug
  }
`);
