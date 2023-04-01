import useQuery, { ApolloError } from 'hooks/useQuery';
import type { Filter } from 'types/filter';
import gql from 'utils/gql';

const useFilters = (): {
  error?: ApolloError;
  isLoading: boolean;
  filters?: Filter[];
} => {
  const response = useQuery(FILTERS_QUERY);
  const { error, data, loading } = response;
  return {
    error,
    isLoading: loading,
    filters: data?.filters,
  };
};

export const FILTERS_QUERY = gql`
  query GetFilters {
    filters {
      categoryToAssign
      id
      matchers {
        comparator
        expectedValue
        property
      }
      tagToAssign
    }
  }
`;

export default useFilters;
