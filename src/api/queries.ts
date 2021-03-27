import { gql } from '@apollo/client';

export { useLazyQuery, useQuery } from '@apollo/client';

export const queries = {
  getConnectionInitializationToken: gql`
    {
      getConnectionInitializationToken
    }
  `,
  getAccounts: gql`
    {
      getAccounts
    }
  `,
};
