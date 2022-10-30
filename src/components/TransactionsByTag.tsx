import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import type { TagGroup } from 'types/tagGroup';

const TransactionsByTag: FC<{
  id?: string;
  isLoading: boolean;
  months?: number;
  name?: string;
  transactions: TagGroup[];
}> = ({
  id = 'transactions-by-tag',
  isLoading,
  months = 1,
  name = 'Transactions by Tag',
  transactions,
}) => {
  const { format } = useCurrencyFormatter();

  if (isLoading)
    return (
      <SectionContainer id={id} title={name}>
        <LoadingIndicator name={id} />
      </SectionContainer>
    );

  return (
    <SectionContainer id={id} title={name}>
      <ul>
        {transactions.map(({ tag, totalAmount }) => {
          const formattedAmount = format({ value: totalAmount / months });
          return <li key={tag}>{`${tag}: ${formattedAmount}`}</li>;
        })}
      </ul>
    </SectionContainer>
  );
};

export default TransactionsByTag;
