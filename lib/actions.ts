'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as db from './meetings-db';
import type { MeetingField, MeetingFormValues, SpeakerItem } from './types';

const HymnSchema = z.object({
  number: z.coerce
    .number('Hymn number must be a number.')
    .int('Hymn number must be a whole number.')
    .min(1, 'Hymn number must be positive.'),
  title: z.string().trim().min(1, 'Hymn title is required.'),
});

const MeetingFormSchema = z.object({
  date: z.iso.date('Date must be YYYY-MM-DD.'),
  meetingType: z.enum(
    ['regular', 'testimony', 'stake', 'general'],
    'Choose a meeting type.'
  ),
  presiding: z.string().trim().min(2, 'Presiding is required.'),
  conducting: z.string().trim().min(2, 'Conducting is required.'),
  announcements: z.array(z.string().trim().min(1)),
  openingHymn: HymnSchema,
  openingPrayer: z.string().trim().min(2, 'Invocation is required.'),
  wardBusiness: z.array(z.object({ description: z.string().trim().min(1) })),
  stakeBusiness: z.boolean(),
  sacramentHymn: HymnSchema,
  speakers: z.array(
    z.object({
      name: z.string().trim().min(2, 'Speaker name is required.'),
      topic: z.string().trim(),
      type: z.enum(['speaker', 'musical-number'], 'Choose a row type.'),
    })
  ),
  closingHymn: HymnSchema,
  closingPrayer: z.string().trim().min(2, 'Benediction is required.'),
});

const MeetingIdSchema = z.coerce.number().int().positive();

export type State = {
  errors?: Partial<Record<MeetingField, string[]>>;
  message?: string | null;
  values?: MeetingFormValues;
};

// Split a textarea into one entry per non-empty line.
function lines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function readFormValues(formData: FormData): MeetingFormValues {
  const text = (name: string) => {
    const value = formData.get(name);
    return typeof value === 'string' ? value : '';
  };

  // Speaker rows are submitted as parallel lists.
  const names = formData.getAll('speakerName');
  const topics = formData.getAll('speakerTopic');
  const types = formData.getAll('speakerType');

  return {
    date: text('date'),
    meetingType: text('meetingType'),
    presiding: text('presiding'),
    conducting: text('conducting'),
    openingPrayer: text('openingPrayer'),
    closingPrayer: text('closingPrayer'),
    openingHymnNumber: text('openingHymnNumber'),
    openingHymnTitle: text('openingHymnTitle'),
    sacramentHymnNumber: text('sacramentHymnNumber'),
    sacramentHymnTitle: text('sacramentHymnTitle'),
    closingHymnNumber: text('closingHymnNumber'),
    closingHymnTitle: text('closingHymnTitle'),
    speakers: names.map((name, i) => ({
      name: String(name),
      topic: String(topics[i] ?? ''),
      type: String(types[i]) as SpeakerItem['type'],
    })),
    announcements: text('announcements'),
    wardBusiness: text('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
  };
}

const hymnKeys = ['openingHymn', 'sacramentHymn', 'closingHymn'] as const;

function validateMeetingForm(values: MeetingFormValues) {
  // Skip speaker rows left blank, but remember each row's position on the form.
  const speakerRows = values.speakers
    .map((speaker, i) => ({ speaker, row: i + 1 }))
    .filter(({ speaker }) => speaker.name.trim() !== '');

  const parsed = MeetingFormSchema.safeParse({
    date: values.date,
    meetingType: values.meetingType,
    presiding: values.presiding,
    conducting: values.conducting,
    announcements: lines(values.announcements),
    openingHymn: {
      number: values.openingHymnNumber,
      title: values.openingHymnTitle,
    },
    openingPrayer: values.openingPrayer,
    wardBusiness: lines(values.wardBusiness).map((description) => ({
      description,
    })),
    stakeBusiness: values.stakeBusiness,
    sacramentHymn: {
      number: values.sacramentHymnNumber,
      title: values.sacramentHymnTitle,
    },
    speakers: speakerRows.map(({ speaker }) => speaker),
    closingHymn: {
      number: values.closingHymnNumber,
      title: values.closingHymnTitle,
    },
    closingPrayer: values.closingPrayer,
  });

  if (parsed.success) {
    return { success: true as const, data: parsed.data };
  }

  // Map nested schema paths back to the form's input names.
  const errors: NonNullable<State['errors']> = {};
  for (const issue of parsed.error.issues) {
    const [top, sub] = issue.path;
    let field: MeetingField;
    let message = issue.message;

    if (hymnKeys.includes(top as (typeof hymnKeys)[number])) {
      field =
        `${top as string}${sub === 'number' ? 'Number' : 'Title'}` as MeetingField;
    } else if (top === 'speakers') {
      field = 'speakers';
      message = `Row ${speakerRows[sub as number].row}: ${message}`;
    } else {
      field = top as MeetingField;
    }

    (errors[field] ??= []).push(message);
  }

  return { success: false as const, errors };
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  const values = readFormValues(formData);
  const validated = validateMeetingForm(values);

  if (!validated.success) {
    return {
      errors: validated.errors,
      message: 'Missing or invalid fields. Failed to create meeting.',
      values,
    };
  }

  try {
    await db.addMeeting(validated.data);
  } catch (error) {
    console.error('Error creating meeting:', error);
    return {
      message: 'Database Error: Failed to create meeting.',
      values,
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
  const meetingId = MeetingIdSchema.parse(id);
  const values = readFormValues(formData);
  const validated = validateMeetingForm(values);

  if (!validated.success) {
    return {
      errors: validated.errors,
      message: 'Missing or invalid fields. Failed to update meeting.',
      values,
    };
  }

  let updated;
  try {
    updated = await db.updateMeeting(meetingId, validated.data);
  } catch (error) {
    console.error(`Error updating meeting ${meetingId}:`, error);
    return {
      message: 'Database Error: Failed to update meeting.',
      values,
    };
  }
  if (!updated) {
    return { message: `Meeting ${meetingId} not found.`, values };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${meetingId}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number) {
  const meetingId = MeetingIdSchema.parse(id);

  try {
    await db.deleteMeeting(meetingId);
  } catch (error) {
    console.error(`Error deleting meeting ${meetingId}:`, error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }

  revalidatePath('/meetings');
}
