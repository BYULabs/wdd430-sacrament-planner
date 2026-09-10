import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getMeetingById } from '@/lib/meetings-db';
import { MeetingDetail } from '@/components/MeetingDetail';

interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingDetailPage({ params }: MeetingPageProps) {
  const resolvedParams = await params;
  const meetingId = parseInt(resolvedParams.id, 10);

  if (isNaN(meetingId)) {
    notFound();
  }

  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-6">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/meetings"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-navy-800 transition print:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Meetings Directory
        </Link>
      </div>

      {/* Agenda Detail Component */}
      <MeetingDetail meeting={meeting} />
    </div>
  );
}
