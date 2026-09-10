'use client';

import { useState } from 'react';
import { getMeetings } from '@/lib/meetings-db';
import { MeetingCard } from '@/components/MeetingCard';
import type { MeetingType } from '@/lib/types';
import { Calendar, Filter } from 'lucide-react';

export default function MeetingsPage() {
  const allMeetings = getMeetings();
  const [selectedType, setSelectedType] = useState<MeetingType | 'all'>('all');

  const filteredMeetings =
    selectedType === 'all'
      ? allMeetings
      : allMeetings.filter((m) => m.meetingType === selectedType);

  const filterOptions: { label: string; value: MeetingType | 'all' }[] = [
    { label: 'All Meetings', value: 'all' },
    { label: 'Regular', value: 'regular' },
    { label: 'Testimony', value: 'testimony' },
    { label: 'Stake', value: 'stake' },
    { label: 'General', value: 'general' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      {/* Header & Section Description */}
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

        {/* Quick Total Count Badge */}
        <div className="flex items-center gap-2 self-start rounded-lg bg-navy-50 px-3 py-2 text-xs font-semibold text-navy-800 ring-1 ring-navy-200">
          <Calendar className="h-4 w-4 text-navy-600" />
          <span>{filteredMeetings.length} Services Listed</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
          <Filter className="h-3.5 w-3.5" />
          Filter:
        </span>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSelectedType(option.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
              selectedType === option.value
                ? 'bg-navy-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Meetings Grid */}
      {filteredMeetings.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">
            No meetings found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            There are no services scheduled for the selected meeting type.
          </p>
        </div>
      )}
    </div>
  );
}
