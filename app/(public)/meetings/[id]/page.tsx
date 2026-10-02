import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MeetingDetail } from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import { getMeetingById } from '@/lib/meetings-db';
import { baseOpenGraph } from '@/lib/site';
import { headers } from 'next/headers';

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

const meetingTypeLabels: Record<SacramentMeeting['meetingType'], string> = {
  regular: 'Sacrament Meeting',
  testimony: 'Fast & Testimony Meeting',
  stake: 'Stake Conference Service',
  general: 'General Conference Broadcast',
};

export async function generateMetadata({
  params,
}: MeetingPageProps): Promise<Metadata> {
  const { id } = await params;
  const meetingId = Number(id);
  const meeting =
    Number.isInteger(meetingId) && meetingId > 0
      ? await getMeetingById(meetingId)
      : null;

  if (!meeting) {
    return { title: 'Meeting Not Found' };
  }

  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  );
  const title = `${meetingTypeLabels[meeting.meetingType]} · ${formattedDate}`;
  const description = `Agenda for the ${formattedDate} ${meetingTypeLabels[meeting.meetingType].toLowerCase()}, presided by ${meeting.presiding} and conducted by ${meeting.conducting}.`;

  return {
    title,
    description,
    alternates: { canonical: `/meetings/${meeting.id}` },
    openGraph: {
      ...baseOpenGraph,
      type: 'article',
      title: `${title} · Oakridge Ward Planner`,
      description,
      url: `/meetings/${meeting.id}`,
    },
  };
}

export default async function MeetingDetailPage({ params }: MeetingPageProps) {
  const resolvedParams = await params;
  const meetingId = resolvedParams.id;

  // Resolve base host URL dynamically for Server Components
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const res = await fetch(`${protocol}://${host}/api/meetings/${meetingId}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    notFound();
  }

  const meeting: SacramentMeeting = await res.json();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-6">
      <div>
        <Link
          href="/meetings"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-navy-800 transition print:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Meetings Directory
        </Link>
      </div>

      <MeetingDetail meeting={meeting} />
    </div>
  );
}
