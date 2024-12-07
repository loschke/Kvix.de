import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://kvix.de',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  },
  // Add redirects configuration
  redirects: {
    // Redirect old blog URL patterns to new ones
    '/blog/posts/[...slug]': '/blog/[...slug]',
    '/blog/artikel/[...slug]': '/blog/[...slug]',

    // Redirect old category URLs to new format
    '/blog/categories/[category]': '/blog/category/[category]',
    '/blog/kategorie/[category]': '/blog/category/[category]',

    // Redirect old tag URLs to new format
    '/blog/tags/[tag]': '/blog/tag/[tag]',

    // Handle potential index redirects
    '/blog/index': '/blog',
    '/blog/index.html': '/blog',

    // Redirect potential old RSS feed URLs
    '/blog/feed': '/rss.xml',
    '/blog/rss': '/rss.xml',
    '/feed': '/rss.xml'
  },
  build: {
    inlineStylesheets: 'auto'
  },
  // Add trailingSlash config to ensure consistent URL handling
  trailingSlash: 'never',
  // Add build.format to ensure consistent URL processing
  build: {
    format: 'file'
  }
});
