import { useQuery as useQueryExternal } from '@apollo/client';

import gql from 'utils/gql';

const useQuery: IUseQuery = ({ query }) => {
  useQueryExternal(gql(query));
  return {};
};

export type IUseQuery = <TData>(
  input: UseQueryInput
) => {
  data?: TData;
};

export interface UseQueryInput {
  fetchPolicy?: 'network-only';
  query: string;
}

export default useQuery;
