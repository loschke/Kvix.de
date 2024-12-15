import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://kvix.de',
  adapter: node({
    mode: 'standalone',
    host: '0.0.0.0',
    port: 4321
  }),
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
    },
    build: {
      // Enable asset optimization
      assetsInlineLimit: 4096, // Inline assets smaller than 4kb
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks for better caching
            vendor: [/node_modules/]
          }
        }
      }
    },
    // Optimize images during dev
    optimizeDeps: {
      include: ['@astrojs/image']
    }
  },
  build: {
    inlineStylesheets: 'auto',
    format: 'file',
    // Asset optimization
    assets: 'assets',
    // Enable image optimization
    image: {
      service: {
        entrypoint: 'astro/assets/services/sharp'
      },
      // Default image optimization settings
      defaultOptions: {
        format: 'webp',
        quality: 80,
        widths: [640, 750, 828, 1080, 1200, 1920],
        sizes: '(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw',
        loading: 'lazy',
        decoding: 'async'
      }
    }
  },
  // Add trailingSlash config to ensure consistent URL handling
  trailingSlash: 'never',
  // Performance optimizations
  compressHTML: true
});
