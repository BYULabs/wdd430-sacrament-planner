import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/meetings/new', '/meetings/*/edit', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
