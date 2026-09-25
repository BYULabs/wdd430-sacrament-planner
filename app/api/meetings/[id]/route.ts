import { NextRequest, NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const resolvedParams = await params;
  const meetingId = parseInt(resolvedParams.id, 10);

  if (isNaN(meetingId)) {
    return NextResponse.json(
      { error: 'Invalid meeting ID format. Must be a valid integer.' },
      { status: 400 }
    );
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json(
      { error: `Meeting with ID ${meetingId} not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting, { status: 200 });
}