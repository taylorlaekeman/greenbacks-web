import type { IUseQuery, UseQueryInput } from 'hooks/useQuery';

class UseQueryStub {
  readonly data?: DataType;

  readonly useQueryCalls: UseQueryInput[];

  constructor({ data }: ConstructorInput = {}) {
    this.data = data;
    this.useQueryCalls = [];
  }

  useQuery: IUseQuery = (input) => {
    this.useQueryCalls.push(input);
    return { data: this.data };
  };
}

interface ConstructorInput {
  data?: DataType;
}

type DataType = any;

export default UseQueryStub;
