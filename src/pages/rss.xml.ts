import rss from '@astrojs/rss';
import { getBlogPosts } from '../utils/blog';
import { RSS_TITLE, RSS_DESCRIPTION, SITE_URL } from '../consts';

export async function GET(context: { site: URL }) {
    const posts = await getBlogPosts();

    return rss({
        // Required RSS feed metadata
        title: RSS_TITLE,
        description: RSS_DESCRIPTION,
        site: context.site || SITE_URL,

        // Generate items from blog posts
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/blog/${post.id}/`,
            // Optional: Add categories as RSS categories
            categories: post.data.categories || [],
            // Optional: Add custom data
            customData: `
        ${post.data.tags ? `<tags>${post.data.tags.join(',')}</tags>` : ''}
        ${post.data.author ? `<author>${post.data.author.name}</author>` : ''}
      `
        })),

        // Optional: Add custom XML namespaces
        customData: `
      <language>de-de</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `
    });
}
