import { MeetingForm } from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <p className="eyebrow">Sacrament Planner</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Create Meeting
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Schedule a new sacrament meeting program.
        </p>
      </div>

      <MeetingForm action={createMeeting} submitLabel="Create Meeting" />
    </div>
  );
}
