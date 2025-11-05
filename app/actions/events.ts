"use server";

import { Event } from '@/types';
import { getAll as getAllGraphQL, getBySlug, create as createGraphQL } from './graphql-events';

export async function getAll() {
  try {
    return await getAllGraphQL();
  } catch (error) {
    console.error('Error in getAll action:', error);
    throw new Error('Failed to fetch events');
  }
}

export async function getEventBySlug(slug: string) {
  try {
    return await getBySlug(slug);
  } catch (error) {
    console.error('Error in getEventBySlug action:', error);
    throw new Error('Failed to fetch event');
  }
}

export async function create(event: Omit<Event, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) {
  try {
    return await createGraphQL(event);
  } catch (error) {
    console.error('Error in create action:', error);
    throw new Error('Failed to create event');
  }
}