import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useExpenses from 'hooks/useExpenses';
import datetime from 'utils/datetime';

const Expenses: FC = () => {
  const { format } = useCurrencyFormatter();
  const { month } = useParams();
  const parsedMonth = datetime.fromISO(month || '2020-01');
  const startDate = parsedMonth.startOf('month').toISODate();
  const endDate = parsedMonth.endOf('month').toISODate();
  const { expenses, isLoading } = useExpenses({ endDate, startDate });
  if (isLoading) return <LoadingIndicator name="expenses-list" />;
  return (
    <ul data-testid="monthly-expenses-list">
      {expenses?.map(({ amount, id, name }) => (
        <li key={id}>
          {`${name} ${format({
            value: amount,
          })}`}
        </li>
      ))}
    </ul>
  );
};

export default Expenses;
