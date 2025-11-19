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
  enum SectionType { HERO PRICING GALLERY ABOUT SCHEDULE CONTACT }

  type Location { venue: String!, address: String!, city: String!, lat: Float, lng: Float }
  type Category { id: ID!, type: EventCategoryType!, description: String! }
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
  type TicketTier { name: String!, price: Float!, currency: String!, quantity: Int!, description: String, soldCount: Int!, available: Boolean! }
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
    categories: [Category]
    location: Location
    organizer: Organizer
    theme: EventTheme
    ticketTiers: [TicketTier!]
    images: EventImage
    features: EventFeatures
    collaborators: [Collaborator!]
    userId: ID
    user: User
    locationId: ID
    organizerId: ID
    themeId: ID
    imagesId: ID
    featuresId: ID
  }

  type User { id: ID!, name: String, email: String!, image: String, createdAt: DateTime!, updatedAt: DateTime! }
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

  type PageSection {
    id: ID!
    builderId: String!
    type: SectionType!
    order: Int!
    data: JSON!
  }

  type Page {
    id: ID!
    slug: String!
    name: String!
    metadata: JSON!
    template: JSON
    sectionData: JSON
    published: Boolean!
    publishedAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    eventId: ID
    sections: [PageSection!]!
  }

  input LocationInput { venue: String!, address: String!, city: String!, lat: Float, lng: Float }
  input OrganizerInput { name: String!, email: String!, phone: String }
  input EventThemeInput { primaryColor: String!, secondaryColor: String!, accentColor: String!, textColor: String!, fontFamily: FontFamily!, layout: LayoutType!, gradientEnabled: Boolean!, gradientDirection: GradientDirection! }
  input TicketTierInput { name: String!, price: Float!, currency: String!, quantity: Int!, description: String }
  input EventImageInput { banner: String, gallery: [String!] }
  input EventFeaturesInput { showGallery: Boolean!, allowGuestUploads: Boolean!, showChat: Boolean!, showCollaborators: Boolean! }
  input CollaboratorInput { name: String!, type: String!, logo: String }
  input BuyerInput { name: String!, email: String!, phone: String! }

  input EventsFilterInput {
    category: EventCategoryType
    status: EventStatus
    is_featured: Boolean
    userId: ID
    city: String
    venue: String
    fromDate: String
    toDate: String
    searchTerm: String
  }

  input CreateEventInput {
    title: String!, description: String!, startDate: String!, startTime: String!, endDate: String!, endTime: String!,
    categoryTypes: [EventCategoryType!]!, categoryIds: [ID!], is_featured: Boolean, location: LocationInput, organizer: OrganizerInput!, theme: EventThemeInput,
    ticketTiers: [TicketTierInput!], images: EventImageInput, features: EventFeaturesInput, collaborators: [CollaboratorInput!], status: EventStatus,
    userId: ID
  }
  input UpdateEventInput {
    title: String, description: String, startDate: String, startTime: String, endDate: String, endTime: String,
    categoryTypes: [EventCategoryType!], categoryIds: [ID!], is_featured: Boolean, location: LocationInput, organizer: OrganizerInput, theme: EventThemeInput,
    ticketTiers: [TicketTierInput!], images: EventImageInput, features: EventFeaturesInput, collaborators: [CollaboratorInput!], status: EventStatus,
    userId: ID
  }
  input CreatePurchaseInput { eventId: ID!, ticketTierId: ID!, quantity: Int!, buyer: BuyerInput! }

  input RegisterInput { name: String!, email: String!, password: String! }
  input LoginInput { email: String!, password: String! }

  input SubscribeInput { email: String!, name: String, preferences: JSON, source: SubscriptionSource }
  input ConfirmSubscriptionInput { token: String! }
  input UnsubscribeInput { email: String! }

  input PageSectionInput {
    builderId: String!
    type: SectionType!
    order: Int
    data: JSON!
  }

  input CreatePageInput {
    name: String!
    metadata: JSON!
    template: JSON
    sectionData: JSON
    slug: String
    eventId: ID
    sections: [PageSectionInput!]!
  }

  input UpdatePageInput {
    name: String
    metadata: JSON
    template: JSON
    sectionData: JSON
    slug: String
    sections: [PageSectionInput!]
    published: Boolean
  }

  type Query {
    events(filter: EventsFilterInput): [Event!]!
    event(id: ID!): Event
    eventBySlug(slug: String!): Event
    featuredEvents: [Event!]!
    eventsByCategory(category: EventCategoryType!): [Event!]!
    searchEvents(searchTerm: String!): [Event!]!
    me: User
    users: [User!]!
    subscriptions: [MailSubscription!]!
    subscriptionByEmail(email: String!): MailSubscription
    pages: [Page!]!
    page(id: ID!): Page
    pageBySlug(slug: String!): Page
    pagesByEvent(eventId: ID!): [Page!]!
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
    createPage(input: CreatePageInput!): Page!
    updatePage(id: ID!, input: UpdatePageInput!): Page!
    deletePage(id: ID!): Boolean!
    publishPage(id: ID!): Page!
  }
`;

export default typeDefs;