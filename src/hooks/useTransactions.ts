import gql from 'api/gql';

import { useQuery as useApiQuery } from 'api';

const useTransactions = ({ endDate, startDate, useQuery = useApiQuery }) => {
  const variables = {};
  if (endDate) variables.endDate = endDate;
  if (startDate) variables.startDate = startDate;
  const {
    data: { getTransactions },
  } = useQuery(query, { variables });
  return getTransactions;
};

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
