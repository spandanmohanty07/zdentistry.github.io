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
        const today = new Date().toISOString().split('T')[0];
        // Homepage - highest priority
        if (item.url === 'https://zdentistry.in/') {
          return { ...item, priority: 1.0, changefreq: 'weekly', lastmod: today };
        }
        // Main sections - high priority
        if (
          item.url.endsWith('/treatments/') ||
          item.url.endsWith('/about/') ||
          item.url.endsWith('/contact/') ||
          item.url.endsWith('/book-appointment/')
        ) {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: today };
        }
        // Blog index - high priority (fresh content signal)
        if (item.url.endsWith('/blog/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly', lastmod: today };
        }
        // Local landing page - very high priority for local SEO
        if (item.url.endsWith('/dentist-in-cda-cuttack/')) {
          return { ...item, priority: 0.95, changefreq: 'monthly', lastmod: today };
        }
        // Testimonials page - high priority for E-E-A-T
        if (item.url.endsWith('/testimonials/')) {
          return { ...item, priority: 0.8, changefreq: 'weekly', lastmod: today };
        }
        // Category pages - medium-high priority
        if (
          item.url.endsWith('/treatments/dentistry/') ||
          item.url.endsWith('/treatments/maxillofacial/')
        ) {
          return { ...item, priority: 0.8, changefreq: 'weekly', lastmod: today };
        }
        // Individual treatment pages - medium priority
        if (item.url.includes('/treatments/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly', lastmod: today };
        }
        // Blog posts - medium priority, updated frequently
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly', lastmod: today };
        }
        // Default
        return { ...item, priority: 0.5, changefreq: 'monthly', lastmod: today };
      },

      entryLimit: 50000,
    }),
  ],
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
