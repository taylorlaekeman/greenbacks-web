import gql from 'api/gql';

import { useQuery as useApiQuery } from 'api';

const useTransactions = ({ startDate, useQuery = useApiQuery }) => {
  const { data } = useQuery(query, { variables: { startDate } });
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
