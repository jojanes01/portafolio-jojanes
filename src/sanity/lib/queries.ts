import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...20]{
    _id,
    title,
    slug,
    description,
    featured,
    readingTime,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      },
      bio
    }
  }
`);

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    description,
    featured,
    readingTime,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      },
      bio
    }
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    featured,
    readingTime,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    categories[]->{
      _id,
      title,
      slug
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      },
      bio
    },
    body,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl
    },
    ogImage {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && $category in categories[]->title] | order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    description,
    featured,
    readingTime,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      },
      bio
    }
  }
`);

export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && slug.current != $currentSlug && count((categories[]->title)[@ in ^.categories[]->title]) > 0] | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    description,
    featured,
    readingTime,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
`);

export const LATEST_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...4]{
    _id,
    title,
    slug,
    description,
    featured,
    readingTime,
    publishedAt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    categories[]->{
      _id,
      title,
      slug
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc){
    _id,
    title,
    description,
    slug
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)][].slug.current
`);
