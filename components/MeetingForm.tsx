'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import type { State } from '../lib/actions';
import type {
  MeetingField,
  MeetingFormValues,
  SacramentMeeting,
  SpeakerItem,
} from '../lib/types';

interface MeetingFormProps {
  action: (prevState: State, formData: FormData) => Promise<State>;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

type Errors = State['errors'];

const initialState: State = { message: null, errors: {} };

const inputClass =
  'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-200 aria-invalid:border-red-400';
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
const toRows = (speakers: SpeakerItem[]): SpeakerRow[] =>
  speakers.length ? speakers.map(toRow) : [emptySpeaker()];

function toFormValues(meeting?: SacramentMeeting): MeetingFormValues {
  return {
    date: meeting?.date ?? '',
    meetingType: meeting?.meetingType ?? 'regular',
    presiding: meeting?.presiding ?? '',
    conducting: meeting?.conducting ?? '',
    openingPrayer: meeting?.openingPrayer ?? '',
    closingPrayer: meeting?.closingPrayer ?? '',
    openingHymnNumber: String(meeting?.openingHymn.number ?? ''),
    openingHymnTitle: meeting?.openingHymn.title ?? '',
    sacramentHymnNumber: String(meeting?.sacramentHymn.number ?? ''),
    sacramentHymnTitle: meeting?.sacramentHymn.title ?? '',
    closingHymnNumber: String(meeting?.closingHymn.number ?? ''),
    closingHymnTitle: meeting?.closingHymn.title ?? '',
    speakers: meeting?.speakers ?? [],
    announcements: meeting?.announcements?.join('\n') ?? '',
    wardBusiness:
      meeting?.wardBusiness.map((b) => b.description).join('\n') ?? '',
    stakeBusiness: meeting?.stakeBusiness ?? false,
  };
}

// Live region beneath a field; screen readers announce errors as they change.
function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p key={error} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}

function TextField({
  name,
  label,
  values,
  errors,
}: {
  name: MeetingField;
  label: string;
  values: MeetingFormValues;
  errors: Errors;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        required
        minLength={2}
        defaultValue={values[name] as string}
        aria-describedby={`${name}-error`}
        aria-invalid={errors?.[name] ? true : undefined}
        className={inputClass}
      />
      <FieldError id={`${name}-error`} errors={errors?.[name]} />
    </div>
  );
}

function HymnFields({
  prefix,
  label,
  values,
  errors,
}: {
  prefix: 'openingHymn' | 'sacramentHymn' | 'closingHymn';
  label: string;
  values: MeetingFormValues;
  errors: Errors;
}) {
  const numberField = `${prefix}Number` as const;
  const titleField = `${prefix}Title` as const;

  return (
    <fieldset className="grid grid-cols-[6rem_1fr] gap-3">
      <legend className={`${labelClass} col-span-2`}>{label}</legend>
      <div>
        <label htmlFor={numberField} className="sr-only">
          {label} number
        </label>
        <input
          id={numberField}
          name={numberField}
          type="number"
          min={1}
          required
          placeholder="No."
          defaultValue={values[numberField]}
          aria-describedby={`${numberField}-error`}
          aria-invalid={errors?.[numberField] ? true : undefined}
          className={inputClass}
        />
        <FieldError
          id={`${numberField}-error`}
          errors={errors?.[numberField]}
        />
      </div>
      <div>
        <label htmlFor={titleField} className="sr-only">
          {label} title
        </label>
        <input
          id={titleField}
          name={titleField}
          required
          placeholder="Hymn title"
          defaultValue={values[titleField]}
          aria-describedby={`${titleField}-error`}
          aria-invalid={errors?.[titleField] ? true : undefined}
          className={inputClass}
        />
        <FieldError id={`${titleField}-error`} errors={errors?.[titleField]} />
      </div>
    </fieldset>
  );
}

