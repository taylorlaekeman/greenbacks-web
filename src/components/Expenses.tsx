import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import useExpenses from 'hooks/useExpenses';
import datetime from 'utils/datetime';
import formatCurrency from 'utils/formatCurrency';

const Expenses: FC = () => {
  const { month } = useParams();
  const parsedMonth = datetime.fromISO(month || '2020-01');
  const startDate = parsedMonth.startOf('month').toISODate();
  const endDate = parsedMonth.endOf('month').toISODate();
  const { expenses, isLoading } = useExpenses({ endDate, startDate });
  if (isLoading) return <LoadingIndicator name="expenses-list" />;
  return (
    <ul data-testid="monthly-expenses-list">
      {expenses.map(({ amount, id, name }) => (
        <li key={id}>
          {`${name} ${formatCurrency({
            cents: amount,
          })}`}
        </li>
      ))}
    </ul>
  );
};

export default Expenses;
