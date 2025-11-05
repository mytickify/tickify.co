import { Event, EventCategory } from '@/types';

// Temporary in-memory store (replace with database later)
let events: Event[] = [];

export const eventStore = {
  getAll: () => events,
  getById: (id: string) => events.find(e => e.id === id),
  getBySlug: (slug: string) => events.find(e => e.slug === slug),
  create: (event: Omit<Event, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
    const newEvent: Event = {
      ...event,
      id: crypto.randomUUID(),
      slug: event.title.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    events.push(newEvent);
    return newEvent;
  },
  update: (id: string, updates: Partial<Event>) => {
    const index = events.findIndex(e => e.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...updates, updatedAt: new Date().toISOString() };
      return events[index];
    }
    return null;
  },
  delete: (id: string) => {
    events = events.filter(e => e.id !== id);
  }
};
