import { gql } from '@apollo/client';

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