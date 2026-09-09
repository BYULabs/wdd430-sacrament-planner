'use client';

import {
  FileText,
  Calendar,
  Clock,
  MapPin,
  Printer,
  Bell,
  List,
} from 'lucide-react';
import type { SacramentMeeting } from '../lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(`${meeting.date}T00:00:00`).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

  const getMeetingTitle = () => {
    switch (meeting.meetingType) {
      case 'testimony':
        return 'Fast & Testimony Meeting';
      case 'stake':
        return 'Stake Conference Service';
      case 'general':
        return 'General Conference Broadcast';
      default:
        return 'Sacrament Meeting';
    }
  };

  const isSacramentService =
    meeting.meetingType === 'regular' || meeting.meetingType === 'testimony';
  const hasBusiness =
    (meeting.wardBusiness && meeting.wardBusiness.length > 0) ||
    meeting.stakeBusiness;

  let stepIndex = 1;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card print:rounded-none print:border-0 print:shadow-none print:text-black">
      {/* ==================== PROGRAM HEADER ==================== */}
      <div className="bg-navy-900 px-6 py-8 text-white sm:px-10 print:bg-white print:px-0 print:py-1 print:text-slate-900 print:border-b print:border-slate-300">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-navy-200 print:text-slate-600">
              <FileText className="h-4 w-4 print:hidden" />
              Oakridge Ward · Sunday Program
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold capitalize tracking-normal ring-1 ring-white/20 print:bg-stone-100 print:text-stone-700 print:ring-stone-300">
                {meeting.meetingType}
              </span>
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl print:text-xl print:mt-1">
              {getMeetingTitle()}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-100 print:text-slate-600 print:text-xs print:mt-0.5">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 print:hidden" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 print:hidden" />
                11:00 AM
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 print:hidden" />
                {meeting.meetingType === 'stake'
                  ? 'Stake Center'
                  : 'Oakridge Chapel'}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 self-start rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/25 transition hover:bg-white/20 print:hidden cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            Print Program
          </button>
        </div>

        {/* Leadership Details */}
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/15 pt-5 sm:grid-cols-4 print:mt-2 print:pt-2 print:border-slate-200 print:gap-y-1">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-navy-300 print:text-slate-500 print:text-[10px]">
              Presiding
            </dt>
            <dd className="mt-1 text-sm font-semibold print:text-xs print:mt-0">
              {meeting.presiding}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-navy-300 print:text-slate-500 print:text-[10px]">
              Conducting
            </dt>
            <dd className="mt-1 text-sm font-semibold print:text-xs print:mt-0">
              {meeting.conducting}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-navy-300 print:text-slate-500 print:text-[10px]">
              Invocation
            </dt>
            <dd className="mt-1 text-sm font-semibold print:text-xs print:mt-0">
              {meeting.openingPrayer}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-navy-300 print:text-slate-500 print:text-[10px]">
              Benediction
            </dt>
            <dd className="mt-1 text-sm font-semibold print:text-xs print:mt-0">
              {meeting.closingPrayer}
            </dd>
          </div>
        </dl>
      </div>

      {/* ==================== ANNOUNCEMENTS (PRINT TOP HORIZONTAL) ==================== */}
      {meeting.announcements && meeting.announcements.length > 0 && (
        <div className="hidden print:block print:p-2 print:my-2 print:bg-stone-50 print:border print:border-stone-200 print:rounded-lg">
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mb-1">
            Ward Announcements:
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-700">
            {meeting.announcements.map((announcement, idx) => (
              <li key={idx} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-navy-600" />
                {announcement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ==================== PROGRAM BODY ==================== */}
      <div className="grid lg:grid-cols-3 print:block">
        {/* Sidebar: Announcements (Screen View Only) */}
        <aside
          aria-label="Announcements"
          className="border-t border-stone-200 bg-stone-50 p-6 sm:p-8 lg:order-2 lg:border-l lg:border-t-0 print:hidden"
        >
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500">
            <Bell className="h-4 w-4" />
            Announcements
          </h2>

          {meeting.announcements && meeting.announcements.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {meeting.announcements.map((announcement, idx) => (
                <li key={idx} className="flex gap-2.5 text-sm text-slate-700">
                  <span className="flex h-2 w-2 shrink-0 rounded-full bg-navy-600 mt-1.5" />
                  <p className="leading-relaxed">{announcement}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-xs italic text-stone-500">
              No ward announcements posted for this meeting.
            </p>
          )}

          {meeting.stakeBusiness && (
            <div className="mt-6 rounded-lg border border-teal-200 bg-teal-50/60 p-3 text-xs text-teal-900">
              <p className="font-semibold">Stake Business</p>
              <p className="mt-0.5 text-teal-700">
                Stake business will be presented during this meeting.
              </p>
            </div>
          )}
        </aside>

        {/* Agenda Grid */}
        <div className="p-6 sm:p-10 lg:order-1 lg:col-span-2 print:p-0">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 print:text-[10px] print:mb-1">
            <List className="h-4 w-4 print:hidden" />
            Program Order
          </h2>

          <ol className="mt-5 divide-y divide-slate-100 print:mt-1 print:divide-y-0 print:grid print:grid-cols-2 print:gap-x-6 print:gap-y-1">
            {/* Opening Hymn */}
            <li className="flex gap-4 py-4 first:pt-0 print:py-1 print:gap-2">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white print:h-5 print:w-5 print:text-[10px]">
                {stepIndex++}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold text-slate-900 print:text-xs">
                  Opening Hymn
                </p>
                <p className="mt-1 text-sm text-slate-500 print:text-[11px] print:mt-0">
                  “{meeting.openingHymn.title}”, No.{' '}
                  {meeting.openingHymn.number}
                </p>
              </div>
            </li>

            {/* Invocation */}
            <li className="flex gap-4 py-4 print:py-1 print:gap-2">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white print:h-5 print:w-5 print:text-[10px]">
                {stepIndex++}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold text-slate-900 print:text-xs">
                  Invocation
                </p>
                <p className="mt-1 text-sm text-slate-500 print:text-[11px] print:mt-0">
                  {meeting.openingPrayer}
                </p>
              </div>
            </li>

            {/* Business */}
            {hasBusiness && (
              <li className="flex gap-4 py-4 print:py-1 print:gap-2 print:col-span-2">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white print:h-5 print:w-5 print:text-[10px]">
                  {stepIndex++}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold text-slate-900 print:text-xs">
                    Ward &amp; Stake Business
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-500 print:text-[11px] print:mt-0 print:space-y-0">
                    {meeting.wardBusiness?.map((item, idx) => (
                      <li key={idx}>{item.description}</li>
                    ))}
                    {meeting.stakeBusiness && (
                      <li>Stake business presented by presidency</li>
                    )}
                  </ul>
                </div>
              </li>
            )}

            {/* Sacrament Hymn & Administration */}
            {isSacramentService && (
              <>
                <li className="flex gap-4 py-4 print:py-1 print:gap-2">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white print:h-5 print:w-5 print:text-[10px]">
                    {stepIndex++}
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-semibold text-slate-900 print:text-xs">
                      Sacrament Hymn
                    </p>
                    <p className="mt-1 text-sm text-slate-500 print:text-[11px] print:mt-0">
                      “{meeting.sacramentHymn.title}”, No.{' '}
                      {meeting.sacramentHymn.number}
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 py-4 print:py-1 print:gap-2">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white print:h-5 print:w-5 print:text-[10px]">
                    {stepIndex++}
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-semibold text-slate-900 print:text-xs">
                      Administration of Sacrament
                    </p>
                    <p className="mt-1 text-sm text-slate-500 print:text-[11px] print:mt-0">
                      Passed by priesthood holders
                    </p>
                  </div>
                </li>
              </>
            )}

            {/* Speakers & Musical Numbers */}
            {meeting.speakers.map((item, idx) => (
              <li key={idx} className="flex gap-4 py-4 print:py-1 print:gap-2">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white print:h-5 print:w-5 print:text-[10px]">
                  {stepIndex++}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold text-slate-900 print:text-xs">
                    {item.type === 'musical-number'
                      ? 'Musical Number'
                      : 'Speaker'}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 print:text-[11px] print:mt-0">
                    <span className="font-medium text-slate-700">
                      {item.name}
                    </span>
                    {item.topic && ` — “${item.topic}”`}
                  </p>
                </div>
              </li>
            ))}

            {/* Closing Hymn */}
            <li className="flex gap-4 py-4 print:py-1 print:gap-2">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white print:h-5 print:w-5 print:text-[10px]">
                {stepIndex++}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold text-slate-900 print:text-xs">
                  Closing Hymn
                </p>
                <p className="mt-1 text-sm text-slate-500 print:text-[11px] print:mt-0">
                  “{meeting.closingHymn.title}”, No.{' '}
                  {meeting.closingHymn.number}
                </p>
              </div>
            </li>

            {/* Benediction */}
            <li className="flex gap-4 py-4 last:pb-0 print:py-1 print:gap-2">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white print:h-5 print:w-5 print:text-[10px]">
                {stepIndex++}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold text-slate-900 print:text-xs">
                  Benediction
                </p>
                <p className="mt-1 text-sm text-slate-500 print:text-[11px] print:mt-0">
                  {meeting.closingPrayer}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <p className="hidden px-6 pb-2 text-center text-[10px] text-slate-400 print:block print:mt-2">
        Oakridge Ward · Sacrament Meeting Program · Prepared with Sacrament
        Planner
      </p>
    </article>
  );
}
