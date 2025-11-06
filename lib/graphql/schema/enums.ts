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

registerEnumType(EventCategoryType, { name: 'EventCategoryType' });
registerEnumType(EventStatus, { name: 'EventStatus' });
registerEnumType(PaymentStatus, { name: 'PaymentStatus' });
registerEnumType(FontFamily, { name: 'FontFamily' });
registerEnumType(LayoutType, { name: 'LayoutType' });
registerEnumType(GradientDirection, { name: 'GradientDirection' });