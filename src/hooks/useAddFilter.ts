import { gql, useMutation } from '@apollo/client';

import type { Category } from 'types/transaction';
import type { Matcher } from 'types/filter';

const useAddFilter = (): {
  addFilter: (input: { filter: AddFilterVariables }) => void;
  hasBeenCalled: boolean;
  isSaving: boolean;
} => {
  const [mutate, status] = useMutation<AddFilterVariables>(
    ADD_FILTER_MUTATION,
    {
      refetchQueries: ['GetFilters'],
    }
  );
  const { called, loading } = status;
  return {
    addFilter: ({ filter }) => mutate({ variables: filter }),
    hasBeenCalled: called,
    isSaving: loading,
  };
};

interface AddFilterVariables {
  categoryToAssign: Category;
  matchers: Matcher[];
  tagToAssign?: string;
}

export const ADD_FILTER_MUTATION = gql`
  mutation AddFilter(
    $categoryToAssign: Category!
    $matchers: [MatcherInput]!
    $tagToAssign: String
  ) {
    addFilter(
      input: {
        categoryToAssign: $categoryToAssign
        matchers: $matchers
        tagToAssign: $tagToAssign
      }
    ) {
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

export default useAddFilter;
