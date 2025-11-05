"use server";

import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import { Event } from '@/types';
import { CreateEventMutation, GetEventBySlugQuery, GetEventsQuery } from '../gql/graphql';

const GET_EVENTS_QUERY = gql`
  query GetEvents {
    events {
      id
      slug
      title
      description
      startDate
      startTime
      endDate
      endTime
      category {
        type
        description
      }
      is_featured
      location {
        venue
        address
        city
        coordinates {
          lat
          lng
        }
      }
      organizer {
        name
        email
        phone
      }
      theme {
        primaryColor
        secondaryColor
        accentColor
        backgroundColor
        textColor
        fontFamily
        layout
        gradientEnabled
        gradientDirection
      }
      ticketTiers {
        id
        name
        price
        currency
        quantity
        soldCount
        description
        available
      }
      images {
        banner
        gallery
      }
      features {
        showGallery
        allowGuestUploads
        showChat
        showCollaborators
      }
      collaborators {
        name
        type
        logo
      }
      status
      createdAt
      updatedAt
    }
  }
`;

const GET_EVENT_BY_SLUG_QUERY = gql`
  query GetEventBySlug($slug: String!) {
    eventBySlug(slug: $slug) {
      id
      slug
      title
      description
      startDate
      startTime
      endDate
      endTime
      category {
        type
        description
      }
      is_featured
      location {
        venue
        address
        city
        coordinates {
          lat
          lng
        }
      }
      organizer {
        name
        email
        phone
      }
      theme {
        primaryColor
        secondaryColor
        accentColor
        backgroundColor
        textColor
        fontFamily
        layout
        gradientEnabled
        gradientDirection
      }
      ticketTiers {
        id
        name
        price
        currency
        quantity
        soldCount
        description
        available
      }
      images {
        banner
        gallery
      }
      features {
        showGallery
        allowGuestUploads
        showChat
        showCollaborators
      }
      collaborators {
        name
        type
        logo
      }
      status
      createdAt
      updatedAt
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      slug
      title
      description
      startDate
      startTime
      endDate
      endTime
      category {
        type
        description
      }
      is_featured
      location {
        venue
        address
        city
        coordinates {
          lat
          lng
        }
      }
      organizer {
        name
        email
        phone
      }
      theme {
        primaryColor
        secondaryColor
        accentColor
        backgroundColor
        textColor
        fontFamily
        layout
        gradientEnabled
        gradientDirection
      }
      ticketTiers {
        id
        name
        price
        currency
        quantity
        soldCount
        description
        available
      }
      images {
        banner
        gallery
      }
      features {
        showGallery
        allowGuestUploads
        showChat
        showCollaborators
      }
      collaborators {
        name
        type
        logo
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export async function getAll() {
  try {
    const { data } = await client.query<GetEventsQuery>({
      query: GET_EVENTS_QUERY,
    });
    return data?.events || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
}

export async function getBySlug(slug: string) {
  try {
    const { data } = await client.query<GetEventBySlugQuery>({
      query: GET_EVENT_BY_SLUG_QUERY,
      variables: { slug },
    });
    return data?.eventBySlug || null;
  } catch (error) {
    console.error('Error fetching event by slug:', error);
    throw new Error('Failed to fetch event');
  }
}

export async function create(event: Omit<Event, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) {
  try {
    const { data } = await client.mutate<CreateEventMutation>({
      mutation: CREATE_EVENT_MUTATION,
      variables: { input: event },
    });
    return data?.createEvent || null;
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event');
  }
}