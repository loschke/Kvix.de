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
