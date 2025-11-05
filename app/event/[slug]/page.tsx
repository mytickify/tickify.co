import { notFound } from 'next/navigation';
import EventPreview from '@/components/EventPreview';

async function getEvent(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/events/${slug}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function EventPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  
  if (!event) {
    notFound();
  }
  
  return <EventPreview event={event} />;
}
