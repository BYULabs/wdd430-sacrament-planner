'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import type { Hymn, SacramentMeeting, SpeakerItem } from '../lib/types';

interface MeetingFormProps {
  action: (formData: FormData) => void | Promise<void>;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

const inputClass =
  'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200';
const labelClass = 'block text-sm font-semibold text-slate-700';
const sectionClass =
  'space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6';
const sectionTitleClass =
  'text-xs font-bold uppercase tracking-widest text-slate-400';

type SpeakerRow = SpeakerItem & { key: number };

let nextKey = 0;
const toRow = (speaker: SpeakerItem): SpeakerRow => ({
  ...speaker,
  key: nextKey++,
});
const emptySpeaker = (): SpeakerRow =>
  toRow({ name: '', topic: '', type: 'speaker' });

function HymnFields({
  prefix,
  label,
  hymn,
}: {
  prefix: string;
  label: string;
  hymn?: Hymn;
}) {
  return (
    <fieldset className="grid grid-cols-[6rem_1fr] gap-3">
      <legend className={`${labelClass} col-span-2`}>{label}</legend>
      <div>
        <label htmlFor={`${prefix}Number`} className="sr-only">
          {label} number
        </label>
        <input
          id={`${prefix}Number`}
          name={`${prefix}Number`}
          type="number"
          min={1}
          required
          placeholder="No."
          defaultValue={hymn?.number}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor={`${prefix}Title`} className="sr-only">
          {label} title
        </label>
        <input
          id={`${prefix}Title`}
          name={`${prefix}Title`}
          required
          placeholder="Hymn title"
          defaultValue={hymn?.title}
          className={inputClass}
        />
      </div>
    </fieldset>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
    >
      {pending ? 'Saving…' : label}
    </button>
  );
}

export function MeetingForm({
  action,
  meeting,
  submitLabel,
}: MeetingFormProps) {
  const [speakers, setSpeakers] = useState<SpeakerRow[]>(() =>
    meeting?.speakers.length ? meeting.speakers.map(toRow) : [emptySpeaker()]
  );

  return (
    <form action={action} className="space-y-6">
      {/* Meeting Details */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Meeting Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className={labelClass}>
              Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={meeting?.date}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="meetingType" className={labelClass}>
              Meeting type
            </label>
            <select
              id="meetingType"
              name="meetingType"
              required
              defaultValue={meeting?.meetingType ?? 'regular'}
              className={inputClass}
            >
              <option value="regular">Regular</option>
              <option value="testimony">Fast &amp; Testimony</option>
              <option value="stake">Stake Conference</option>
              <option value="general">General Conference</option>
            </select>
          </div>
          <div>
            <label htmlFor="presiding" className={labelClass}>
              Presiding
            </label>
            <input
              id="presiding"
              name="presiding"
              required
              minLength={2}
              defaultValue={meeting?.presiding}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="conducting" className={labelClass}>
              Conducting
            </label>
            <input
              id="conducting"
              name="conducting"
              required
              minLength={2}
              defaultValue={meeting?.conducting}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="openingPrayer" className={labelClass}>
              Invocation
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              required
              minLength={2}
              defaultValue={meeting?.openingPrayer}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="closingPrayer" className={labelClass}>
              Benediction
            </label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              required
              minLength={2}
              defaultValue={meeting?.closingPrayer}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Hymns */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Hymns</h2>
        <HymnFields
          prefix="openingHymn"
          label="Opening hymn"
          hymn={meeting?.openingHymn}
        />
        <HymnFields
          prefix="sacramentHymn"
          label="Sacrament hymn"
          hymn={meeting?.sacramentHymn}
        />
        <HymnFields
          prefix="closingHymn"
          label="Closing hymn"
          hymn={meeting?.closingHymn}
        />
      </section>

      {/* Speakers */}
      <section className={sectionClass}>
        <div className="flex items-center justify-between gap-2">
          <h2 className={sectionTitleClass}>Speakers &amp; Music</h2>
          <button
            type="button"
            onClick={() => setSpeakers((rows) => [...rows, emptySpeaker()])}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-navy-700 ring-1 ring-navy-200 transition hover:bg-navy-50 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Add row
          </button>
        </div>

        {speakers.map((speaker, idx) => (
          <div
            key={speaker.key}
            className="grid gap-3 sm:grid-cols-[1fr_1fr_10rem_auto] sm:items-end"
          >
            <div>
              <label
                htmlFor={`speakerName-${speaker.key}`}
                className={labelClass}
              >
                Name
              </label>
              <input
                id={`speakerName-${speaker.key}`}
                name="speakerName"
                defaultValue={speaker.name}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor={`speakerTopic-${speaker.key}`}
                className={labelClass}
              >
                Topic / piece
              </label>
              <input
                id={`speakerTopic-${speaker.key}`}
                name="speakerTopic"
                defaultValue={speaker.topic}
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor={`speakerType-${speaker.key}`}
                className={labelClass}
              >
                Type
              </label>
              <select
                id={`speakerType-${speaker.key}`}
                name="speakerType"
                defaultValue={speaker.type}
                className={inputClass}
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical number</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() =>
                setSpeakers((rows) => rows.filter((r) => r.key !== speaker.key))
              }
              aria-label={`Remove row ${idx + 1}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 ring-1 ring-slate-200 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <p className="text-xs text-slate-500">Rows with no name are ignored.</p>
      </section>

      {/* Announcements & Business */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Announcements &amp; Business</h2>
        <div>
          <label htmlFor="announcements" className={labelClass}>
            Announcements
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={3}
            placeholder="One announcement per line"
            defaultValue={meeting?.announcements?.join('\n')}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="wardBusiness" className={labelClass}>
            Ward business
          </label>
          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={3}
            placeholder="One item per line"
            defaultValue={meeting?.wardBusiness
              .map((b) => b.description)
              .join('\n')}
            className={inputClass}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="stakeBusiness"
            defaultChecked={meeting?.stakeBusiness}
            className="h-4 w-4 rounded border-slate-300 text-navy-700"
          />
          Stake business will be presented
        </label>
      </section>

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/meetings"
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          Cancel
        </Link>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
