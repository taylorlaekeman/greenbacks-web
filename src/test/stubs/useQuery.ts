import type { IUseQuery, UseQueryInput } from 'hooks/useQuery';

class UseQueryStub {
  readonly data?: DataType;

  readonly isLoading: boolean;

  readonly useQueryCalls: UseQueryInput[];

  constructor({ data, isLoading = false }: ConstructorInput = {}) {
    this.data = data;
    this.isLoading = isLoading;
    this.useQueryCalls = [];
  }

  useQuery: IUseQuery = (input) => {
    this.useQueryCalls.push(input);
    return { data: this.data, isLoading: this.isLoading };
  };
}

interface ConstructorInput {
  data?: DataType;
  isLoading?: boolean;
}

type DataType = any;

export default UseQueryStub;
