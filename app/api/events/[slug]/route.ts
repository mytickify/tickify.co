import { NextRequest, NextResponse } from 'next/server';
import { eventStore } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const event = eventStore.getBySlug(slug);
  
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  
  return NextResponse.json(event);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const event = eventStore.getBySlug(slug);
    
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    const updates = await request.json();
    const updated = eventStore.update(event.id, updates);
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
