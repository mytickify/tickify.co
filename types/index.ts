export interface EventTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: 'modern' | 'elegant' | 'bold' | 'playful';
  layout: 'single' | 'two-column' | 'card' | 'minimal';
  gradientEnabled: boolean;
  gradientDirection: 'to-r' | 'to-br' | 'to-b' | 'to-bl';
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  soldCount: number;
  description?: string;
  available: boolean;
}

export enum EventCategory {
  Music = "music",
  Sports = "sports",
  Arts = "arts",
  Festival = "festival",
  Conference = "conference",
  Nightlife = "nightlife",
  Comedy = "comedy",
  Theatre = "theatre",
  Other = "other"
}

export type Category = {
  type: EventCategory[];
  description: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  category: Category;
  is_featured: boolean;
  location: {
    venue: string;
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  organizer: {
    name: string;
    email: string;
    phone?: string;
  };
  theme: EventTheme;
  ticketTiers: TicketTier[];
  images: {
    banner?: string;
    gallery: string[];
  };
  features: {
    showGallery: boolean;
    allowGuestUploads: boolean;
    showChat: boolean;
    showCollaborators: boolean;
  };
  collaborators?: {
    name: string;
    type: 'sponsor' | 'artist' | 'vendor';
    logo?: string;
  }[];
  status: 'draft' | 'published' | 'ended';
  createdAt: string;
  updatedAt: string;
}

export interface Purchase {
  id: string;
  eventId: string;
  ticketTierId: string;
  quantity: number;
  totalAmount: number;
  buyer: {
    name: string;
    email: string;
    phone: string;
  };
  paymentStatus: 'pending' | 'completed' | 'failed';
  purchasedAt: string;
}
