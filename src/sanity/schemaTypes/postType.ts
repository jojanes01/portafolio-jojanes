import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Short summary for SEO and previews (150-160 chars recommended)",
      validation: (Rule) => Rule.max(200).warning("Keep under 200 characters for optimal SEO"),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "Featured Post",
      description: "Mark this post as featured to display it prominently",
      initialValue: false,
    }),
    defineField({
      name: "readingTime",
      type: "number",
      title: "Reading Time (minutes)",
      description: "Estimated reading time in minutes (auto-calculated if not set)",
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: "body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          type: "string",
          title: "Meta Title",
          description: "Override title for search engines (defaults to post title if empty)",
        }),
        defineField({
          name: "metaDescription",
          type: "text",
          title: "Meta Description",
          description: "Override description for search engines (defaults to post description if empty)",
        }),
        defineField({
          name: "keywords",
          type: "array",
          of: [{ type: "string" }],
          title: "Keywords",
          options: { layout: "tags" },
        }),
        defineField({
          name: "canonicalUrl",
          type: "url",
          title: "Canonical URL",
          description: "If this post is republished elsewhere, link to the original",
        }),
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Custom image for social media sharing (1200x630px recommended)",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      author: "author.name",
      media: "mainImage",
      featured: "featured",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { author, description, featured, publishedAt } = selection;
      return {
        ...selection,
        subtitle: `${featured ? "★ Featured • " : ""}${publishedAt ? new Date(publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" }) + " • " : ""}${description?.slice(0, 60) || ""}${description?.length > 60 ? "..." : ""} ${author ? `• ${author}` : ""}`,
        media: selection.media,
      };
    },
  },
});
