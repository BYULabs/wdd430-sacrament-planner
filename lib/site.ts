import type { Metadata } from 'next';

// Absolute base URL used for canonical links, Open Graph tags, robots.txt,
// and sitemap.xml. Set SITE_URL in production; Vercel's production URL is
// used as a fallback.
export const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

// Shared Open Graph fields. A page that sets its own `openGraph` replaces the
// root layout's entirely, so pages spread this in alongside their title.
export const baseOpenGraph = {
  type: 'website',
  siteName: 'Oakridge Ward Planner',
  locale: 'en_US',
  images: [
    {
      url: '/opengraph-image.jpg',
      width: 1200,
      height: 630,
      alt: 'A quiet chapel resting against a calm mountain landscape',
    },
  ],
} satisfies Metadata['openGraph'];
