import { useQuery as useQueryExternal } from '@apollo/client';

import gql from 'utils/gql';

const useQuery: IUseQuery = ({ query }) => {
  const { data, loading } = useQueryExternal(gql(query));
  return { data, isLoading: loading };
};

export type IUseQuery = <TData>(
  input: UseQueryInput
) => {
  data?: TData;
  isLoading: boolean;
};

export interface UseQueryInput {
  fetchPolicy?: FetchPolicy;
  query: string;
}

type FetchPolicy = 'network-only';

export default useQuery;
