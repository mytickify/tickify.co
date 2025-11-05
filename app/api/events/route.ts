import { NextRequest, NextResponse } from 'next/server';
import { eventStore } from '@/lib/store';

export async function GET() {
  const events = eventStore.getAll();
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();
    const created = eventStore.create(event);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
