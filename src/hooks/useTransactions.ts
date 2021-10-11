import gql from 'api/gql';

import { useQuery as useApiQuery } from 'api';

const useTransactions = ({ useQuery = useApiQuery }) => {
  const { data } = useQuery(query);
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
