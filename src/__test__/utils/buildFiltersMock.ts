import { MockedApiResponse } from 'context/GreenbacksApi';
import { FILTERS_QUERY } from 'context/Filters';
import type { Filter } from 'types/filter';

const buildFiltersMock = ({
  filters = [],
}: {
  filters?: Filter[];
} = {}): MockedApiResponse => ({
  request: {
    query: FILTERS_QUERY,
  },
  result: {
    data: {
      filters,
    },
  },
});

export default buildFiltersMock;
