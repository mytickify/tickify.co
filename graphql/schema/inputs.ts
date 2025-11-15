import 'reflect-metadata';
import { Field, InputType, ID } from 'type-graphql';
import { JSONResolver } from 'graphql-scalars';
import { EventCategoryType, FontFamily, LayoutType, GradientDirection, EventStatus, SubscriptionSource, SectionType } from './enums';

@InputType()
export class CategoryInput { @Field(() => [EventCategoryType]) type!: EventCategoryType[]; @Field() description!: string; }

@InputType()
export class CoordinatesInput { @Field() lat!: number; @Field() lng!: number; }

@InputType()
export class LocationInput { @Field() venue!: string; @Field() address!: string; @Field() city!: string; @Field(() => CoordinatesInput, { nullable: true }) coordinates?: CoordinatesInput; }

@InputType()
export class OrganizerInput { @Field() name!: string; @Field() email!: string; @Field({ nullable: true }) phone?: string; }

@InputType()
export class EventThemeInput { @Field() primaryColor!: string; @Field() secondaryColor!: string; @Field() accentColor!: string; @Field() textColor!: string; @Field(() => FontFamily) fontFamily!: FontFamily; @Field(() => LayoutType) layout!: LayoutType; @Field() gradientEnabled!: boolean; @Field(() => GradientDirection) gradientDirection!: GradientDirection; }

@InputType()
export class TicketTierInput { @Field() name!: string; @Field() price!: number; @Field() currency!: string; @Field() quantity!: number; @Field({ nullable: true }) description?: string; }

@InputType()
export class EventImageInput { @Field({ nullable: true }) banner?: string; @Field(() => [String], { nullable: true }) gallery?: string[]; }

@InputType()
export class EventFeaturesInput { @Field() showGallery!: boolean; @Field() allowGuestUploads!: boolean; @Field() showChat!: boolean; @Field() showCollaborators!: boolean; }

@InputType()
export class CollaboratorInput { @Field() name!: string; @Field() type!: string; @Field({ nullable: true }) logo?: string; }

@InputType()
export class BuyerInput { @Field() name!: string; @Field() email!: string; @Field() phone!: string; }

@InputType()
export class CreateEventInput {
  @Field() title!: string;
  @Field() description!: string;
  @Field() startDate!: string;
  @Field() startTime!: string;
  @Field() endDate!: string;
  @Field() endTime!: string;
  @Field(() => CategoryInput) category!: CategoryInput;
  @Field({ nullable: true }) is_featured?: boolean;
  @Field(() => LocationInput, { nullable: true }) location?: LocationInput;
  @Field(() => OrganizerInput) organizer!: OrganizerInput;
  @Field(() => EventThemeInput, { nullable: true }) theme?: EventThemeInput;
  @Field(() => [TicketTierInput], { nullable: true }) ticketTiers?: TicketTierInput[];
  @Field(() => EventImageInput, { nullable: true }) images?: EventImageInput;
  @Field(() => EventFeaturesInput, { nullable: true }) features?: EventFeaturesInput;
  @Field(() => [CollaboratorInput], { nullable: true }) collaborators?: CollaboratorInput[];
  @Field(() => EventStatus, { nullable: true }) status?: EventStatus;
}

@InputType()
export class UpdateEventInput {
  @Field({ nullable: true }) title?: string;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) startDate?: string;
  @Field({ nullable: true }) startTime?: string;
  @Field({ nullable: true }) endDate?: string;
  @Field({ nullable: true }) endTime?: string;
  @Field(() => CategoryInput, { nullable: true }) category?: CategoryInput;
  @Field({ nullable: true }) is_featured?: boolean;
  @Field(() => LocationInput, { nullable: true }) location?: LocationInput;
  @Field(() => OrganizerInput, { nullable: true }) organizer?: OrganizerInput;
  @Field(() => EventThemeInput, { nullable: true }) theme?: EventThemeInput;
  @Field(() => [TicketTierInput], { nullable: true }) ticketTiers?: TicketTierInput[];
  @Field(() => EventImageInput, { nullable: true }) images?: EventImageInput;
  @Field(() => EventFeaturesInput, { nullable: true }) features?: EventFeaturesInput;
  @Field(() => [CollaboratorInput], { nullable: true }) collaborators?: CollaboratorInput[];
  @Field(() => EventStatus, { nullable: true }) status?: EventStatus;
}

@InputType()
export class CreatePurchaseInput { @Field(() => ID) eventId!: string; @Field(() => ID) ticketTierId!: string; @Field() quantity!: number; @Field(() => BuyerInput) buyer!: BuyerInput; }

@InputType()
export class RegisterInput { @Field() name!: string; @Field() email!: string; @Field() password!: string; }

@InputType()
export class LoginInput { @Field() email!: string; @Field() password!: string; }

@InputType()
export class SubscribeInput {
  @Field() email!: string;
  @Field({ nullable: true }) name?: string;
  @Field(() => JSONResolver, { nullable: true }) preferences?: any;
  @Field(() => SubscriptionSource, { nullable: true }) source?: SubscriptionSource;
}

@InputType()
export class ConfirmSubscriptionInput { @Field() token!: string; }

@InputType()
export class UnsubscribeInput { @Field() email!: string; }

@InputType()
export class PageSectionInput {
  @Field() builderId!: string;
  @Field(() => SectionType) type!: SectionType;
  @Field({ nullable: true }) order?: number;
  @Field(() => JSONResolver) data!: any;
}

@InputType()
export class CreatePageInput {
  @Field() name!: string;
  @Field(() => JSONResolver) metadata!: any;
  @Field(() => JSONResolver, { nullable: true }) template?: any;
  @Field(() => JSONResolver, { nullable: true }) sectionData?: any;
  @Field({ nullable: true }) slug?: string;
  @Field(() => ID, { nullable: true }) eventId?: string;
  @Field(() => [PageSectionInput]) sections!: PageSectionInput[];
}

@InputType()
export class UpdatePageInput {
  @Field({ nullable: true }) name?: string;
  @Field(() => JSONResolver, { nullable: true }) metadata?: any;
  @Field(() => JSONResolver, { nullable: true }) template?: any;
  @Field(() => JSONResolver, { nullable: true }) sectionData?: any;
  @Field({ nullable: true }) slug?: string;
  @Field(() => [PageSectionInput], { nullable: true }) sections?: PageSectionInput[];
  @Field({ nullable: true }) published?: boolean;
}