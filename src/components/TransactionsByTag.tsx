import React, { FC } from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import type { TagGroup } from 'types/tagGroup';

const TransactionsByTag: FC<{
  id?: string;
  isGraphVisible?: boolean;
  isLoading: boolean;
  months?: number;
  name?: string;
  transactions: TagGroup[];
}> = ({
  id = 'transactions-by-tag',
  isGraphVisible = false,
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
      {isGraphVisible && (
        <Graph id={id} months={months} transactions={transactions} />
      )}
      <ul>
        {transactions.map(({ tag, totalAmount }) => {
          const formattedAmount = format({ value: totalAmount / months });
          return <li key={tag}>{`${tag}: ${formattedAmount}`}</li>;
        })}
      </ul>
    </SectionContainer>
  );
};

const Graph: FC<{ id: string; months: number; transactions: TagGroup[] }> = ({
  id,
  months,
  transactions,
}) => (
  <>
    <div
      data-testid={`${id}-graph`}
      {...transactions.reduce(
        (dataTags, { tag, totalAmount }) => ({
          ...dataTags,
          [`data-tag-${tag.replace(' ', '-')}`]: totalAmount / months,
        }),
        {}
      )}
    />
    <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={formatData({ transactions })}
          dataKey="amount"
          fill="#8884d8"
          nameKey="name"
          outerRadius={80}
        />
      </PieChart>
    </ResponsiveContainer>
  </>
);

const formatData = ({
  transactions,
}: {
  transactions: TagGroup[];
}): { amount: number; name: string }[] =>
  transactions.map(({ tag, totalAmount }) => ({
    amount: totalAmount,
    fill: 'orange',
    name: tag,
  }));

export default TransactionsByTag;
