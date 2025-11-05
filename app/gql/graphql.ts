/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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

export type Buyer = {
  __typename?: 'Buyer';
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type BuyerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  description: Scalars['String']['output'];
  type: Array<EventCategoryType>;
};

export type CategoryInput = {
  description: Scalars['String']['input'];
  type: Array<EventCategoryType>;
};

export type Collaborator = {
  __typename?: 'Collaborator';
  avatar?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type CollaboratorInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Coordinates = {
  __typename?: 'Coordinates';
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type CoordinatesInput = {
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
};

export type CreateEventInput = {
  category: CategoryInput;
  collaborators?: InputMaybe<Array<CollaboratorInput>>;
  description: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  features?: InputMaybe<EventFeaturesInput>;
  images?: InputMaybe<EventImageInput>;
  is_featured?: InputMaybe<Scalars['Boolean']['input']>;
  location: LocationInput;
  organizer: OrganizerInput;
  startDate: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  status?: InputMaybe<EventStatus>;
  theme?: InputMaybe<EventThemeInput>;
  ticketTiers?: InputMaybe<Array<TicketTierInput>>;
  title: Scalars['String']['input'];
};

export type CreatePurchaseInput = {
  buyer: BuyerInput;
  eventId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  ticketTierId: Scalars['ID']['input'];
};

export type Event = {
  __typename?: 'Event';
  category: Category;
  collaborators?: Maybe<Array<Collaborator>>;
  cover_image?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  endDate: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  features?: Maybe<EventFeatures>;
  id: Scalars['ID']['output'];
  images?: Maybe<EventImage>;
  is_featured: Scalars['Boolean']['output'];
  location: Location;
  organizer?: Maybe<Organizer>;
  primary_color?: Maybe<Scalars['String']['output']>;
  secondary_color?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
  status: EventStatus;
  theme?: Maybe<EventTheme>;
  ticketTiers?: Maybe<Array<TicketTier>>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  __typename?: 'EventFeatures';
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
  __typename?: 'EventImage';
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
  __typename?: 'EventTheme';
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
  backgroundColor: Scalars['String']['input'];
  fontFamily: FontFamily;
  gradientDirection: GradientDirection;
  gradientEnabled: Scalars['Boolean']['input'];
  layout: LayoutType;
  primaryColor: Scalars['String']['input'];
  secondaryColor: Scalars['String']['input'];
  textColor: Scalars['String']['input'];
};

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
  __typename?: 'Location';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  coordinates?: Maybe<Coordinates>;
  venue: Scalars['String']['output'];
};

export type LocationInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  coordinates?: InputMaybe<CoordinatesInput>;
  venue: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: Event;
  createPurchase: Purchase;
  deleteEvent: Scalars['Boolean']['output'];
  updateEvent: Event;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreatePurchaseArgs = {
  input: CreatePurchaseInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEventInput;
};

export type Organizer = {
  __typename?: 'Organizer';
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type OrganizerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export enum PaymentStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

export type Purchase = {
  __typename?: 'Purchase';
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
  __typename?: 'Query';
  event?: Maybe<Event>;
  eventBySlug?: Maybe<Event>;
  events: Array<Event>;
  eventsByCategory: Array<Event>;
  featuredEvents: Array<Event>;
  searchEvents: Array<Event>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryEventsByCategoryArgs = {
  category: EventCategoryType;
};


export type QuerySearchEventsArgs = {
  searchTerm: Scalars['String']['input'];
};

export type TicketTier = {
  __typename?: 'TicketTier';
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

export type UpdateEventInput = {
  category?: InputMaybe<CategoryInput>;
  collaborators?: InputMaybe<Array<CollaboratorInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<EventFeaturesInput>;
  images?: InputMaybe<EventImageInput>;
  is_featured?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<LocationInput>;
  organizer?: InputMaybe<OrganizerInput>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
  theme?: InputMaybe<EventThemeInput>;
  ticketTiers?: InputMaybe<Array<TicketTierInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, category: { __typename?: 'Category', type: Array<EventCategoryType>, description: string }, location: { __typename?: 'Location', venue: string, address: string, city: string, coordinates?: { __typename?: 'Coordinates', lat: number, lng: number } | null }, organizer?: { __typename?: 'Organizer', name: string, email: string, phone?: string | null } | null, theme?: { __typename?: 'EventTheme', primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ __typename?: 'TicketTier', id: string, name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { __typename?: 'EventImage', banner?: string | null, gallery?: Array<string> | null } | null, features?: { __typename?: 'EventFeatures', showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ __typename?: 'Collaborator', name: string, type: string, logo?: string | null }> | null }> };

export type GetEventByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEventByIdQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, category: { __typename?: 'Category', type: Array<EventCategoryType>, description: string }, location: { __typename?: 'Location', venue: string, address: string, city: string, coordinates?: { __typename?: 'Coordinates', lat: number, lng: number } | null }, organizer?: { __typename?: 'Organizer', name: string, email: string, phone?: string | null } | null, theme?: { __typename?: 'EventTheme', primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ __typename?: 'TicketTier', id: string, name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { __typename?: 'EventImage', banner?: string | null, gallery?: Array<string> | null } | null, features?: { __typename?: 'EventFeatures', showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ __typename?: 'Collaborator', name: string, type: string, logo?: string | null }> | null } | null };

export type GetEventBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetEventBySlugQuery = { __typename?: 'Query', eventBySlug?: { __typename?: 'Event', id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, category: { __typename?: 'Category', type: Array<EventCategoryType>, description: string }, location: { __typename?: 'Location', venue: string, address: string, city: string, coordinates?: { __typename?: 'Coordinates', lat: number, lng: number } | null }, organizer?: { __typename?: 'Organizer', name: string, email: string, phone?: string | null } | null, theme?: { __typename?: 'EventTheme', primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ __typename?: 'TicketTier', id: string, name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { __typename?: 'EventImage', banner?: string | null, gallery?: Array<string> | null } | null, features?: { __typename?: 'EventFeatures', showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ __typename?: 'Collaborator', name: string, type: string, logo?: string | null }> | null } | null };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, category: { __typename?: 'Category', type: Array<EventCategoryType>, description: string }, location: { __typename?: 'Location', venue: string, address: string, city: string, coordinates?: { __typename?: 'Coordinates', lat: number, lng: number } | null }, organizer?: { __typename?: 'Organizer', name: string, email: string, phone?: string | null } | null, theme?: { __typename?: 'EventTheme', primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ __typename?: 'TicketTier', id: string, name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { __typename?: 'EventImage', banner?: string | null, gallery?: Array<string> | null } | null, features?: { __typename?: 'EventFeatures', showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ __typename?: 'Collaborator', name: string, type: string, logo?: string | null }> | null } };

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', id: string, slug?: string | null, title: string, description: string, startDate: string, startTime: string, endDate: string, endTime: string, is_featured: boolean, status: EventStatus, createdAt?: any | null, updatedAt?: any | null, category: { __typename?: 'Category', type: Array<EventCategoryType>, description: string }, location: { __typename?: 'Location', venue: string, address: string, city: string, coordinates?: { __typename?: 'Coordinates', lat: number, lng: number } | null }, organizer?: { __typename?: 'Organizer', name: string, email: string, phone?: string | null } | null, theme?: { __typename?: 'EventTheme', primaryColor: string, secondaryColor: string, accentColor: string, backgroundColor: string, textColor: string, fontFamily: FontFamily, layout: LayoutType, gradientEnabled: boolean, gradientDirection: GradientDirection } | null, ticketTiers?: Array<{ __typename?: 'TicketTier', id: string, name: string, price: number, currency: string, quantity: number, soldCount: number, description?: string | null, available: boolean }> | null, images?: { __typename?: 'EventImage', banner?: string | null, gallery?: Array<string> | null } | null, features?: { __typename?: 'EventFeatures', showGallery: boolean, allowGuestUploads: boolean, showChat: boolean, showCollaborators: boolean } | null, collaborators?: Array<{ __typename?: 'Collaborator', name: string, type: string, logo?: string | null }> | null } };


export const GetEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const GetEventBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetEventBySlugQuery, GetEventBySlugQueryVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const UpdateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"organizer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"theme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"primaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryColor"}},{"kind":"Field","name":{"kind":"Name","value":"accentColor"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"textColor"}},{"kind":"Field","name":{"kind":"Name","value":"fontFamily"}},{"kind":"Field","name":{"kind":"Name","value":"layout"}},{"kind":"Field","name":{"kind":"Name","value":"gradientEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"gradientDirection"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ticketTiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"soldCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"available"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showGallery"}},{"kind":"Field","name":{"kind":"Name","value":"allowGuestUploads"}},{"kind":"Field","name":{"kind":"Name","value":"showChat"}},{"kind":"Field","name":{"kind":"Name","value":"showCollaborators"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collaborators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;