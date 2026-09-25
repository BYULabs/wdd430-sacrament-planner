'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as db from './meetings-db';

const HymnSchema = z.object({
  number: z.coerce.number().int().min(1, 'Hymn number must be positive.'),
  title: z.string().trim().min(1, 'Hymn title is required.'),
});

const MeetingFormSchema = z.object({
  date: z.iso.date('Date must be YYYY-MM-DD.'),
  meetingType: z.enum(['regular', 'testimony', 'stake', 'general']),
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
      type: z.enum(['speaker', 'musical-number']),
    })
  ),
  closingHymn: HymnSchema,
  closingPrayer: z.string().trim().min(2, 'Benediction is required.'),
});

const MeetingIdSchema = z.coerce.number().int().positive();

// Split a textarea into one entry per non-empty line.
function lines(value: FormDataEntryValue | null): string[] {
  return typeof value === 'string'
    ? value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    : [];
}

function parseMeetingForm(formData: FormData) {
  // Speaker rows are submitted as parallel lists; skip rows left blank.
  const names = formData.getAll('speakerName');
  const topics = formData.getAll('speakerTopic');
  const types = formData.getAll('speakerType');
  const speakers = names
    .map((name, i) => ({ name, topic: topics[i] ?? '', type: types[i] }))
    .filter((s) => typeof s.name === 'string' && s.name.trim() !== '');

  const raw = {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: lines(formData.get('announcements')),
    openingHymn: {
      number: formData.get('openingHymnNumber'),
      title: formData.get('openingHymnTitle'),
    },
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: lines(formData.get('wardBusiness')).map((description) => ({
      description,
    })),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    sacramentHymn: {
      number: formData.get('sacramentHymnNumber'),
      title: formData.get('sacramentHymnTitle'),
    },
    speakers,
    closingHymn: {
      number: formData.get('closingHymnNumber'),
      title: formData.get('closingHymnTitle'),
    },
    closingPrayer: formData.get('closingPrayer'),
  };

  const parsed = MeetingFormSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid meeting input. ${issues}`);
  }

  return parsed.data;
}

export async function createMeeting(formData: FormData) {
  const data = parseMeetingForm(formData);

  try {
    await db.addMeeting(data);
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw new Error('Failed to create meeting. Please try again later.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: number, formData: FormData) {
  const meetingId = MeetingIdSchema.parse(id);
  const data = parseMeetingForm(formData);

  let updated;
  try {
    updated = await db.updateMeeting(meetingId, data);
  } catch (error) {
    console.error(`Error updating meeting ${meetingId}:`, error);
    throw new Error('Failed to update meeting. Please try again later.');
  }
  if (!updated) {
    throw new Error(`Meeting ${meetingId} not found.`);
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
