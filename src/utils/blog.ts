/// <reference types="astro/client" />
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

interface BlogData {
    draft: boolean;
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    categories: string[];
    tags: string[];
}

interface RSSItem {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    link: string;
    categories: string[];
}

// Cache for blog posts to avoid multiple collection fetches
const cache: {
    posts: BlogPost[] | null;
} = {
    posts: null
};

/**
 * Fetches blog posts with draft filtering based on environment
 * Implements caching to avoid multiple collection fetches
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
    if (cache.posts) return cache.posts;

    const posts = await getCollection("blog", ({ data }: { data: BlogData }) => {
        // Use process.env.NODE_ENV instead of import.meta.env
        return process.env.NODE_ENV === 'production' ? !data.draft : true;
    });

    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a: BlogPost, b: BlogPost) => {
        return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    });

    cache.posts = sortedPosts;
    return sortedPosts;
}

/**
 * Validates if a slug exists and returns the corresponding post
 */
export async function validateAndGetPost(slug: string): Promise<BlogPost | null> {
    const posts = await getBlogPosts();
    const post = findPostById(posts, slug);

    if (!post) {
        return null;
    }

    return post;
}

/**
 * Extracts unique categories from blog posts
 * Returns sorted array of lowercase categories
 */
export function getUniqueCategories(posts: BlogPost[]): string[] {
    return [...new Set(posts.flatMap((post) =>
        (post.data.categories || []).map((c: string) => c.toLowerCase())
    ))].sort();
}

/**
 * Extracts unique tags from blog posts
 * Returns sorted array of lowercase tags
 */
export function getUniqueTags(posts: BlogPost[]): string[] {
    return [...new Set(posts.flatMap((post) =>
        (post.data.tags || []).map((t: string) => t.toLowerCase())
    ))].sort();
}

/**
 * Filters posts by category (case-insensitive)
 * Returns posts sorted by date
 */
export function filterPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
    return posts
        .filter((post) =>
            (post.data.categories || [])
                .map((c: string) => c.toLowerCase())
                .includes(category.toLowerCase())
        )
        .sort((a: BlogPost, b: BlogPost) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Filters posts by tag (case-insensitive)
 * Returns posts sorted by date
 */
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
    return posts
        .filter((post) =>
            (post.data.tags || [])
                .map((t: string) => t.toLowerCase())
                .includes(tag.toLowerCase())
        )
        .sort((a: BlogPost, b: BlogPost) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/**
 * Finds a post by its ID/slug
 */
export function findPostById(posts: BlogPost[], id: string): BlogPost | undefined {
    return posts.find(post => post.id === id);
}

/**
 * Generates RSS feed items from blog posts
 */
export function generateRSSItems(posts: BlogPost[]): RSSItem[] {
    return posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        updatedDate: post.data.updatedDate,
        link: `/blog/${post.id}/`,
        categories: post.data.categories || [],
    }));
}
