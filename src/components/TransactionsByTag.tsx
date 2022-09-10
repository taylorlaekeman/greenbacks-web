import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useMonth from 'hooks/useMonth';
import useTransactionsByTag from 'hooks/useTransactionsByTag';

const TransactionsByTag: FC = () => {
  const { endDate, startDate } = useMonth();
  const { expenses, isLoading } = useTransactionsByTag({ endDate, startDate });
  const { format } = useCurrencyFormatter();

  if (isLoading)
    return (
      <SectionContainer>
        <LoadingIndicator name="transactions-by-tag" />
      </SectionContainer>
    );

  return (
    <SectionContainer>
      <ul>
        {Object.values(expenses).map(({ tag, totalAmount }) => (
          <li key={tag}>{`${tag}: ${format({ value: totalAmount })}`}</li>
        ))}
      </ul>
    </SectionContainer>
  );
};

const SectionContainer: FC = ({ children }) => (
  <section data-testid="transactions-by-tag">
    <h3>Transactions by Tag</h3>
    {children}
  </section>
);

export default TransactionsByTag;
