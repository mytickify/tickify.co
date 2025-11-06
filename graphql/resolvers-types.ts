import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  JSON: { input: object; output: object; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
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
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CollaboratorInput = {
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type ConfirmSubscriptionInput = {
  token: Scalars['String']['input'];
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

export type CreatePageInput = {
  eventId?: InputMaybe<Scalars['ID']['input']>;
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

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MailSubscription = {
  __typename?: 'MailSubscription';
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
  __typename?: 'Mutation';
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

export type Page = {
  __typename?: 'Page';
  createdAt: Scalars['DateTime']['output'];
  eventId?: Maybe<Scalars['ID']['output']>;
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
  __typename?: 'PageSection';
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
  me?: Maybe<User>;
  page?: Maybe<Page>;
  pageBySlug?: Maybe<Page>;
  pages: Array<Page>;
  pagesByEvent: Array<Page>;
  searchEvents: Array<Event>;
  subscriptionByEmail?: Maybe<MailSubscription>;
  subscriptions: Array<MailSubscription>;
  users: Array<User>;
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

export type UnsubscribeInput = {
  email: Scalars['String']['input'];
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

export type UpdatePageInput = {
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  sectionData?: InputMaybe<Scalars['JSON']['input']>;
  sections?: InputMaybe<Array<PageSectionInput>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['JSON']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Buyer: ResolverTypeWrapper<Buyer>;
  BuyerInput: BuyerInput;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  Collaborator: ResolverTypeWrapper<Collaborator>;
  CollaboratorInput: CollaboratorInput;
  ConfirmSubscriptionInput: ConfirmSubscriptionInput;
  Coordinates: ResolverTypeWrapper<Coordinates>;
  CoordinatesInput: CoordinatesInput;
  CreateEventInput: CreateEventInput;
  CreatePageInput: CreatePageInput;
  CreatePurchaseInput: CreatePurchaseInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Event: ResolverTypeWrapper<Event>;
  EventCategoryType: EventCategoryType;
  EventFeatures: ResolverTypeWrapper<EventFeatures>;
  EventFeaturesInput: EventFeaturesInput;
  EventImage: ResolverTypeWrapper<EventImage>;
  EventImageInput: EventImageInput;
  EventStatus: EventStatus;
  EventTheme: ResolverTypeWrapper<EventTheme>;
  EventThemeInput: EventThemeInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FontFamily: FontFamily;
  GradientDirection: GradientDirection;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LayoutType: LayoutType;
  Location: ResolverTypeWrapper<Location>;
  LocationInput: LocationInput;
  LoginInput: LoginInput;
  MailSubscription: ResolverTypeWrapper<MailSubscription>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Organizer: ResolverTypeWrapper<Organizer>;
  OrganizerInput: OrganizerInput;
  Page: ResolverTypeWrapper<Page>;
  PageSection: ResolverTypeWrapper<PageSection>;
  PageSectionInput: PageSectionInput;
  PaymentStatus: PaymentStatus;
  Purchase: ResolverTypeWrapper<Purchase>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RegisterInput: RegisterInput;
  SectionType: SectionType;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubscribeInput: SubscribeInput;
  SubscriptionSource: SubscriptionSource;
  SubscriptionStatus: SubscriptionStatus;
  TicketTier: ResolverTypeWrapper<TicketTier>;
  TicketTierInput: TicketTierInput;
  UnsubscribeInput: UnsubscribeInput;
  UpdateEventInput: UpdateEventInput;
  UpdatePageInput: UpdatePageInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Buyer: Buyer;
  BuyerInput: BuyerInput;
  Category: Category;
  CategoryInput: CategoryInput;
  Collaborator: Collaborator;
  CollaboratorInput: CollaboratorInput;
  ConfirmSubscriptionInput: ConfirmSubscriptionInput;
  Coordinates: Coordinates;
  CoordinatesInput: CoordinatesInput;
  CreateEventInput: CreateEventInput;
  CreatePageInput: CreatePageInput;
  CreatePurchaseInput: CreatePurchaseInput;
  DateTime: Scalars['DateTime']['output'];
  Event: Event;
  EventFeatures: EventFeatures;
  EventFeaturesInput: EventFeaturesInput;
  EventImage: EventImage;
  EventImageInput: EventImageInput;
  EventTheme: EventTheme;
  EventThemeInput: EventThemeInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Location: Location;
  LocationInput: LocationInput;
  LoginInput: LoginInput;
  MailSubscription: MailSubscription;
  Mutation: Record<PropertyKey, never>;
  Organizer: Organizer;
  OrganizerInput: OrganizerInput;
  Page: Page;
  PageSection: PageSection;
  PageSectionInput: PageSectionInput;
  Purchase: Purchase;
  Query: Record<PropertyKey, never>;
  RegisterInput: RegisterInput;
  String: Scalars['String']['output'];
  SubscribeInput: SubscribeInput;
  TicketTier: TicketTier;
  TicketTierInput: TicketTierInput;
  UnsubscribeInput: UnsubscribeInput;
  UpdateEventInput: UpdateEventInput;
  UpdatePageInput: UpdatePageInput;
  User: User;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type BuyerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Buyer'] = ResolversParentTypes['Buyer']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Array<ResolversTypes['EventCategoryType']>, ParentType, ContextType>;
};

export type CollaboratorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collaborator'] = ResolversParentTypes['Collaborator']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  collaborators?: Resolver<Maybe<Array<ResolversTypes['Collaborator']>>, ParentType, ContextType>;
  cover_image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  features?: Resolver<Maybe<ResolversTypes['EventFeatures']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Maybe<ResolversTypes['EventImage']>, ParentType, ContextType>;
  is_featured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  organizer?: Resolver<Maybe<ResolversTypes['Organizer']>, ParentType, ContextType>;
  primary_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secondary_color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EventStatus'], ParentType, ContextType>;
  theme?: Resolver<Maybe<ResolversTypes['EventTheme']>, ParentType, ContextType>;
  ticketTiers?: Resolver<Maybe<Array<ResolversTypes['TicketTier']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export type EventFeaturesResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventFeatures'] = ResolversParentTypes['EventFeatures']> = {
  allowGuestUploads?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showChat?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showCollaborators?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showGallery?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type EventImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventImage'] = ResolversParentTypes['EventImage']> = {
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gallery?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
};

export type EventThemeResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventTheme'] = ResolversParentTypes['EventTheme']> = {
  accentColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  backgroundColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fontFamily?: Resolver<ResolversTypes['FontFamily'], ParentType, ContextType>;
  gradientDirection?: Resolver<ResolversTypes['GradientDirection'], ParentType, ContextType>;
  gradientEnabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  layout?: Resolver<ResolversTypes['LayoutType'], ParentType, ContextType>;
  primaryColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  secondaryColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  textColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coordinates?: Resolver<Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  venue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MailSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MailSubscription'] = ResolversParentTypes['MailSubscription']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferences?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['SubscriptionSource']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SubscriptionStatus'], ParentType, ContextType>;
  subscribedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unsubscribedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  verifiedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  confirmSubscription?: Resolver<Maybe<ResolversTypes['MailSubscription']>, ParentType, ContextType, RequireFields<MutationConfirmSubscriptionArgs, 'input'>>;
  createEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  createPage?: Resolver<ResolversTypes['Page'], ParentType, ContextType, RequireFields<MutationCreatePageArgs, 'input'>>;
  createPurchase?: Resolver<ResolversTypes['Purchase'], ParentType, ContextType, RequireFields<MutationCreatePurchaseArgs, 'input'>>;
  deleteEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'id'>>;
  deletePage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePageArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  publishPage?: Resolver<ResolversTypes['Page'], ParentType, ContextType, RequireFields<MutationPublishPageArgs, 'id'>>;
  register?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  subscribe?: Resolver<ResolversTypes['MailSubscription'], ParentType, ContextType, RequireFields<MutationSubscribeArgs, 'input'>>;
  unsubscribe?: Resolver<ResolversTypes['MailSubscription'], ParentType, ContextType, RequireFields<MutationUnsubscribeArgs, 'input'>>;
  updateEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<MutationUpdateEventArgs, 'id' | 'input'>>;
  updatePage?: Resolver<ResolversTypes['Page'], ParentType, ContextType, RequireFields<MutationUpdatePageArgs, 'id' | 'input'>>;
};

export type OrganizerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organizer'] = ResolversParentTypes['Organizer']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  eventId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  publishedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  sectionData?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  sections?: Resolver<Array<ResolversTypes['PageSection']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  template?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type PageSectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageSection'] = ResolversParentTypes['PageSection']> = {
  builderId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SectionType'], ParentType, ContextType>;
};

export type PurchaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Purchase'] = ResolversParentTypes['Purchase']> = {
  buyer?: Resolver<ResolversTypes['Buyer'], ParentType, ContextType>;
  eventId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['PaymentStatus'], ParentType, ContextType>;
  purchasedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ticketTierId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventArgs, 'id'>>;
  eventBySlug?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventBySlugArgs, 'slug'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  eventsByCategory?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryEventsByCategoryArgs, 'category'>>;
  featuredEvents?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Page']>, ParentType, ContextType, RequireFields<QueryPageArgs, 'id'>>;
  pageBySlug?: Resolver<Maybe<ResolversTypes['Page']>, ParentType, ContextType, RequireFields<QueryPageBySlugArgs, 'slug'>>;
  pages?: Resolver<Array<ResolversTypes['Page']>, ParentType, ContextType>;
  pagesByEvent?: Resolver<Array<ResolversTypes['Page']>, ParentType, ContextType, RequireFields<QueryPagesByEventArgs, 'eventId'>>;
  searchEvents?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QuerySearchEventsArgs, 'searchTerm'>>;
  subscriptionByEmail?: Resolver<Maybe<ResolversTypes['MailSubscription']>, ParentType, ContextType, RequireFields<QuerySubscriptionByEmailArgs, 'email'>>;
  subscriptions?: Resolver<Array<ResolversTypes['MailSubscription']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type TicketTierResolvers<ContextType = any, ParentType extends ResolversParentTypes['TicketTier'] = ResolversParentTypes['TicketTier']> = {
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  soldCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Buyer?: BuyerResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Collaborator?: CollaboratorResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  EventFeatures?: EventFeaturesResolvers<ContextType>;
  EventImage?: EventImageResolvers<ContextType>;
  EventTheme?: EventThemeResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Location?: LocationResolvers<ContextType>;
  MailSubscription?: MailSubscriptionResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organizer?: OrganizerResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  PageSection?: PageSectionResolvers<ContextType>;
  Purchase?: PurchaseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TicketTier?: TicketTierResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

