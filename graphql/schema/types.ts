import 'reflect-metadata';
import { Field, ObjectType, ID } from 'type-graphql';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';
import { EventCategoryType, EventStatus, PaymentStatus, FontFamily, LayoutType, GradientDirection, SubscriptionStatus, SubscriptionSource, SectionType } from './enums';
import { CategoryModel, CollaboratorModel, EventFeaturesModel, LocationModel, OrganizerModel, TicketTierModel, EventThemeModel, EventImageModel, MailSubscriptionModel, PageModel, PageSectionModel, UserModel } from '@/lib/generated/prisma/models';

@ObjectType()
export class EventTheme implements EventThemeModel {
  @Field(() => ID) id!: string;
  @Field() primaryColor!: string;
  @Field() secondaryColor!: string;
  @Field() accentColor!: string;
  @Field(() => String) backgroundColor!: string;
  @Field() textColor!: string;
  @Field(() => FontFamily) fontFamily!: string;
  @Field(() => LayoutType) layout!: string;
  @Field() gradientEnabled!: boolean;
  @Field(() => GradientDirection) gradientDirection!: string;
  @Field(() => Date) createdAt!: Date;
  @Field(() => Date) updatedAt!: Date;
}

@ObjectType()
export class TicketTier implements TicketTierModel {
  @Field(() => ID) id!: string;
  eventId!: string;
  @Field() name!: string;
  @Field() price!: number;
  @Field() currency!: string;
  @Field() quantity!: number;
  @Field(() => String, { nullable: true }) description!: string | null;
  @Field() available!: boolean;
  @Field() soldCount!: number;
  createdAt!: Date;
  updatedAt!: Date;
}

