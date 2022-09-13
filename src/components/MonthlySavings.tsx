import React, { FC, Fragment } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useMonth from 'hooks/useMonth';
import useTransactions from 'hooks/useTransactions';
import getTransactionsByDate from 'utils/getTransactionsByDate';

const MonthlySavings: FC = () => {
  const { endDate, startDate } = useMonth();
  const { isLoading, savings } = useTransactions({ endDate, startDate });
  const { format } = useCurrencyFormatter();

  const savingsByDate = getTransactionsByDate({ transactions: savings });

  if (isLoading)
    return (
      <SectionContainer id="monthly-savings" title="Savings">
        <LoadingIndicator name="monthly-savings" />
      </SectionContainer>
    );

  return (
    <SectionContainer id="monthly-savings" title="Savings">
      {savingsByDate.map(({ date, transactions }) => (
        <Fragment key={date}>
          <p>{date}</p>
          <ul>
            {transactions.map(({ amount, id, merchant, name, tag }) => (
              <li key={id}>
                {format({ value: amount })}
                &mdash;
                {merchant}
                &nbsp;&#40;
                {name}
                &#41;&nbsp;
                {tag}
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </SectionContainer>
  );
};

export default MonthlySavings;
