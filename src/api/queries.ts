import { gql } from '@apollo/client';

export { useLazyQuery, useQuery } from '@apollo/client';

export const queries = {
  getAuthorizerToken: gql`
    {
      getAuthorizerToken
    }
  `,
  getConnections: gql`
    {
      getConnections
    }
  `,
};
