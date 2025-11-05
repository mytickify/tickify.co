import Link from 'next/link';
import { format } from 'date-fns';

async function getEvents() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/events`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    return [];
  }
  
  return res.json();
}

export default async function EventsPage() {
  const events = await getEvents();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Discover Events</h1>
          <p className="text-xl opacity-90">Find your next amazing experience</p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-12">
        {events.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold mb-4">No Events Yet</h2>
            <p className="text-gray-600 mb-8">Be the first to create an amazing event!</p>
            <Link 
              href="/create"
              className="inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Create First Event
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any) => (
              <Link 
                key={event.id} 
                href={`/event/${event.slug}`}
                className="block group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div 
                    className="h-48 flex items-center justify-center text-white text-3xl font-bold"
                    style={{
                      backgroundImage: event.theme.gradientEnabled 
                        ? `linear-gradient(to bottom right, ${event.theme.primaryColor}, ${event.theme.secondaryColor})`
                        : undefined,
                      backgroundColor: event.theme.gradientEnabled ? undefined : event.theme.primaryColor
                    }}
                  >
                    {event.title}
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>📅</span>
                        <span>{format(new Date(event.startDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span>📍</span>
                        <span>{event.location.venue}</span>
                      </div>
                      {event.ticketTiers && event.ticketTiers.length > 0 && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <span>🎟️</span>
                          <span>From ${Math.min(...event.ticketTiers.map((t: any) => t.price))}</span>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      className="mt-4 w-full py-2 rounded-lg text-white font-semibold group-hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: event.theme.accentColor }}
                    >
                      View Event
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
