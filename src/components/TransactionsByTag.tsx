import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useMonth from 'hooks/useMonth';
import useTransactionsByTag from 'hooks/useTransactionsByTag';

const TransactionsByTag: FC = () => {
  const { endDate, startDate } = useMonth();
  const { isLoading, spending } = useTransactionsByTag({ endDate, startDate });
  const { format } = useCurrencyFormatter();

  if (isLoading)
    return (
      <SectionContainer id="transactions-by-tag" title="Transactions by Tag">
        <LoadingIndicator name="transactions-by-tag" />
      </SectionContainer>
    );

  return (
    <SectionContainer id="transactions-by-tag" title="Transactions by Tag">
      <ul>
        {spending.map(({ tag, totalAmount }) => (
          <li key={tag}>{`${tag}: ${format({ value: totalAmount })}`}</li>
        ))}
      </ul>
    </SectionContainer>
  );
};

export default TransactionsByTag;
