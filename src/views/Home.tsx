import React, { FunctionComponent } from 'react';

import { queries, useQuery } from 'api';
import LoadingIndicator from 'components/LoadingIndicator';
import { Link } from 'routing';

const Home: FunctionComponent = () => {
  const { data: transactionsResponse } = useQuery(queries.getTransactions);

  const transactions = transactionsResponse?.getTransactions;

  const isLoading = !transactions;

  if (isLoading) return <LoadingIndicator />;

  return (
    <main>
      <Link to="/connections">connections</Link>
      <ul>
        {transactions.map((transaction: Transaction) => (
          <li
            key={`${transaction.date}-${transaction.name}-${transaction.amount}`}
          >
            {`${transaction.date}: ${transaction.name} $ ${transaction.amount}`}
          </li>
        ))}
      </ul>
    </main>
  );
};

interface Transaction {
  amount: number;
  date: string;
  name: string;
}

export default Home;
