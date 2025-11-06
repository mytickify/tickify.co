import { gql } from '@apollo/client';

export const GET_PAGE_QUERY = gql`
  query GetPage($id: ID!) {
    page(id: $id) {
      id
      slug
      name
      published
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_PAGES_QUERY = gql`
  query GetPages {
    pages {
      id
      slug
      name
      published
      publishedAt
      createdAt
      updatedAt
    }
  }
`;


export const PUBLISH_PAGE = gql`
  mutation PublishPage($id: ID!) {
    publishPage(id: $id) { id slug published publishedAt }
  }
`;

export const UPDATE_PAGE = gql`
  mutation UpdatePage($id: ID!, $input: UpdatePageInput!) {
    updatePage(id: $id, input: $input) {
      id
      slug
      name
      published
      sections { id builderId type order }
    }
  }
`;