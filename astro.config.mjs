import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zdentistry.in',
  integrations: [
    tailwind(),
    sitemap({
      // Exclude pages that shouldn't be indexed
      filter: (page) =>
        !page.includes('/contact-success') &&
        !page.includes('/404'),

      // Custom settings for each page
      serialize: (item) => {
        // Homepage - highest priority
        if (item.url === 'https://zdentistry.in/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        // Main sections - high priority
        if (
          item.url.endsWith('/treatments/') ||
          item.url.endsWith('/about/') ||
          item.url.endsWith('/contact/') ||
          item.url.endsWith('/book-appointment/')
        ) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        // Category pages - medium-high priority
        if (
          item.url.endsWith('/treatments/dentistry/') ||
          item.url.endsWith('/treatments/maxillofacial/')
        ) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }
        // Individual treatment pages - medium priority
        if (item.url.includes('/treatments/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }
        // Default
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },

      // Use single sitemap.xml instead of sitemap-index for small sites
      entryLimit: 50000,
    }),
  ],
  build: {
    format: 'directory',
  },
});
