import { z, defineCollection } from 'astro:content';

// Define reusable schemas
const seoSchema = z.object({
    ogImage: z.string().optional(),
    canonicalURL: z.string().url().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    noindex: z.boolean().default(false),
});

// Blog post schema definition
const blogSchema = z.object({
    // Basic post information
    title: z.string().min(1).max(100),
    description: z.string().min(10).max(160),

    // Date handling
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // Media - using image() helper for optimization
    heroImage: z.string(),

    // Taxonomy
    categories: z.array(z.string()).min(1).default(['Allgemein']),
    tags: z.array(z.string()).default([]),

    // Content status
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // Author information
    author: z.object({
        name: z.string(),
        avatar: z.string(),
        bio: z.string().optional(),
    }).default({
        name: 'Rico Loschke',
        avatar: '/images/rico-loschke_avatar.jpg',
    }),

    // Reading time (will be calculated during build)
    minutesRead: z.number().optional(),

    // SEO
    seo: seoSchema.default({}),

    // Social sharing
    socialImage: z.string().optional(),
    twitterHandle: z.string().optional(),
});

// Define the collection
const blog = defineCollection({
    type: 'content',
    schema: blogSchema,
});

// Export the collections
export const collections = {
    blog,
};
