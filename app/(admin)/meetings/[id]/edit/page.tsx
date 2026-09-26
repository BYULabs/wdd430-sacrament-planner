import { notFound } from 'next/navigation';
import { MeetingForm } from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

export default async function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <p className="eyebrow">Sacrament Planner</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Edit Meeting
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Update the program for {meeting.date}.
        </p>
      </div>

      <MeetingForm
        action={updateMeetingWithId}
        meeting={meeting}
        submitLabel="Save Changes"
      />
    </div>
  );
}
