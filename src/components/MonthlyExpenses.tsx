import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useExpenses from 'hooks/useExpenses';
import useNow from 'hooks/useNow';

const MonthlyExpenses: FC = () => {
  const { now } = useNow();
  const startDate = now.startOf('month').toISODate();
  const endDate = now.endOf('month').toISODate();
  const { expenses, isLoading } = useExpenses({ endDate, startDate });
  const { format } = useCurrencyFormatter();

  if (isLoading) return <LoadingIndicator name="monthly-expenses" />;

  return (
    <ul>
      {expenses?.map(({ amount, datetime, id, merchant, name }) => {
        const formattedAmount = format({ value: amount });
        return (
          <li key={id}>
            {`${datetime} ${merchant} ${name} ${formattedAmount}`}
          </li>
        );
      })}
    </ul>
  );
};

export default MonthlyExpenses;
