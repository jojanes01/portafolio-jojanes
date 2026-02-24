import { defineType, defineArrayMember } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
        { title: "Callout", value: "callout" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
        { title: "Checklist", value: "checklist" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) => Rule.uri({
                  allowRelative: true,
                  scheme: ["http", "https", "mailto", "tel"],
                }),
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: true,
              },
            ],
          },
          {
            title: "Internal Link",
            name: "internalLink",
            type: "object",
            fields: [
              {
                name: "reference",
                type: "reference",
                to: [{ type: "post" }],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "layout",
          type: "string",
          title: "Layout",
          options: {
            list: [
              { title: "Full Width", value: "full" },
              { title: "Wide", value: "wide" },
              { title: "Normal", value: "normal" },
            ],
            layout: "radio",
          },
          initialValue: "normal",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "codeBlock",
      title: "Code Block",
      fields: [
        {
          name: "language",
          type: "string",
          title: "Language",
          options: {
            list: [
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "Python", value: "python" },
              { title: "Java", value: "java" },
              { title: "C#", value: "csharp" },
              { title: "Go", value: "go" },
              { title: "Rust", value: "rust" },
              { title: "SQL", value: "sql" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "JSON", value: "json" },
              { title: "YAML", value: "yaml" },
              { title: "Bash", value: "bash" },
              { title: "Dockerfile", value: "dockerfile" },
              { title: "GraphQL", value: "graphql" },
              { title: "Other", value: "text" },
            ],
          },
          initialValue: "typescript",
        },
        {
          name: "filename",
          type: "string",
          title: "Filename (optional)",
          description: "Display filename above the code block",
        },
        {
          name: "code",
          type: "text",
          title: "Code",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "highlightLines",
          type: "array",
          of: [{ type: "number" }],
          title: "Lines to highlight",
          description: "Line numbers to highlight (e.g., 1, 3-5)",
        },
        {
          name: "showLineNumbers",
          type: "boolean",
          title: "Show line numbers",
          initialValue: true,
        },
      ],
      preview: {
        select: {
          title: "filename",
          language: "language",
        },
        prepare(selection) {
          const { title, language } = selection;
          return {
            title: title || "Code Block",
            subtitle: language ? `Language: ${language}` : "Code",
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "callout",
      title: "Callout",
      fields: [
        {
          name: "type",
          type: "string",
          title: "Type",
          options: {
            list: [
              { title: "Info (Blue)", value: "info" },
              { title: "Warning (Yellow)", value: "warning" },
              { title: "Success (Green)", value: "success" },
              { title: "Error (Red)", value: "error" },
              { title: "Tip (Green)", value: "tip" },
            ],
            layout: "radio",
          },
          initialValue: "info",
        },
        {
          name: "title",
          type: "string",
          title: "Title (optional)",
        },
        {
          name: "content",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: "title",
          type: "type",
        },
        prepare(selection) {
          const { title, type } = selection;
          return {
            title: title || "Callout",
            subtitle: `Type: ${type}`,
          };
        },
      },
    }),
    defineArrayMember({
      type: "object",
      name: "youtube",
      title: "YouTube Video",
      fields: [
        {
          name: "url",
          type: "url",
          title: "YouTube URL",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption (optional)",
        },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "table",
      title: "Table",
      fields: [
        {
          name: "rows",
          type: "array",
          title: "Rows",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "cells",
                  type: "array",
                  title: "Cells",
                  of: [{ type: "string" }],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
