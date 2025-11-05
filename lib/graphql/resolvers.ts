import { eventStore } from '@/lib/store';
import { Event, EventCategory, EventStatus, PaymentStatus } from '@/types';

const resolvers = {
  Query: {
    events: () => {
      return eventStore.getAll();
    },

    event: (_: any, { id }: { id: string }) => {
      return eventStore.getById(id);
    },

    eventBySlug: (_: any, { slug }: { slug: string }) => {
      return eventStore.getBySlug(slug);
    },

    featuredEvents: () => {
      const events = eventStore.getAll();
      return events.filter(event => event.is_featured);
    },

    eventsByCategory: (_: any, { category }: { category: EventCategory }) => {
      const events = eventStore.getAll();
      return events.filter(event =>
        event.category.type.includes(category)
      );
    },

    searchEvents: (_: any, { searchTerm }: { searchTerm: string }) => {
      const events = eventStore.getAll();
      const term = searchTerm.toLowerCase();
      return events.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        (event.location?.venue && event.location.venue.toLowerCase().includes(term)) ||
        (event.location?.city && event.location.city.toLowerCase().includes(term))
      );
    },
  },

  Mutation: {
    createEvent: (_: any, { input }: { input: Omit<Event, 'id' | 'slug' | 'createdAt' | 'updatedAt'> }) => {
      return eventStore.create(input);
    },

    updateEvent: (_: any, { id, input }: { id: string; input: Partial<Event> }) => {
      return eventStore.update(id, input);
    },

    deleteEvent: (_: any, { id }: { id: string }) => {
      return eventStore.delete(id);
    },

    createPurchase: (_: any, { input }: { input: any }) => {
      // For now, return a mock purchase since purchase functionality isn't implemented
      return {
        id: Math.random().toString(36).substr(2, 9),
        eventId: input.eventId,
        ticketTierId: input.ticketTierId,
        quantity: input.quantity,
        totalAmount: 0, // Would calculate based on ticket price
        buyer: input.buyer,
        paymentStatus: PaymentStatus.Pending,
        purchasedAt: new Date().toISOString(),
      };
    },
  },
};

export default resolvers;