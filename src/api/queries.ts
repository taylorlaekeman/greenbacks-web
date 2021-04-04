import { gql } from '@apollo/client';

export { useLazyQuery, useQuery } from '@apollo/client';

export const queries = {
  getConnectionInitializationToken: gql`
    {
      getConnectionInitializationToken
    }
  `,
  getConnections: gql`
    {
      getConnections {
        id
        institution {
          name
        }
      }
    }
  `,
  getTransactions: gql`
    {
      getTransactions {
        amount
        date
        name
      }
    }
  `,
};
