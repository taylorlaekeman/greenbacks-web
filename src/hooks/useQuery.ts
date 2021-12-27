import { useQuery as useQueryExternal } from '@apollo/client';

import type { DocumentNode } from 'utils/gql';

const useQuery: IUseQuery = ({ query }) => {
  useQueryExternal(query);
  return {};
};

export type IUseQuery = <TData>(
  input: UseQueryInput
) => {
  data?: TData;
};

export interface UseQueryInput {
  fetchPolicy?: 'network-only';
  query: DocumentNode;
}

export default useQuery;
