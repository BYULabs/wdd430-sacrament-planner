import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

export default function MeetingNotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 sm:px-6 sm:py-28">
      <p className="eyebrow">404</p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Meeting not found
      </h1>

      <p className="mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
        The meeting you&apos;re trying to edit doesn&apos;t exist or may have
        been deleted.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/meetings"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-navy-300 hover:bg-navy-50"
        >
          <CalendarDays className="h-4 w-4 text-navy-600" />
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
