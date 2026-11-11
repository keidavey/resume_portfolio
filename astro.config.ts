import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Replace with your real domain once the site is deployed.
  site: 'https://example.com',
  markdown: {
    // Light colours for code samples, to match the site.
    shikiConfig: { theme: 'github-light' },
  },
  adapter: vercel({
    imageService: true,
    webAnalytics: {
      enabled: true,
    },
  }),
});
