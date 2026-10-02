import type { MetadataRoute } from 'next';
import { getAllMeetingIds } from '@/lib/meetings-db';
import { siteUrl } from '@/lib/site';

// Rebuild hourly so newly created meetings are picked up without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const meetingIds = await getAllMeetingIds();

  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/meetings`, changeFrequency: 'weekly', priority: 0.8 },
    ...meetingIds.map((id) => ({
      url: `${siteUrl}/meetings/${id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
