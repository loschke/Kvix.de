import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection schema
const blogSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(10).max(160),
    pubDate: z.coerce.date()
        .or(z.string().transform(str => new Date(str)))
        .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid date format",
        }),
    updatedDate: z.coerce.date()
        .or(z.string().transform(str => new Date(str)))
        .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid date format",
        })
        .optional(),
    heroImage: z.string().optional(),
    categories: z.array(z.string()).min(1).default(['Allgemein']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    author: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        bio: z.string().optional(),
    }).default({
        name: 'Rico Loschke',
        avatar: '/images/rico-loschke_avatar.jpg',
    }),
    minutesRead: z.number().optional(),
    seo: z.object({
        ogImage: z.string().optional(),
        canonicalURL: z.string().url().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        noindex: z.boolean().default(false),
    }).default({}),
    socialImage: z.string().optional(),
    twitterHandle: z.string().optional(),
});

// Define the blog collection with the Content Layer API
const blog = defineCollection({
    schema: blogSchema,
    loader: glob({
        pattern: 'src/content/blog/**/*.{md,mdx}',
    }),
});

// Export the collections
export const collections = {
    'blog': blog,
};
