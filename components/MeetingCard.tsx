import Link from 'next/link';
import { Calendar, Clock, Music, Mic, ArrowRight } from 'lucide-react';
import type { SacramentMeeting } from '../lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

const badgeStyles: Record<SacramentMeeting['meetingType'], string> = {
  regular: 'badge-regular',
  testimony: 'badge-testimony',
  stake: 'badge-stake',
  general: 'badge-general',
};

export function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );

  const getMeetingTitle = () => {
    switch (meeting.meetingType) {
      case 'testimony':
        return 'Fast & Testimony Meeting';
      case 'stake':
        return 'Stake Conference';
      case 'general':
        return 'General Conference';
      default:
        return 'Sacrament Meeting';
    }
  };

  const getLocation = () => {
    if (meeting.meetingType === 'stake') return 'Stake Center';
    if (meeting.meetingType === 'general') return 'Broadcast / Home';
    return 'Oakridge Chapel';
  };

  return (
    <article className="flex flex-col w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-soft">
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 min-w-0">
        {/* Header: Date & Badge */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          <p className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-navy-700 min-w-0">
            <Calendar className="h-4 w-4 text-navy-500 shrink-0" />
            <span className="truncate">{formattedDate}</span>
          </p>
          <span
            className={`badge ${badgeStyles[meeting.meetingType]} capitalize shrink-0`}
          >
            {meeting.meetingType}
          </span>
        </div>

        {/* Title & Metadata */}
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold leading-snug text-slate-900 truncate">
            {getMeetingTitle()}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">11:00 AM · {getLocation()}</span>
          </p>
        </div>

        {/* Leadership Details */}
        <dl className="mt-auto space-y-2 border-t border-slate-100 pt-4 text-xs sm:text-sm min-w-0">
          <div className="flex items-baseline justify-between gap-2 min-w-0">
            <dt className="text-slate-500 shrink-0">Presiding</dt>
            <dd className="text-right font-semibold text-slate-800 truncate">
              {meeting.presiding}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-2 min-w-0">
            <dt className="text-slate-500 shrink-0">Conducting</dt>
            <dd className="text-right font-semibold text-slate-800 truncate">
              {meeting.conducting}
            </dd>
          </div>
        </dl>

        {/* Program Preview Breakdown */}
        <div className="space-y-1.5 rounded-lg border border-stone-200/70 bg-stone-50 p-3 text-xs text-slate-600 min-w-0">
          <p className="flex items-center gap-2 min-w-0">
            <Music className="h-3.5 w-3.5 text-stone-500 shrink-0" />
            <span className="truncate min-w-0">
              <span className="font-medium text-stone-600">Opening:</span> “
              {meeting.openingHymn.title}” · No. {meeting.openingHymn.number}
            </span>
          </p>

          {meeting.speakers && meeting.speakers.length > 0 && (
            <p className="flex items-center gap-2 min-w-0">
              <Mic className="h-3.5 w-3.5 text-stone-500 shrink-0" />
              <span className="truncate min-w-0">
                <span className="font-medium text-stone-600">Speakers:</span>{' '}
                {meeting.speakers.map((s) => s.name).join(', ')}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Detail Link CTA */}
      <Link
        href={`/meetings/${meeting.id}`}
        className="group/link flex items-center justify-center gap-2 rounded-b-2xl border-t border-slate-100 bg-stone-50/60 px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-semibold text-navy-700 transition hover:bg-navy-50 hover:text-navy-800"
      >
        View Full Program
        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover/link:translate-x-0.5" />
      </Link>
    </article>
  );
}
