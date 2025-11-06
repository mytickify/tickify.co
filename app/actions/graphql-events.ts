import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';

import { CreateEventInput, CreateEventMutation, GetEventByIdQuery, GetEventBySlugQuery, GetEventsQuery, UpdateEventInput, UpdateEventMutation } from '../gql/graphql';

export const GET_EVENTS_QUERY = gql`
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

export const GET_EVENT_BY_ID_QUERY = gql`
  query GetEventById($id: ID!) {
    event(id: $id) {
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

export const CREATE_EVENT_MUTATION = gql`
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

export async function getById(id: string) {
  try {
    const { data } = await client.query<GetEventByIdQuery>({
      query: GET_EVENT_BY_ID_QUERY,
      variables: { id },
    });
    return data?.event || null;
  } catch (error) {
    console.error('Error fetching event by id:', error);
    throw new Error('Failed to fetch event');
  }
}

export const UPDATE_EVENT_MUTATION = gql`
  mutation UpdateEvent($id: ID!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
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

export async function create(event: CreateEventInput) {
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

export async function update(id: string, event: UpdateEventInput) {
  try {
    const { data } = await client.mutate<UpdateEventMutation>({
      mutation: UPDATE_EVENT_MUTATION,
      variables: { id, input: event },
    });
    return data?.updateEvent || null;
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error('Failed to update event');
  }
}

// Delete Event
export const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export async function deleteEvent(id: string) {
  try {
    const { data } = await client.mutate<{ deleteEvent: boolean }>({
      mutation: DELETE_EVENT_MUTATION,
      variables: { id },
    });
    return data?.deleteEvent || false;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Failed to delete event');
  }
}