const typeDefs = /* GraphQL */ `
  scalar DateTime
  scalar JSON

  enum EventCategoryType { MUSIC SPORTS ARTS FESTIVAL CONFERENCE NIGHTLIFE COMEDY THEATRE OTHER }
  enum EventStatus { DRAFT PUBLISHED ENDED }
  enum PaymentStatus { PENDING COMPLETED FAILED }
  enum FontFamily { MODERN ELEGANT BOLD PLAYFUL }
  enum LayoutType { SINGLE TWO_COLUMN CARD MINIMAL }
  enum GradientDirection { TO_R TO_BR TO_B TO_BL }
  enum SubscriptionStatus { PENDING CONFIRMED UNSUBSCRIBED }
  enum SubscriptionSource { FORM IMPORT ADMIN API }

  type Category { type: [EventCategoryType!]!, description: String! }
  type Coordinates { lat: Float!, lng: Float! }
  type Location { venue: String!, address: String!, city: String!, coordinates: Coordinates }
  type Organizer { name: String!, email: String!, phone: String }
  type EventTheme { 
    primaryColor: String!, 
    secondaryColor: String!, 
    accentColor: String!, 
    textColor: String!, 
    fontFamily: FontFamily!, 
    layout: LayoutType!, 
    gradientEnabled: Boolean!,
    gradientDirection: GradientDirection! 
    backgroundColor: String!
  }
  type TicketTier { id: ID!, name: String!, price: Float!, currency: String!, quantity: Int!, description: String, soldCount: Int!, available: Boolean! }
  type EventImage { banner: String, gallery: [String!] }
  type EventFeatures { showGallery: Boolean!, allowGuestUploads: Boolean!, showChat: Boolean!, showCollaborators: Boolean! }
  type Collaborator { name: String!, type: String!, avatar: String, description: String }
  type Buyer { name: String!, email: String!, phone: String! }
  type Purchase { id: ID!, eventId: ID!, ticketTierId: ID!, quantity: Int!, totalAmount: Float!, buyer: Buyer!, paymentStatus: PaymentStatus!, purchasedAt: DateTime! }

  type Event {
    id: ID!
    slug: String
    title: String!
    description: String!
    startDate: String!
    startTime: String!
    endDate: String!
    endTime: String!
    is_featured: Boolean!
    cover_image: String
    primary_color: String
    secondary_color: String
    status: EventStatus!
    createdAt: DateTime
    updatedAt: DateTime
    category: Category!
    location: Location!
    organizer: Organizer
    theme: EventTheme
    ticketTiers: [TicketTier!]
    images: EventImage
    features: EventFeatures
    collaborators: [Collaborator!]
  }

  type User { id: ID!, name: String, email: String!, image: String }
  type AuthPayload { token: String!, user: User! }

  type MailSubscription {
    id: ID!
    email: String!
    name: String
    status: SubscriptionStatus!
    token: String
    subscribedAt: DateTime!
    verifiedAt: DateTime
    unsubscribedAt: DateTime
    preferences: JSON
    source: SubscriptionSource
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CategoryInput { type: [EventCategoryType!]!, description: String! }
  input CoordinatesInput { lat: Float!, lng: Float! }
  input LocationInput { venue: String!, address: String!, city: String!, coordinates: CoordinatesInput }
  input OrganizerInput { name: String!, email: String!, phone: String }
  input EventThemeInput { primaryColor: String!, secondaryColor: String!, accentColor: String!, textColor: String!, fontFamily: FontFamily!, layout: LayoutType!, gradientEnabled: Boolean!, gradientDirection: GradientDirection! }
  input TicketTierInput { name: String!, price: Float!, currency: String!, quantity: Int!, description: String }
  input EventImageInput { banner: String, gallery: [String!] }
  input EventFeaturesInput { showGallery: Boolean!, allowGuestUploads: Boolean!, showChat: Boolean!, showCollaborators: Boolean! }
  input CollaboratorInput { name: String!, type: String!, logo: String }
  input BuyerInput { name: String!, email: String!, phone: String! }

  input CreateEventInput {
    title: String!, description: String!, startDate: String!, startTime: String!, endDate: String!, endTime: String!,
    category: CategoryInput!, is_featured: Boolean, location: LocationInput!, organizer: OrganizerInput!, theme: EventThemeInput,
    ticketTiers: [TicketTierInput!], images: EventImageInput, features: EventFeaturesInput, collaborators: [CollaboratorInput!], status: EventStatus
  }
  input UpdateEventInput {
    title: String, description: String, startDate: String, startTime: String, endDate: String, endTime: String,
    category: CategoryInput, is_featured: Boolean, location: LocationInput, organizer: OrganizerInput, theme: EventThemeInput,
    ticketTiers: [TicketTierInput!], images: EventImageInput, features: EventFeaturesInput, collaborators: [CollaboratorInput!], status: EventStatus
  }
  input CreatePurchaseInput { eventId: ID!, ticketTierId: ID!, quantity: Int!, buyer: BuyerInput! }

  input RegisterInput { name: String!, email: String!, password: String! }
  input LoginInput { email: String!, password: String! }

  input SubscribeInput { email: String!, name: String, preferences: JSON, source: SubscriptionSource }
  input ConfirmSubscriptionInput { token: String! }
  input UnsubscribeInput { email: String! }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
    eventBySlug(slug: String!): Event
    featuredEvents: [Event!]!
    eventsByCategory(category: EventCategoryType!): [Event!]!
    searchEvents(searchTerm: String!): [Event!]!
    me: User
    subscriptions: [MailSubscription!]!
    subscriptionByEmail(email: String!): MailSubscription
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event!
    updateEvent(id: ID!, input: UpdateEventInput!): Event!
    deleteEvent(id: ID!): Boolean!
    createPurchase(input: CreatePurchaseInput!): Purchase!
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    subscribe(input: SubscribeInput!): MailSubscription!
    confirmSubscription(input: ConfirmSubscriptionInput!): MailSubscription
    unsubscribe(input: UnsubscribeInput!): MailSubscription!
  }
`;

export default typeDefs;