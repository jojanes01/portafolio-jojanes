import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Biography",
      description: "Short biography (shown in author card)",
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role",
      description: "e.g., Senior Developer, Tech Lead",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "twitter",
          type: "url",
          title: "Twitter/X",
        }),
        defineField({
          name: "linkedin",
          type: "url",
          title: "LinkedIn",
        }),
        defineField({
          name: "github",
          type: "url",
          title: "GitHub",
        }),
        defineField({
          name: "website",
          type: "url",
          title: "Website",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
