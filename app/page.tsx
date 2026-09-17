import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Sun, CalendarDays } from 'lucide-react';
import { getMeetings } from '@/lib/meetings-db';
import { MeetingCard } from '@/components/MeetingCard';
import { MeetingDetail } from '@/components/MeetingDetail';

export default async function HomePage() {
  // Await the async database query
  const meetings = await getMeetings();

  // Slice to show only the 3 most immediate upcoming meetings on the home page
  const upcomingMeetings = meetings.slice(0, 3);
  const currentMeeting = meetings[0];

  return (
    <div>
      {/* ============================== HERO ============================== */}
      <section
        aria-label="Welcome"
        className="relative isolate overflow-hidden bg-navy-950 print:hidden"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-bg.jpg"
            alt="A quiet chapel resting against a calm mountain landscape"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/60 to-navy-950/90" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-navy-100 ring-1 ring-white/20 backdrop-blur">
            <Sun className="h-3.5 w-3.5" />
            Sundays · 11:00 AM · Oakridge Chapel
          </p>

          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Sacrament Meeting Planner
          </h1>
          <p className="mt-4 max-w-xl text-base text-navy-100/90 sm:text-lg">
            Prepare, review, and print reverent Sunday worship programs — hymns,
            speakers, music, and ward announcements gathered in one peaceful
            place.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#current-program"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-lg shadow-navy-950/40 transition hover:bg-navy-50"
            >
              View Current Program
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#meetings"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20"
            >
              Browse Meetings
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ======================== UPCOMING MEETINGS ======================== */}
      <section
        id="meetings"
        aria-labelledby="meetings-heading"
        className="print:hidden"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Upcoming Services</p>
              <h2
                id="meetings-heading"
                className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                Upcoming Sacrament Meetings
              </h2>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Next upcoming worship services for the Oakridge Ward. Select a
                meeting to view or print the full program.
              </p>
            </div>
          </div>

          {/* Grid optimized for 3 items */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>

          {/* View All Button Action */}
          <div className="mt-12 text-center">
            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-navy-800 shadow-sm transition hover:border-navy-300 hover:bg-navy-50"
            >
              <CalendarDays className="h-4 w-4 text-navy-600" />
              View All Meetings ({meetings.length})
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================== FEATURED DETAIL PROGRAM VIEW ================== */}
      {currentMeeting && (
        <section id="current-program" aria-labelledby="program-heading">
          <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 print:px-0 print:pb-0">
            <MeetingDetail meeting={currentMeeting} />
          </div>
        </section>
      )}
    </div>
  );
}