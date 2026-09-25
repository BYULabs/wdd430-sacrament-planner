import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import { MeetingCard } from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';
import { Calendar } from 'lucide-react';

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-6">
        <div>
          <p className="eyebrow">Sacrament Planner</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Meetings Directory
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Browse current, upcoming, and past sacrament meeting programs for
            the Oakridge Ward.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-lg bg-navy-50 px-3 py-2 text-xs font-semibold text-navy-800 ring-1 ring-navy-200">
          <Calendar className="h-4 w-4 text-navy-600" />
          <span>{meetings.length} Services Listed</span>
        </div>
      </div>

      {/* Controls Bar: Search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MeetingSearch />
      </div>

      {/* Render Cards Grid */}
      {meetings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No meetings found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            There are no services matching your query.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}