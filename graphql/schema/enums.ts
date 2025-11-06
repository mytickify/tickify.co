import { registerEnumType } from 'type-graphql';

export enum EventCategoryType {
  MUSIC = 'MUSIC',
  SPORTS = 'SPORTS',
  ARTS = 'ARTS',
  FESTIVAL = 'FESTIVAL',
  CONFERENCE = 'CONFERENCE',
  NIGHTLIFE = 'NIGHTLIFE',
  COMEDY = 'COMEDY',
  THEATRE = 'THEATRE',
  OTHER = 'OTHER',
}

export enum EventStatus { DRAFT = 'DRAFT', PUBLISHED = 'PUBLISHED', ENDED = 'ENDED' }
export enum PaymentStatus { PENDING = 'PENDING', COMPLETED = 'COMPLETED', FAILED = 'FAILED' }
export enum FontFamily { MODERN = 'MODERN', ELEGANT = 'ELEGANT', BOLD = 'BOLD', PLAYFUL = 'PLAYFUL' }
export enum LayoutType { SINGLE = 'SINGLE', TWO_COLUMN = 'TWO_COLUMN', CARD = 'CARD', MINIMAL = 'MINIMAL' }
export enum GradientDirection { TO_R = 'TO_R', TO_BR = 'TO_BR', TO_B = 'TO_B', TO_BL = 'TO_BL' }
export enum SubscriptionStatus { PENDING = 'PENDING', CONFIRMED = 'CONFIRMED', UNSUBSCRIBED = 'UNSUBSCRIBED' }
export enum SubscriptionSource { FORM = 'FORM', IMPORT = 'IMPORT', ADMIN = 'ADMIN', API = 'API' }

export enum SectionType {
  HERO = 'HERO',
  PRICING = 'PRICING',
  GALLERY = 'GALLERY',
  ABOUT = 'ABOUT',
  SCHEDULE = 'SCHEDULE',
  CONTACT = 'CONTACT',
}

registerEnumType(EventCategoryType, { name: 'EventCategoryType' });
registerEnumType(EventStatus, { name: 'EventStatus' });
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });
registerEnumType(FontFamily, { name: 'FontFamily' });
registerEnumType(LayoutType, { name: 'LayoutType' });
registerEnumType(GradientDirection, { name: 'GradientDirection' });
registerEnumType(SubscriptionStatus, { name: 'SubscriptionStatus' });
registerEnumType(SubscriptionSource, { name: 'SubscriptionSource' });
registerEnumType(SectionType, { name: 'SectionType' });