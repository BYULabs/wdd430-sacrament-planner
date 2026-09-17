import Link from 'next/link';
import { ArrowRight, CalendarDays, Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 sm:px-6 sm:py-28">
      <p className="eyebrow">Page Not Found</p>

      <p className="mt-6 text-6xl font-extrabold tracking-tight text-navy-200 sm:text-7xl">
        404
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        We couldn&apos;t find that page
      </h1>

      <p className="mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
        The page you were looking for may have been moved, or the meeting
        program you requested is no longer available. Let&apos;s get you back to
        the Oakridge Ward planner.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-navy-900"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>
        <Link
          href="/meetings"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-navy-300 hover:bg-navy-50"
        >
          <CalendarDays className="h-4 w-4 text-navy-600" />
          Browse Meetings
        </Link>
      </div>

      <div className="mt-12 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Compass className="h-4 w-4 text-navy-600" />
          Looking for something specific?
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link
              href="/meetings/current"
              className="inline-flex items-center gap-2 text-slate-600 transition hover:text-navy-800"
            >
              This Sunday&apos;s program
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </li>
          <li>
            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 text-slate-600 transition hover:text-navy-800"
            >
              Full meetings directory
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-slate-600 transition hover:text-navy-800"
            >
              About the Oakridge Ward planner
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
