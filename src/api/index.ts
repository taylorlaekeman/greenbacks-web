import {
  gql,
  useQuery as useApolloQuery,
} from '@apollo/client';

import InnerProvider from 'api/Provider';

export const Provider = InnerProvider;

export const useQuery = useApolloQuery;

export const queries = {
  hello: gql`{ hello }`,
};

export default {
  provider: Provider,
  useQuery,
  queries,
};
