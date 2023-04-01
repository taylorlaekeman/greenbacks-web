import { MockedApiResponse } from 'context/GreenbacksApi';
import { ADD_FILTER_MUTATION } from 'hooks/useAddFilter';
import type { FilterInput } from 'types/filter';

const buildAddFilterMock = ({
  filter,
}: {
  filter: FilterInput;
}): MockedApiResponse => ({
  request: {
    query: ADD_FILTER_MUTATION,
    variables: { ...filter },
  },
  result: {
    data: {
      filter,
    },
  },
});

export default buildAddFilterMock;
