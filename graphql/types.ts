import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type GetEventsPagedQueryVariables = Exact<{
  filter?: InputMaybe<EventsFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  orderBy?: InputMaybe<Array<EventsOrderByInput> | EventsOrderByInput>;
}>;


export type GetEventsPagedQuery = { eventsCount: number, events: Array<{ id: string, slug?: string | null, title: string, status: EventStatus, updatedAt?: any | null }> };

export type GetEventsCountQueryVariables = Exact<{
  filter?: InputMaybe<EventsFilterInput>;
}>;


export type GetEventsCountQuery = { eventsCount: number };

export type GetUsersRefineQueryVariables = Exact<{
  filter?: InputMaybe<UsersFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  orderBy?: InputMaybe<Array<UsersOrderByInput> | UsersOrderByInput>;
}>;


export type GetUsersRefineQuery = { usersCount: number, users: Array<{ id: string, name?: string | null, email: string, createdAt: any }> };

export type GetMyEventsPagedQueryVariables = Exact<{
  filter?: InputMaybe<EventsFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  orderBy?: InputMaybe<Array<EventsOrderByInput> | EventsOrderByInput>;
}>;


export type GetMyEventsPagedQuery = { eventsCount: number, events: Array<{ id: string, title: string, status: EventStatus, startDate: string, images?: { banner?: string | null } | null, theme?: { primaryColor: string, secondaryColor: string } | null, location?: { venue: string, city: string } | null, ticketTiers?: Array<{ soldCount: number }> | null }> };

export type CreatePageMutationVariables = Exact<{
  input: CreatePageInput;
}>;


export type CreatePageMutation = { createPage: { id: string, slug: string, name: string, published: boolean, sections: Array<{ id: string, builderId: string, type: SectionType, order: number }> } };

export type PublishPageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PublishPageMutation = { publishPage: { id: string, slug: string, published: boolean, publishedAt?: any | null } };

export type UpdatePageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdatePageInput;
}>;


