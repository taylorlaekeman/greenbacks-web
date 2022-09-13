import React, { FC, Fragment } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useMonth from 'hooks/useMonth';
import useTransactions from 'hooks/useTransactions';
import Transaction from 'types/transaction';

const MonthlyEarnings: FC = () => {
  const { endDate, startDate } = useMonth();
  const { earnings, isLoading } = useTransactions({ endDate, startDate });
  const { format } = useCurrencyFormatter();

  const earningsByDate = getTransactionsByDate({ transactions: earnings });

  if (isLoading)
    return (
      <SectionContainer id="monthly-earnings" title="Earnings">
        <LoadingIndicator name="monthly-earnings" />
      </SectionContainer>
    );

  return (
    <SectionContainer id="monthly-earnings" title="Earnings">
      {earningsByDate.map(({ date, transactions }) => (
        <Fragment key={date}>
          <p>{date}</p>
          <ul>
            {transactions.map(({ amount, id, merchant, name }) => (
              <li key={id}>
                {format({ value: amount })}
                &mdash;
                {merchant}
                &nbsp;&#40;
                {name}
                &#41;
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </SectionContainer>
  );
};

const getTransactionsByDate = ({
  transactions,
}: {
  transactions?: Transaction[];
}): { date: string; transactions: Transaction[] }[] => {
  if (!transactions) return [];
  const transactionsByDay = transactions.reduce(
    (result: Record<string, Transaction[]>, transaction: Transaction) => {
      const { datetime } = transaction;
      const existingTransactions = result[datetime] || [];
      return {
        ...result,
        [datetime]: [...existingTransactions, transaction],
      };
    },
    {}
  );
  return Object.entries(transactionsByDay)
    .map(([date, dailyTransactions]) => ({
      date,
      transactions: dailyTransactions,
    }))
    .sort(({ date: firstDate }, { date: secondDate }) =>
      firstDate > secondDate ? 1 : -1
    );
};

export default MonthlyEarnings;
