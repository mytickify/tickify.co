import 'reflect-metadata';
import { Field, ObjectType, ID } from 'type-graphql';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';
import { EventCategoryType, EventStatus, PaymentStatus, FontFamily, LayoutType, GradientDirection, SubscriptionStatus, SubscriptionSource } from './enums';

@ObjectType()
export class EventTheme {
  @Field() primaryColor!: string;
  @Field() secondaryColor!: string;
  @Field() accentColor!: string;
  @Field() backgroundColor!: string;
  @Field() textColor!: string;
  @Field(() => FontFamily) fontFamily!: FontFamily;
  @Field(() => LayoutType) layout!: LayoutType;
  @Field() gradientEnabled!: boolean;
  @Field(() => GradientDirection) gradientDirection!: GradientDirection;
}

@ObjectType()
export class TicketTier {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field() price!: number;
  @Field() currency!: string;
  @Field() quantity!: number;
  @Field(() => String, { nullable: true }) description?: string;
  @Field() available!: boolean;
  @Field() soldCount!: number;
}

@ObjectType()
export class Category {
  @Field(() => [EventCategoryType]) type!: EventCategoryType[];
  @Field() description!: string;
}

@ObjectType()
export class Coordinates {
  @Field() lat!: number;
  @Field() lng!: number;
}

@ObjectType()
export class Location {
  @Field() venue!: string;
  @Field() address!: string;
  @Field() city!: string;
  @Field(() => Coordinates, { nullable: true }) coordinates?: Coordinates | null;
}

@ObjectType()
export class Organizer {
  @Field() name!: string;
  @Field() email!: string;
  @Field(() => String, { nullable: true }) phone?: string;
}

@ObjectType()
export class EventFeatures {
  @Field() showGallery!: boolean;
  @Field() allowGuestUploads!: boolean;
  @Field() showChat!: boolean;
  @Field() showCollaborators!: boolean;
}

@ObjectType()
export class Collaborator {
  @Field() name!: string;
  @Field() type!: string;
  @Field(() => String, { nullable: true }) avatar?: string;
  @Field(() => String, { nullable: true }) role?: string;
  @Field(() => String, { nullable: true }) description?: string;
}

@ObjectType()
export class EventImage {
  @Field(() => String, { nullable: true }) banner?: string;
  @Field(() => [String], { nullable: true }) gallery?: string[];
}

@ObjectType()
export class Event {
  @Field(() => ID) id!: string;
  @Field(() => String, { nullable: true }) slug?: string | null;
  @Field() title!: string;
  @Field() description!: string;
  @Field() startDate!: string;
  @Field() startTime!: string;
  @Field() endDate!: string;
  @Field() endTime!: string;
  @Field(() => Category) category!: Category;
  @Field() is_featured!: boolean;
  @Field(() => String, { nullable: true }) cover_image?: string | null;
  @Field(() => String, { nullable: true }) primary_color?: string | null;
  @Field(() => String, { nullable: true }) secondary_color?: string | null;
  @Field(() => Location) location!: Location;
  @Field(() => Organizer, { nullable: true }) organizer?: Organizer | null;
  @Field(() => EventTheme, { nullable: true }) theme?: EventTheme | null;
  @Field(() => [TicketTier], { nullable: true }) ticketTiers?: TicketTier[] | null;
  @Field(() => EventImage, { nullable: true }) images?: EventImage | null;
  @Field(() => EventFeatures, { nullable: true }) features?: EventFeatures | null;
  @Field(() => [Collaborator], { nullable: true }) collaborators?: Collaborator[] | null;
  @Field(() => EventStatus) status!: EventStatus;
  @Field(() => DateTimeResolver, { nullable: true }) createdAt?: Date | null;
  @Field(() => DateTimeResolver, { nullable: true }) updatedAt?: Date | null;
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
export class User {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) name?: string;
  @Field() email!: string;
  @Field({ nullable: true }) image?: string;
}

@ObjectType()
export class AuthPayload {
  @Field() token!: string;
  @Field(() => User) user!: User;
}

@ObjectType()
export class MailSubscription {
  @Field(() => ID) id!: string;
  @Field() email!: string;
  @Field(() => String, { nullable: true }) name?: string | null;
  @Field(() => SubscriptionStatus) status!: SubscriptionStatus;
  @Field(() => String, { nullable: true }) token?: string | null;
  @Field(() => DateTimeResolver) subscribedAt!: Date;
  @Field(() => DateTimeResolver, { nullable: true }) verifiedAt?: Date | null;
  @Field(() => DateTimeResolver, { nullable: true }) unsubscribedAt?: Date | null;
  @Field(() => JSONResolver, { nullable: true }) preferences?: any | null;
  @Field(() => SubscriptionSource, { nullable: true }) source?: SubscriptionSource | null;
  @Field(() => DateTimeResolver) createdAt!: Date;
  @Field(() => DateTimeResolver) updatedAt!: Date;
}