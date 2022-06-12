import React, { FC, Fragment } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useDailyExpenses from 'hooks/useDailyExpenses';
import useNow from 'hooks/useNow';

const MonthlyExpenses: FC = () => {
  const { now } = useNow();
  const { format } = useCurrencyFormatter();
  const month = now.toFormat('yyyy-LL');
  const { dailyExpenses, isLoading } = useDailyExpenses({ month });

  if (isLoading) return <LoadingIndicator name="monthly-expenses" />;

  return (
    <>
      {Object.entries(dailyExpenses || {}).map(([day, expenses]) => (
        <Fragment key={day}>
          <p>{day}</p>
          <ul>
            {expenses?.map(({ amount, id, merchant, name }) => {
              const formattedAmount = format({ value: amount });
              return (
                <li key={id}>{`${merchant} ${name} ${formattedAmount}`}</li>
              );
            })}
          </ul>
        </Fragment>
      ))}
    </>
  );
};

export default MonthlyExpenses;
