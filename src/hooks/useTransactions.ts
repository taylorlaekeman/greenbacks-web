import gql from 'api/gql';

import { useQuery as useApiQuery } from 'api';

const useTransactions = ({ endDate, startDate, useQuery = useApiQuery }) => {
  const variables = {};
  if (endDate) variables.endDate = endDate;
  if (startDate) variables.startDate = startDate;
  const { data } = useQuery(query, { variables });
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