export function MeetingForm({
  action,
  meeting,
  submitLabel,
}: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const values = state.values ?? toFormValues(meeting);
  const errors = state.errors;

  const [speakers, setSpeakers] = useState<SpeakerRow[]>(() =>
    toRows(values.speakers)
  );

  // React resets the form after each submission; rebuild the speaker rows from
  // what was submitted so a failed attempt keeps the user's input.
  const [submittedValues, setSubmittedValues] = useState(state.values);
  if (state.values !== submittedValues) {
    setSubmittedValues(state.values);
    if (state.values) setSpeakers(toRows(state.values.speakers));
  }

  return (
    <form action={formAction} className="space-y-6">
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
              defaultValue={values.date}
              aria-describedby="date-error"
              aria-invalid={errors?.date ? true : undefined}
              className={inputClass}
            />
            <FieldError id="date-error" errors={errors?.date} />
          </div>
          <div>
            <label htmlFor="meetingType" className={labelClass}>
              Meeting type
            </label>
            <select
              id="meetingType"
              name="meetingType"
              required
              defaultValue={values.meetingType}
              aria-describedby="meetingType-error"
              aria-invalid={errors?.meetingType ? true : undefined}
              className={inputClass}
            >
              <option value="regular">Regular</option>
              <option value="testimony">Fast &amp; Testimony</option>
              <option value="stake">Stake Conference</option>
              <option value="general">General Conference</option>
            </select>
            <FieldError id="meetingType-error" errors={errors?.meetingType} />
          </div>
          <TextField
            name="presiding"
            label="Presiding"
            values={values}
            errors={errors}
          />
          <TextField
            name="conducting"
            label="Conducting"
            values={values}
            errors={errors}
          />
          <TextField
            name="openingPrayer"
            label="Invocation"
            values={values}
            errors={errors}
          />
          <TextField
            name="closingPrayer"
            label="Benediction"
            values={values}
            errors={errors}
          />
        </div>
      </section>

      {/* Hymns */}
      <section className={sectionClass}>
        <h2 className={sectionTitleClass}>Hymns</h2>
        <HymnFields
          prefix="openingHymn"
          label="Opening hymn"
          values={values}
          errors={errors}
        />
        <HymnFields
          prefix="sacramentHymn"
          label="Sacrament hymn"
          values={values}
          errors={errors}
        />
        <HymnFields
          prefix="closingHymn"
          label="Closing hymn"
          values={values}
          errors={errors}
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
              <label htmlFor={`speakerName-${idx}`} className={labelClass}>
                Name
              </label>
              <input
                id={`speakerName-${idx}`}
                name="speakerName"
                defaultValue={speaker.name}
                aria-describedby="speakers-error"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`speakerTopic-${idx}`} className={labelClass}>
                Topic / piece
              </label>
              <input
                id={`speakerTopic-${idx}`}
                name="speakerTopic"
                defaultValue={speaker.topic}
                aria-describedby="speakers-error"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`speakerType-${idx}`} className={labelClass}>
                Type
              </label>
              <select
                id={`speakerType-${idx}`}
                name="speakerType"
                defaultValue={speaker.type}
                aria-describedby="speakers-error"
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
        <FieldError id="speakers-error" errors={errors?.speakers} />
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
            defaultValue={values.announcements}
            aria-describedby="announcements-error"
            aria-invalid={errors?.announcements ? true : undefined}
            className={inputClass}
          />
          <FieldError id="announcements-error" errors={errors?.announcements} />
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
            defaultValue={values.wardBusiness}
            aria-describedby="wardBusiness-error"
            aria-invalid={errors?.wardBusiness ? true : undefined}
            className={inputClass}
          />
          <FieldError id="wardBusiness-error" errors={errors?.wardBusiness} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <input
              id="stakeBusiness"
              name="stakeBusiness"
              type="checkbox"
              defaultChecked={values.stakeBusiness}
              aria-describedby="stakeBusiness-error"
              className="h-4 w-4 rounded border-slate-300 text-navy-700"
            />
            <label htmlFor="stakeBusiness" className="text-sm text-slate-700">
              Stake business will be presented
            </label>
          </div>
          <FieldError id="stakeBusiness-error" errors={errors?.stakeBusiness} />
        </div>
      </section>

      <div aria-live="polite" aria-atomic="true">
        {state.message ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {state.message}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/meetings"
          className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-navy-900 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isPending ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
