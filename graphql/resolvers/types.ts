import * as Types from '../types';

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };


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
) => Types.Maybe<TTypes> | Promise<Types.Maybe<TTypes>>;

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
  AuthPayload: ResolverTypeWrapper<Types.AuthPayload>;
  Boolean: ResolverTypeWrapper<Types.Scalars['Boolean']['output']>;
  Buyer: ResolverTypeWrapper<Types.Buyer>;
  BuyerInput: Types.BuyerInput;
  Category: ResolverTypeWrapper<Types.Category>;
  CategoryInput: Types.CategoryInput;
  Collaborator: ResolverTypeWrapper<Types.Collaborator>;
  CollaboratorInput: Types.CollaboratorInput;
  ConfirmSubscriptionInput: Types.ConfirmSubscriptionInput;
  Coordinates: ResolverTypeWrapper<Types.Coordinates>;
  CoordinatesInput: Types.CoordinatesInput;
  CreateEventInput: Types.CreateEventInput;
  CreatePageInput: Types.CreatePageInput;
  CreatePurchaseInput: Types.CreatePurchaseInput;
  DateTime: ResolverTypeWrapper<Types.Scalars['DateTime']['output']>;
  Event: ResolverTypeWrapper<Types.Event>;
  EventCategoryType: Types.EventCategoryType;
  EventFeatures: ResolverTypeWrapper<Types.EventFeatures>;
  EventFeaturesInput: Types.EventFeaturesInput;
  EventImage: ResolverTypeWrapper<Types.EventImage>;
  EventImageInput: Types.EventImageInput;
  EventStatus: Types.EventStatus;
  EventTheme: ResolverTypeWrapper<Types.EventTheme>;
  EventThemeInput: Types.EventThemeInput;
  EventsFilterInput: Types.EventsFilterInput;
  Float: ResolverTypeWrapper<Types.Scalars['Float']['output']>;
  FontFamily: Types.FontFamily;
  GradientDirection: Types.GradientDirection;
  ID: ResolverTypeWrapper<Types.Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Types.Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Types.Scalars['JSON']['output']>;
  LayoutType: Types.LayoutType;
  Location: ResolverTypeWrapper<Types.Location>;
  LocationInput: Types.LocationInput;
  LoginInput: Types.LoginInput;
  MailSubscription: ResolverTypeWrapper<Types.MailSubscription>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Organizer: ResolverTypeWrapper<Types.Organizer>;
  OrganizerInput: Types.OrganizerInput;
  Page: ResolverTypeWrapper<Types.Page>;
  PageSection: ResolverTypeWrapper<Types.PageSection>;
  PageSectionInput: Types.PageSectionInput;
  PaymentStatus: Types.PaymentStatus;
  Purchase: ResolverTypeWrapper<Types.Purchase>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RegisterInput: Types.RegisterInput;
  SectionType: Types.SectionType;
  String: ResolverTypeWrapper<Types.Scalars['String']['output']>;
  SubscribeInput: Types.SubscribeInput;
  SubscriptionSource: Types.SubscriptionSource;
  SubscriptionStatus: Types.SubscriptionStatus;
  TicketTier: ResolverTypeWrapper<Types.TicketTier>;
  TicketTierInput: Types.TicketTierInput;
  UnsubscribeInput: Types.UnsubscribeInput;
  UpdateEventInput: Types.UpdateEventInput;
  UpdatePageInput: Types.UpdatePageInput;
  User: ResolverTypeWrapper<Types.User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Types.AuthPayload;
  Boolean: Types.Scalars['Boolean']['output'];
  Buyer: Types.Buyer;
  BuyerInput: Types.BuyerInput;
  Category: Types.Category;
  CategoryInput: Types.CategoryInput;
  Collaborator: Types.Collaborator;
  CollaboratorInput: Types.CollaboratorInput;
  ConfirmSubscriptionInput: Types.ConfirmSubscriptionInput;
  Coordinates: Types.Coordinates;
  CoordinatesInput: Types.CoordinatesInput;
  CreateEventInput: Types.CreateEventInput;
  CreatePageInput: Types.CreatePageInput;
  CreatePurchaseInput: Types.CreatePurchaseInput;
  DateTime: Types.Scalars['DateTime']['output'];
  Event: Types.Event;
  EventFeatures: Types.EventFeatures;
  EventFeaturesInput: Types.EventFeaturesInput;
  EventImage: Types.EventImage;
  EventImageInput: Types.EventImageInput;
  EventTheme: Types.EventTheme;
  EventThemeInput: Types.EventThemeInput;
  EventsFilterInput: Types.EventsFilterInput;
  Float: Types.Scalars['Float']['output'];
  ID: Types.Scalars['ID']['output'];
  Int: Types.Scalars['Int']['output'];
  JSON: Types.Scalars['JSON']['output'];
  Location: Types.Location;
  LocationInput: Types.LocationInput;
  LoginInput: Types.LoginInput;
  MailSubscription: Types.MailSubscription;
  Mutation: Record<PropertyKey, never>;
  Organizer: Types.Organizer;
  OrganizerInput: Types.OrganizerInput;
  Page: Types.Page;
  PageSection: Types.PageSection;
  PageSectionInput: Types.PageSectionInput;
  Purchase: Types.Purchase;
  Query: Record<PropertyKey, never>;
  RegisterInput: Types.RegisterInput;
  String: Types.Scalars['String']['output'];
  SubscribeInput: Types.SubscribeInput;
  TicketTier: Types.TicketTier;
  TicketTierInput: Types.TicketTierInput;
  UnsubscribeInput: Types.UnsubscribeInput;
  UpdateEventInput: Types.UpdateEventInput;
  UpdatePageInput: Types.UpdatePageInput;
  User: Types.User;
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
  avatar?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  collaborators?: Resolver<Types.Maybe<Array<ResolversTypes['Collaborator']>>, ParentType, ContextType>;
  cover_image?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Types.Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  features?: Resolver<Types.Maybe<ResolversTypes['EventFeatures']>, ParentType, ContextType>;
  featuresId?: Resolver<Types.Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Types.Maybe<ResolversTypes['EventImage']>, ParentType, ContextType>;
  imagesId?: Resolver<Types.Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  is_featured?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  locationId?: Resolver<Types.Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  organizer?: Resolver<Types.Maybe<ResolversTypes['Organizer']>, ParentType, ContextType>;
  organizerId?: Resolver<Types.Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  primary_color?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secondary_color?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EventStatus'], ParentType, ContextType>;
  theme?: Resolver<Types.Maybe<ResolversTypes['EventTheme']>, ParentType, ContextType>;
  themeId?: Resolver<Types.Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  ticketTiers?: Resolver<Types.Maybe<Array<ResolversTypes['TicketTier']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Types.Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Types.Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Types.Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
};

