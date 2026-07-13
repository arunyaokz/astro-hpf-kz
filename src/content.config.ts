import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(["zh", "en", "ru"]),
    translationKey: z.string(),
    category: z.enum(["company", "route", "market", "insight"]),
    author: z.string().default("HPF.kz Editorial"),
    draft: z.boolean().default(true),
    verificationStatus: z.enum(["company-source", "verified-public", "analysis"]),
    sourceUrls: z.array(z.string().url()).default([]),
    heroImage: z.string().optional(),
    aiMaintained: z.literal(true),
  }),
});

const facts = defineCollection({
  loader: file("./src/content/facts.yaml"),
  schema: z.object({
    kind: z.enum(["text", "contact", "legal", "governance", "number", "facility", "route", "location"]),
    value: z.string(),
    unit: z.string().optional(),
    labels: z.object({
      zh: z.string(),
      en: z.string(),
      ru: z.string(),
    }),
    localizedValues: z.object({
      zh: z.string(),
      en: z.string(),
      ru: z.string(),
    }).optional(),
    source: z.string(),
    asOf: z.string().optional(),
    url: z.string().url().optional(),
    verified: z.boolean(),
  }),
});

export const collections = { blog, news, facts };
