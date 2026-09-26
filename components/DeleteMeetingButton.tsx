'use client';

import { useFormStatus } from 'react-dom';
import { Trash2 } from 'lucide-react';
import { deleteMeeting } from '../lib/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-60 cursor-pointer"
    >
      <Trash2 className="h-4 w-4" />
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}

export function DeleteMeetingButton({ id }: { id: number }) {
  const deleteMeetingWithId = deleteMeeting.bind(null, id);

  return (
    <form
      action={deleteMeetingWithId}
      onSubmit={(e) => {
        if (!confirm('Delete this meeting? This cannot be undone.')) {
          e.preventDefault();
        }
      }}
      className="flex-1"
    >
      <SubmitButton />
    </form>
  );
}
