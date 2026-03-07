import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://zdentistry.netlify.app',
  integrations: [
    tailwind(),
    sitemap({
      // Exclude pages that shouldn't be indexed
      filter: (page) =>
        !page.includes('/contact-success') &&
        !page.includes('/404') &&
        !page.includes('/privacy') &&
        !page.includes('/terms'),

      // Custom settings for each page
      serialize: (item) => {
        // Homepage - highest priority
        if (item.url === 'https://zdentistry.netlify.app/') {
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
        // Blog index - high priority (fresh content signal)
        if (item.url.endsWith('/blog/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        // Local landing page - very high priority for local SEO
        if (item.url.endsWith('/dentist-in-cda-cuttack/')) {
          return { ...item, priority: 0.95, changefreq: 'monthly' };
        }
        // Testimonials page - high priority for E-E-A-T
        if (item.url.endsWith('/testimonials/')) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
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
        // Blog posts - medium priority, updated frequently
        if (item.url.includes('/blog/')) {
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
