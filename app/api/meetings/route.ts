import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const meetings = await getMeetings(query, page);
  return NextResponse.json(meetings, { status: 200 });
}
