import React, { FC, Fragment } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCategorizedTransactions from 'hooks/useCategorizedTransactions';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useMonth from 'hooks/useMonth';
import getTransactionsByDate from 'utils/getTransactionsByDate';

const MonthlyExpenses: FC = () => {
  const { endDate, startDate } = useMonth();
  const { format } = useCurrencyFormatter();
  const { isLoading, spending } = useCategorizedTransactions({
    endDate,
    startDate,
  });
  const spendingByDate = getTransactionsByDate({ transactions: spending });

  if (isLoading)
    return (
      <SectionContainer id="monthly-expenses" title="Spending">
        <LoadingIndicator name="monthly-expenses" />
      </SectionContainer>
    );

  return (
    <SectionContainer id="monthly-expenses" title="Spending">
      {spendingByDate.map(({ date, transactions }) => (
        <Fragment key={date}>
          <p>{date}</p>
          <ul>
            {transactions?.map(({ amount, id, merchant, name, tag }) => {
              const formattedAmount = format({ value: amount });
              return (
                <li key={id}>
                  {formattedAmount}
                  &mdash;
                  {merchant || 'no merchant'}
                  &nbsp;&#40;
                  {name}
                  &#41;&nbsp;
                  {tag}
                </li>
              );
            })}
          </ul>
        </Fragment>
      ))}
    </SectionContainer>
  );
};

export default MonthlyExpenses;
