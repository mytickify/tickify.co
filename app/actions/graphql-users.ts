import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      name
      email
      image
      createdAt
      updatedAt
    }
  }
`;

export async function fetchUsers() {
  const { data } = await client.query({ query: GET_USERS_QUERY });
  return data?.users ?? [];
}