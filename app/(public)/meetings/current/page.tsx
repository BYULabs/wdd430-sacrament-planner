import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default function CurrentMeetingPage() {
  const meetings = getMeetings();

  if (!meetings || meetings.length === 0) {
    redirect('/meetings');
  }

  // Get today's date string in YYYY-MM-DD format
  const todayStr = new Date().toISOString().split('T')[0];

  // Find the current Sunday meeting (today or the next upcoming one)
  const currentOrUpcomingMeeting = meetings.find(
    (meeting) => meeting.date >= todayStr
  );

  // If found, redirect to that meeting; otherwise redirect to the latest available meeting
  const targetMeeting =
    currentOrUpcomingMeeting ?? meetings[meetings.length - 1];

  redirect(`/meetings/${targetMeeting.id}`);
}
