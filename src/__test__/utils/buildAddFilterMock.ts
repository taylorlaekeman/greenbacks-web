import { MockedApiResponse } from 'context/GreenbacksApi';
import { ADD_FILTER_MUTATION } from 'hooks/useAddFilter';
import type { FilterInput } from 'types/filter';

const buildAddFilterMock = ({
  filter,
  id = 'test-id',
}: {
  filter: FilterInput;
  id?: string;
}): MockedApiResponse => ({
  request: {
    query: ADD_FILTER_MUTATION,
    variables: { ...filter },
  },
  result: {
    data: {
      addFilter: {
        ...filter,
        id,
      },
    },
  },
});

export default buildAddFilterMock;