export type EventFeaturesResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventFeatures'] = ResolversParentTypes['EventFeatures']> = {
  allowGuestUploads?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showChat?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showCollaborators?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  showGallery?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type EventImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventImage'] = ResolversParentTypes['EventImage']> = {
  banner?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gallery?: Resolver<Types.Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
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
  coordinates?: Resolver<Types.Maybe<ResolversTypes['Coordinates']>, ParentType, ContextType>;
  venue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MailSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MailSubscription'] = ResolversParentTypes['MailSubscription']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  preferences?: Resolver<Types.Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  source?: Resolver<Types.Maybe<ResolversTypes['SubscriptionSource']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SubscriptionStatus'], ParentType, ContextType>;
  subscribedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  token?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unsubscribedAt?: Resolver<Types.Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  verifiedAt?: Resolver<Types.Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  confirmSubscription?: Resolver<Types.Maybe<ResolversTypes['MailSubscription']>, ParentType, ContextType, RequireFields<Types.MutationConfirmSubscriptionArgs, 'input'>>;
  createEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<Types.MutationCreateEventArgs, 'input'>>;
  createPage?: Resolver<ResolversTypes['Page'], ParentType, ContextType, RequireFields<Types.MutationCreatePageArgs, 'input'>>;
  createPurchase?: Resolver<ResolversTypes['Purchase'], ParentType, ContextType, RequireFields<Types.MutationCreatePurchaseArgs, 'input'>>;
  deleteEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<Types.MutationDeleteEventArgs, 'id'>>;
  deletePage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<Types.MutationDeletePageArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<Types.MutationLoginArgs, 'input'>>;
  publishPage?: Resolver<ResolversTypes['Page'], ParentType, ContextType, RequireFields<Types.MutationPublishPageArgs, 'id'>>;
  register?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<Types.MutationRegisterArgs, 'input'>>;
  subscribe?: Resolver<ResolversTypes['MailSubscription'], ParentType, ContextType, RequireFields<Types.MutationSubscribeArgs, 'input'>>;
  unsubscribe?: Resolver<ResolversTypes['MailSubscription'], ParentType, ContextType, RequireFields<Types.MutationUnsubscribeArgs, 'input'>>;
  updateEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<Types.MutationUpdateEventArgs, 'id' | 'input'>>;
  updatePage?: Resolver<ResolversTypes['Page'], ParentType, ContextType, RequireFields<Types.MutationUpdatePageArgs, 'id' | 'input'>>;
};

export type OrganizerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organizer'] = ResolversParentTypes['Organizer']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  eventId?: Resolver<Types.Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  publishedAt?: Resolver<Types.Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  sectionData?: Resolver<Types.Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  sections?: Resolver<Array<ResolversTypes['PageSection']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  template?: Resolver<Types.Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
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
  event?: Resolver<Types.Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<Types.QueryEventArgs, 'id'>>;
  eventBySlug?: Resolver<Types.Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<Types.QueryEventBySlugArgs, 'slug'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, Partial<Types.QueryEventsArgs>>;
  eventsByCategory?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<Types.QueryEventsByCategoryArgs, 'category'>>;
  featuredEvents?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  me?: Resolver<Types.Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  page?: Resolver<Types.Maybe<ResolversTypes['Page']>, ParentType, ContextType, RequireFields<Types.QueryPageArgs, 'id'>>;
  pageBySlug?: Resolver<Types.Maybe<ResolversTypes['Page']>, ParentType, ContextType, RequireFields<Types.QueryPageBySlugArgs, 'slug'>>;
  pages?: Resolver<Array<ResolversTypes['Page']>, ParentType, ContextType>;
  pagesByEvent?: Resolver<Array<ResolversTypes['Page']>, ParentType, ContextType, RequireFields<Types.QueryPagesByEventArgs, 'eventId'>>;
  searchEvents?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<Types.QuerySearchEventsArgs, 'searchTerm'>>;
  subscriptionByEmail?: Resolver<Types.Maybe<ResolversTypes['MailSubscription']>, ParentType, ContextType, RequireFields<Types.QuerySubscriptionByEmailArgs, 'email'>>;
  subscriptions?: Resolver<Array<ResolversTypes['MailSubscription']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type TicketTierResolvers<ContextType = any, ParentType extends ResolversParentTypes['TicketTier'] = ResolversParentTypes['TicketTier']> = {
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  soldCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Types.Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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

