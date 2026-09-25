'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, CalendarDays, RotateCcw } from 'lucide-react';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('An uncaught error occurred:', error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 sm:px-6 sm:py-28">
      <p className="eyebrow">Meeting Planner Error</p>

      <AlertTriangle className="mt-6 h-12 w-12 text-navy-200" />

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Something went wrong
      </h1>

      <p className="mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
        An unexpected error occurred while working with the meeting planner.
        Please try again, or head back to the meetings list.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-navy-900"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
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
