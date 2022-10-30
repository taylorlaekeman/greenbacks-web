import { GraphQLError, MockedApiResponse } from 'context/GreenbacksApi';
import { GET_TRANSACTIONS_QUERY } from 'hooks/useTransactions';
import { CoreTransaction } from 'types/transaction';

const buildApiTransactionsMock = ({
  endDate = '2020-06-30',
  errors,
  startDate = '2020-01-01',
  transactions = [],
}: Input = {}): MockedApiResponse => ({
  request: {
    query: GET_TRANSACTIONS_QUERY,
    variables: { endDate, startDate },
  },
  result: buildResult({ errors, transactions }),
});

const buildResult = ({
  errors,
  transactions,
}: {
  errors?: string[];
  transactions?: CoreTransaction[];
}) => {
  if (errors) {
    const graphqlErrors = errors.map((error) => new GraphQLError(error));
    return { errors: graphqlErrors };
  }
  return { data: { transactions } };
};

interface Input {
  endDate?: string;
  errors?: string[];
  startDate?: string;
  transactions?: CoreTransaction[];
}

export default buildApiTransactionsMock;