export type UpdatePageMutation = { updatePage: { id: string, slug: string, name: string, published: boolean, sections: Array<{ id: string, builderId: string, type: SectionType, order: number }> } };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { createEvent: { id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, categories?: Array<{ id: string, description: string } | null> | null, location?: { venue: string, address: string, city: string, lat?: number | null, lng?: number | null } | null, organizer?: { name: string, email: string, phone?: string | null } | null, theme?: { primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { banner?: string | null, gallery?: Array<string> | null } | null, features?: { showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ name: string, type: string, avatar?: string | null }> | null } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEventMutation = { deleteEvent: boolean };

export type GetCategoriesQueryVariables = Exact<{
  filter?: InputMaybe<CategoriesFilterInput>;
}>;


export type GetCategoriesQuery = { categories: Array<{ id: string, name: string, parentId?: string | null }> };

export type GetEventByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEventByIdQuery = { event?: { id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, categories?: Array<{ id: string, description: string } | null> | null, location?: { venue: string, address: string, city: string, lat?: number | null, lng?: number | null } | null, organizer?: { name: string, email: string, phone?: string | null } | null, theme?: { primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ id: string, name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { banner?: string | null, gallery?: Array<string> | null } | null, features?: { showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ name: string, type: string, avatar?: string | null }> | null } | null };

export type GetEventBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetEventBySlugQuery = { eventBySlug?: { id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, categories?: Array<{ id: string, description: string } | null> | null, location?: { venue: string, address: string, city: string, lat?: number | null, lng?: number | null } | null, organizer?: { name: string, email: string, phone?: string | null } | null, theme?: { primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { banner?: string | null, gallery?: Array<string> | null } | null, features?: { showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ name: string, type: string, avatar?: string | null }> | null } | null };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { events: Array<{ id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, userId?: string | null, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, categories?: Array<{ id: string, description: string, name: string } | null> | null, location?: { venue: string, address: string, city: string, lat?: number | null, lng?: number | null } | null, organizer?: { name: string, email: string, phone?: string | null } | null, theme?: { primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ id: string, name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { banner?: string | null, gallery?: Array<string> | null } | null, features?: { showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ name: string, type: string, avatar?: string | null }> | null, user?: { id: string, name?: string | null, email: string, image?: string | null, createdAt: any, updatedAt: any } | null }> };

export type GetPageQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPageQuery = { page?: { id: string, slug: string, name: string, published: boolean, publishedAt?: any | null, createdAt: any, updatedAt: any } | null };

export type GetPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPagesQuery = { pages: Array<{ id: string, slug: string, name: string, published: boolean, publishedAt?: any | null, createdAt: any, updatedAt: any }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { users: Array<{ id: string, name?: string | null, email: string, image?: string | null, createdAt: any, updatedAt: any }> };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { updateEvent: { id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, categories?: Array<{ id: string, description: string } | null> | null, location?: { venue: string, address: string, city: string, lat?: number | null, lng?: number | null } | null, organizer?: { name: string, email: string, phone?: string | null } | null, theme?: { primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { banner?: string | null, gallery?: Array<string> | null } | null, features?: { showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ name: string, type: string, avatar?: string | null }> | null } };

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AuthPayload = {
  token: Scalars['String']['output'];
  user: User;
};

export type Buyer = {
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type BuyerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CategoriesFilterInput = {
  IDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
};

export type Collaborator = {
  avatar?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CollaboratorInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type ConfirmSubscriptionInput = {
  token: Scalars['String']['input'];
};

export type CreateEventInput = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  collaborators?: InputMaybe<Array<CollaboratorInput>>;
  cover_image?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  features?: InputMaybe<EventFeaturesInput>;
  images?: InputMaybe<EventImageInput>;
  is_featured?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<LocationInput>;
  organizer: OrganizerInput;
  primary_color?: InputMaybe<Scalars['String']['input']>;
  secondary_color?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  status?: InputMaybe<EventStatus>;
  theme?: InputMaybe<EventThemeInput>;
  ticketTiers?: InputMaybe<Array<TicketTierInput>>;
  title: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreatePageInput = {
  metadata: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  sectionData?: InputMaybe<Scalars['JSON']['input']>;
  sections: Array<PageSectionInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['JSON']['input']>;
};

export type CreatePurchaseInput = {
  buyer: BuyerInput;
  eventId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  ticketTierId: Scalars['ID']['input'];
};

export type Customer = {
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orders: Array<Order>;
  phone?: Maybe<Scalars['String']['output']>;
  tickets: Array<Ticket>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type CustomersFilterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CustomersOrderByInput = {
  direction: OrderDirection;
  field: CustomersOrderField;
};

export enum CustomersOrderField {
  CreatedAt = 'CREATED_AT',
  Email = 'EMAIL',
  Name = 'NAME'
}

export type Event = {
  categories?: Maybe<Array<Maybe<Category>>>;
  collaborators?: Maybe<Array<Collaborator>>;
  cover_image?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  endDate: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  features?: Maybe<EventFeatures>;
  featuresId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<EventImage>;
  imagesId?: Maybe<Scalars['ID']['output']>;
  is_featured: Scalars['Boolean']['output'];
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['ID']['output']>;
  organizer?: Maybe<Organizer>;
  organizerId?: Maybe<Scalars['ID']['output']>;
  primary_color?: Maybe<Scalars['String']['output']>;
  secondary_color?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
  status: EventStatus;
  theme?: Maybe<EventTheme>;
  themeId?: Maybe<Scalars['ID']['output']>;
  ticketTiers?: Maybe<Array<TicketTier>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export enum EventCategoryType {
  Arts = 'ARTS',
  Comedy = 'COMEDY',
  Conference = 'CONFERENCE',
  Festival = 'FESTIVAL',
  Music = 'MUSIC',
  Nightlife = 'NIGHTLIFE',
  Other = 'OTHER',
  Sports = 'SPORTS',
  Theatre = 'THEATRE'
}

export type EventFeatures = {
  allowGuestUploads: Scalars['Boolean']['output'];
  showChat: Scalars['Boolean']['output'];
  showCollaborators: Scalars['Boolean']['output'];
  showGallery: Scalars['Boolean']['output'];
};

export type EventFeaturesInput = {
  allowGuestUploads: Scalars['Boolean']['input'];
  showChat: Scalars['Boolean']['input'];
  showCollaborators: Scalars['Boolean']['input'];
  showGallery: Scalars['Boolean']['input'];
};

export type EventImage = {
  banner?: Maybe<Scalars['String']['output']>;
  gallery?: Maybe<Array<Scalars['String']['output']>>;
};

export type EventImageInput = {
  banner?: InputMaybe<Scalars['String']['input']>;
  gallery?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum EventStatus {
  Draft = 'DRAFT',
  Ended = 'ENDED',
  Published = 'PUBLISHED'
}

export type EventTheme = {
  accentColor: Scalars['String']['output'];
  backgroundColor: Scalars['String']['output'];
  fontFamily: FontFamily;
  gradientDirection: GradientDirection;
  gradientEnabled: Scalars['Boolean']['output'];
  layout: LayoutType;
  primaryColor: Scalars['String']['output'];
  secondaryColor: Scalars['String']['output'];
  textColor: Scalars['String']['output'];
};

export type EventThemeInput = {
  accentColor: Scalars['String']['input'];
  fontFamily: FontFamily;
  gradientDirection: GradientDirection;
  gradientEnabled: Scalars['Boolean']['input'];
  layout: LayoutType;
  primaryColor: Scalars['String']['input'];
  secondaryColor: Scalars['String']['input'];
  textColor: Scalars['String']['input'];
};

export type EventsFilterInput = {
  category?: InputMaybe<EventCategoryType>;
  city?: InputMaybe<Scalars['String']['input']>;
  fromDate?: InputMaybe<Scalars['String']['input']>;
  is_featured?: InputMaybe<Scalars['Boolean']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
  toDate?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  venue?: InputMaybe<Scalars['String']['input']>;
};

export type EventsOrderByInput = {
  direction: OrderDirection;
  field: EventsOrderField;
};

export enum EventsOrderField {
  CreatedAt = 'CREATED_AT',
  EndDate = 'END_DATE',
  Featured = 'FEATURED',
  StartDate = 'START_DATE',
  Status = 'STATUS',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT'
}

export enum FontFamily {
  Bold = 'BOLD',
  Elegant = 'ELEGANT',
  Modern = 'MODERN',
  Playful = 'PLAYFUL'
}

export enum GradientDirection {
  ToB = 'TO_B',
  ToBl = 'TO_BL',
  ToBr = 'TO_BR',
  ToR = 'TO_R'
}

export enum LayoutType {
  Card = 'CARD',
  Minimal = 'MINIMAL',
  Single = 'SINGLE',
  TwoColumn = 'TWO_COLUMN'
}

export type Location = {
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
  venue: Scalars['String']['output'];
};

export type LocationInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
  venue: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MailSubscription = {
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  preferences?: Maybe<Scalars['JSON']['output']>;
  source?: Maybe<SubscriptionSource>;
  status: SubscriptionStatus;
  subscribedAt: Scalars['DateTime']['output'];
  token?: Maybe<Scalars['String']['output']>;
  unsubscribedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  verifiedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  confirmSubscription?: Maybe<MailSubscription>;
  createEvent: Event;
  createPage: Page;
  createPurchase: Purchase;
  deleteEvent: Scalars['Boolean']['output'];
  deletePage: Scalars['Boolean']['output'];
  login: AuthPayload;
  publishPage: Page;
  register: AuthPayload;
  subscribe: MailSubscription;
  unsubscribe: MailSubscription;
  updateEvent: Event;
  updatePage: Page;
};


export type MutationConfirmSubscriptionArgs = {
  input: ConfirmSubscriptionInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreatePageArgs = {
  input: CreatePageInput;
};


export type MutationCreatePurchaseArgs = {
  input: CreatePurchaseInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPublishPageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSubscribeArgs = {
  input: SubscribeInput;
};


export type MutationUnsubscribeArgs = {
  input: UnsubscribeInput;
};


export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEventInput;
};


export type MutationUpdatePageArgs = {
  id: Scalars['ID']['input'];
  input: UpdatePageInput;
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  customer: Customer;
  customerId: Scalars['ID']['output'];
  event: Event;
  eventId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tickets: Array<Ticket>;
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OrdersFilterInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrdersOrderByInput = {
  direction: OrderDirection;
  field: OrdersOrderField;
};

export enum OrdersOrderField {
  CreatedAt = 'CREATED_AT',
  Number = 'NUMBER',
  Status = 'STATUS',
  Total = 'TOTAL'
}

export type Organizer = {
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type OrganizerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Page = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadata: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  sectionData?: Maybe<Scalars['JSON']['output']>;
  sections: Array<PageSection>;
  slug: Scalars['String']['output'];
  template?: Maybe<Scalars['JSON']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PageSection = {
  builderId: Scalars['String']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  type: SectionType;
};

export type PageSectionInput = {
  builderId: Scalars['String']['input'];
  data: Scalars['JSON']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  type: SectionType;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum PaymentStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

export type Purchase = {
  buyer: Buyer;
  eventId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  paymentStatus: PaymentStatus;
  purchasedAt: Scalars['DateTime']['output'];
  quantity: Scalars['Int']['output'];
  ticketTierId: Scalars['ID']['output'];
  totalAmount: Scalars['Float']['output'];
};

export type Query = {
  categories: Array<Category>;
  category?: Maybe<Category>;
  customer?: Maybe<Customer>;
  customers: Array<Customer>;
  customersCount: Scalars['Int']['output'];
  event?: Maybe<Event>;
  eventBySlug?: Maybe<Event>;
  events: Array<Event>;
  eventsByCategory: Array<Event>;
  eventsCount: Scalars['Int']['output'];
  featuredEvents: Array<Event>;
  me?: Maybe<User>;
  order?: Maybe<Order>;
  orders: Array<Order>;
  ordersCount: Scalars['Int']['output'];
  page?: Maybe<Page>;
  pageBySlug?: Maybe<Page>;
  pages: Array<Page>;
  pagesByEvent: Array<Page>;
  searchEvents: Array<Event>;
  subscriptionByEmail?: Maybe<MailSubscription>;
  subscriptions: Array<MailSubscription>;
  ticket?: Maybe<Ticket>;
  tickets: Array<Ticket>;
  ticketsCount: Scalars['Int']['output'];
  users: Array<User>;
  usersCount: Scalars['Int']['output'];
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoriesFilterInput>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCustomerArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCustomersArgs = {
  filter?: InputMaybe<CustomersFilterInput>;
  orderBy?: InputMaybe<Array<CustomersOrderByInput>>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryCustomersCountArgs = {
  filter?: InputMaybe<CustomersFilterInput>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<EventsFilterInput>;
  orderBy?: InputMaybe<Array<EventsOrderByInput>>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryEventsByCategoryArgs = {
  categoryId: Scalars['ID']['input'];
};


export type QueryEventsCountArgs = {
  filter?: InputMaybe<EventsFilterInput>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  filter?: InputMaybe<OrdersFilterInput>;
  orderBy?: InputMaybe<Array<OrdersOrderByInput>>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryOrdersCountArgs = {
  filter?: InputMaybe<OrdersFilterInput>;
};


export type QueryPageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPageBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPagesByEventArgs = {
  eventId: Scalars['ID']['input'];
};


export type QuerySearchEventsArgs = {
  searchTerm: Scalars['String']['input'];
};


export type QuerySubscriptionByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryTicketArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryTicketsArgs = {
  filter?: InputMaybe<TicketsFilterInput>;
  orderBy?: InputMaybe<Array<TicketsOrderByInput>>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryTicketsCountArgs = {
  filter?: InputMaybe<TicketsFilterInput>;
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UsersFilterInput>;
  orderBy?: InputMaybe<Array<UsersOrderByInput>>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryUsersCountArgs = {
  filter?: InputMaybe<UsersFilterInput>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum SectionType {
  About = 'ABOUT',
  Contact = 'CONTACT',
  Gallery = 'GALLERY',
  Hero = 'HERO',
  Pricing = 'PRICING',
  Schedule = 'SCHEDULE'
}

export type SubscribeInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  preferences?: InputMaybe<Scalars['JSON']['input']>;
  source?: InputMaybe<SubscriptionSource>;
};

export enum SubscriptionSource {
  Admin = 'ADMIN',
  Api = 'API',
  Form = 'FORM',
  Import = 'IMPORT'
}

export enum SubscriptionStatus {
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Unsubscribed = 'UNSUBSCRIBED'
}

export type Ticket = {
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer: Customer;
  customerId: Scalars['ID']['output'];
  event: Event;
  eventId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['ID']['output']>;
  status: Scalars['String']['output'];
  ticketTier: TicketTier;
  ticketTierId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TicketTier = {
  available: Scalars['Boolean']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  quantity: Scalars['Int']['output'];
  soldCount: Scalars['Int']['output'];
};

export type TicketTierInput = {
  currency: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  quantity: Scalars['Int']['input'];
};

export type TicketsFilterInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  ticketTierId?: InputMaybe<Scalars['ID']['input']>;
};

export type TicketsOrderByInput = {
  direction: OrderDirection;
  field: TicketsOrderField;
};

export enum TicketsOrderField {
  Code = 'CODE',
  CreatedAt = 'CREATED_AT',
  Status = 'STATUS'
}

export type UnsubscribeInput = {
  email: Scalars['String']['input'];
};

export type UpdateEventInput = {
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  collaborators?: InputMaybe<Array<CollaboratorInput>>;
  cover_image?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<EventFeaturesInput>;
  images?: InputMaybe<EventImageInput>;
  is_featured?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<LocationInput>;
  organizer?: InputMaybe<OrganizerInput>;
  primary_color?: InputMaybe<Scalars['String']['input']>;
  secondary_color?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
  theme?: InputMaybe<EventThemeInput>;
  ticketTiers?: InputMaybe<Array<TicketTierInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePageInput = {
  metadata: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  sectionData?: InputMaybe<Scalars['JSON']['input']>;
  sections?: InputMaybe<Array<PageSectionInput>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['JSON']['input']>;
};

export type User = {
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UsersFilterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type UsersOrderByInput = {
  direction: OrderDirection;
  field: UsersOrderField;
};

export enum UsersOrderField {
  CreatedAt = 'CREATED_AT',
  Email = 'EMAIL',
  Name = 'NAME'
}


export const GetEventsPagedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventsPaged"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventsFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventsOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}]}}]} as unknown as DocumentNode<GetEventsPagedQuery, GetEventsPagedQueryVariables>;
export const GetEventsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}]}}]} as unknown as DocumentNode<GetEventsCountQuery, GetEventsCountQueryVariables>;
export const GetUsersRefineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersRefine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UsersFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UsersOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usersCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}]}}]} as unknown as DocumentNode<GetUsersRefineQuery, GetUsersRefineQueryVariables>;
export const GetMyEventsPagedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyEventsPaged"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventsFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventsOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"soldCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}]}]}}]} as unknown as DocumentNode<GetMyEventsPagedQuery, GetMyEventsPagedQueryVariables>;
export const CreatePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"builderId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePageMutation, CreatePageMutationVariables>;
export const PublishPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}}]}}]}}]} as unknown as DocumentNode<PublishPageMutation, PublishPageMutationVariables>;
export const UpdatePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"builderId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePageMutation, UpdatePageMutationVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const DeleteEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoriesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetEventByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const GetEventBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetEventBySlugQuery, GetEventBySlugQueryVariables>;
export const GetEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const GetPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetPageQuery, GetPageQueryVariables>;
export const GetPagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetPagesQuery, GetPagesQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const UpdateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;