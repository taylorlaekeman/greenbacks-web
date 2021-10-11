import gql from 'api/gql';

import { useQuery as useApiQuery } from 'api';

const useTransactions = ({ endDate, startDate, useQuery = useApiQuery }) => {
  const { data } = useQuery(query, { variables: { endDate, startDate } });
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
