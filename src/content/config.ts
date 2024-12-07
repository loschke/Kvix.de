import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        // Make date handling more resilient
        pubDate: z.coerce.date().or(z.string().transform(str => new Date(str))),
        updatedDate: z.coerce.date().or(z.string().transform(str => new Date(str))).optional(),
        // Make image handling more robust
        heroImage: z.string().optional(),
        // Make categories and tags optional with defaults
        categories: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        // SEO
        ogImage: z.string().optional(),
        canonicalURL: z.string().optional(),
    }),
});

export const collections = {
    'blog': blogCollection,
};
