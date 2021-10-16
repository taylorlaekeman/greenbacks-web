import gql, { DocumentNode } from 'api/gql';

import { useQuery as useApiQuery, QueryResult } from 'api/queries';

const useTransactions = (
  { endDate, startDate, useQuery }: Input = {
    useQuery: useApiQuery,
  }
): Transaction[] => {
  const variables: Variables = {};
  if (endDate) variables.endDate = endDate;
  if (startDate) variables.startDate = startDate;
  const { data } = useQuery<Results, Variables>(query, { variables });
  return data?.getTransactions || [];
};

interface Input {
  endDate?: string;
  startDate?: string;
  useQuery: <QueryResults, Variables>(
    query: DocumentNode,
    config: { variables: Variables }
  ) => QueryResult<QueryResults>;
}

export interface Variables {
  endDate?: string;
  startDate?: string;
}

export interface Results {
  getTransactions: Transaction[];
}

interface Transaction {
  amount: number;
}

const query = gql`
  {
    getTransactions {
      amount
      date
      name
    }
  }
`;

export default useTransactions;
