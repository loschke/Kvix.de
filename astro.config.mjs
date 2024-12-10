import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://kvix.de',
  output: 'hybrid', // Enable hybrid rendering
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
  // Add environment variables configuration
  vite: {
    define: {
      'import.meta.env.SMTP_HOST': JSON.stringify(process.env.SMTP_HOST),
      'import.meta.env.SMTP_PORT': JSON.stringify(process.env.SMTP_PORT),
      'import.meta.env.SMTP_USER': JSON.stringify(process.env.SMTP_USER),
      'import.meta.env.SMTP_PASS': JSON.stringify(process.env.SMTP_PASS),
      'import.meta.env.CONTACT_EMAIL': JSON.stringify(process.env.CONTACT_EMAIL),
      'import.meta.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
    }
  },
  build: {
    inlineStylesheets: 'auto',
    format: 'file'
  },
  // Add trailingSlash config to ensure consistent URL handling
  trailingSlash: 'never'
});