@ObjectType()
export class Category implements CategoryModel {
  @Field(() => ID) id!: string;
  @Field(() => EventCategoryType) type!: EventCategoryType;
  @Field() description!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

@ObjectType()
export class Coordinates {
  @Field() lat!: number;
  @Field() lng!: number;
}

@ObjectType()
export class Location implements LocationModel {
  id!: string;
  eventId!: string;
  @Field(() => String) venue!: string;
  @Field(() => String) address!: string;
  @Field(() => String) city!: string;
  coordinates?: Coordinates | null;
  @Field(() => Number, { nullable: true }) lat!: number | null;
  @Field(() => Number, { nullable: true }) lng!: number | null;
  createdAt!: Date;
  updatedAt!: Date;
}

@ObjectType()
export class Organizer implements OrganizerModel {
  @Field() name!: string;
  @Field() email!: string;
  @Field(() => String, { nullable: true }) phone!: string;
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

@ObjectType()
export class EventFeatures implements EventFeaturesModel {
  @Field() showGallery!: boolean;
  @Field() allowGuestUploads!: boolean;
  @Field() showChat!: boolean;
  @Field() showCollaborators!: boolean;
  id!: string;
  eventId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

@ObjectType()
export class Collaborator implements CollaboratorModel {
  @Field() name!: string;
  @Field() type!: string;
  @Field(() => String, { nullable: true }) avatar!: string;
  @Field(() => String, { nullable: true }) description!: string;
  id!: string;
  eventId!: string;
  role!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

@ObjectType()
export class EventImage implements EventImageModel {
  @Field(() => String, { nullable: true }) banner!: string | null;
  @Field(() => [String]) gallery!: string[];
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

@ObjectType()
export class Event {
  @Field(() => ID) id!: string;
  @Field(() => String, { nullable: true }) slug!: string | null;
  @Field() title!: string;
  @Field() description!: string;
  @Field() startDate!: string;
  @Field() startTime!: string;
  @Field() endDate!: string;
  @Field() endTime!: string;
  @Field(() => [Category], { nullable: true }) categories!: Category[] | null;
  @Field() is_featured!: boolean;
  @Field(() => String, { nullable: true }) cover_image!: string | null;
  @Field(() => String, { nullable: true }) primary_color!: string | null;
  @Field(() => String, { nullable: true }) secondary_color!: string | null;
  @Field(() => Location, { nullable: true }) location!: Location | null;
  @Field(() => Organizer, { nullable: true }) organizer!: Organizer | null;
  @Field(() => EventTheme, { nullable: true }) theme!: EventTheme | null;
  @Field(() => [TicketTier], { nullable: true }) ticketTiers!: TicketTier[] | null;
  @Field(() => EventImage, { nullable: true }) images!: EventImage | null;
  @Field(() => EventFeatures, { nullable: true }) features!: EventFeatures | null;
  @Field(() => [Collaborator], { nullable: true }) collaborators!: Collaborator[] | null;
  @Field(() => EventStatus) status!: EventStatus;
  @Field(() => DateTimeResolver, { nullable: true }) createdAt!: Date | null;
  @Field(() => DateTimeResolver, { nullable: true }) updatedAt!: Date | null;
  @Field(() => ID, { nullable: true }) userId!: string | null;
  @Field(() => User, { nullable: true }) user!: User | null;
  @Field(() => ID, { nullable: true }) locationId!: string | null;
  @Field(() => ID, { nullable: true }) organizerId!: string | null;
  @Field(() => ID, { nullable: true }) themeId!: string | null;
  @Field(() => ID, { nullable: true }) imagesId!: string | null;
  @Field(() => ID, { nullable: true }) featuresId!: string | null;
}

@ObjectType()
export class Buyer {
  @Field() name!: string;
  @Field() email!: string;
  @Field() phone!: string;
}

@ObjectType()
export class Purchase {
  @Field(() => ID) id!: string;
  @Field(() => ID) eventId!: string;
  @Field(() => ID) ticketTierId!: string;
  @Field() quantity!: number;
  @Field() totalAmount!: number;
  @Field(() => Buyer) buyer!: Buyer;
  @Field(() => PaymentStatus) paymentStatus!: PaymentStatus;
  @Field(() => DateTimeResolver) purchasedAt!: Date;
}

@ObjectType()
export class User implements UserModel {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) name!: string;
  @Field() email!: string;
  emailVerified!: boolean;
  @Field({ nullable: true }) image!: string;
  @Field(() => Date) createdAt!: Date;
  @Field(() => Date) updatedAt!: Date;
}

@ObjectType()
export class AuthPayload {
  @Field() token!: string;
  @Field(() => User) user!: User;
}

@ObjectType()
export class MailSubscription implements MailSubscriptionModel {
  @Field(() => ID) id!: string;
  @Field() email!: string;
  @Field(() => String, { nullable: true }) name!: string | null;
  @Field(() => SubscriptionStatus) status!: SubscriptionStatus;
  @Field(() => String, { nullable: true }) token!: string | null;
  @Field(() => DateTimeResolver) subscribedAt!: Date;
  @Field(() => DateTimeResolver, { nullable: true }) verifiedAt!: Date | null;
  @Field(() => DateTimeResolver, { nullable: true }) unsubscribedAt!: Date | null;
  @Field(() => JSONResolver, { nullable: true }) preferences!: object | null;
  @Field(() => SubscriptionSource, { nullable: true }) source!: SubscriptionSource | null;
  @Field(() => DateTimeResolver) createdAt!: Date;
  @Field(() => DateTimeResolver) updatedAt!: Date;
}

@ObjectType()
export class PageSection implements PageSectionModel {
  @Field(() => ID) id!: string;
  @Field() builderId!: string;
  @Field(() => SectionType) type!: SectionType;
  @Field() order!: number;
  @Field(() => JSONResolver) data!: object;
  pageId!: string;
}

@ObjectType()
export class Page implements PageModel {
  @Field(() => ID) id!: string;
  @Field() slug!: string;
  @Field() name!: string;
  @Field(() => JSONResolver) metadata!: object;
  @Field(() => JSONResolver, { nullable: true }) template!: object | null;
  @Field(() => JSONResolver, { nullable: true }) sectionData!: object | null;
  @Field() published!: boolean;
  @Field(() => DateTimeResolver, { nullable: true }) publishedAt!: Date | null;
  @Field(() => DateTimeResolver) createdAt!: Date;
  @Field(() => DateTimeResolver) updatedAt!: Date;
  @Field(() => ID, { nullable: true }) eventId!: string | null;
  @Field(() => [PageSection]) sections!: PageSection[];
}