import React, { FC, Fragment } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useCurrentMonth from 'hooks/useCurrentMonth';
import useDailyExpenses from 'hooks/useDailyExpenses';

const MonthlyExpenses: FC = () => {
  const { datetime, iso } = useCurrentMonth();
  const { format } = useCurrencyFormatter();
  const { dailyExpenses, isLoading } = useDailyExpenses({
    month: iso,
  });

  if (isLoading) return <LoadingIndicator name="monthly-expenses" />;

  return (
    <>
      <p>{datetime.toLocaleString({ month: 'long', year: 'numeric' })}</p>
      {Object.entries(dailyExpenses || {}).map(([day, expenses]) => (
        <Fragment key={day}>
          <p>{day}</p>
          <ul>
            {expenses?.map(({ amount, id, merchant, name }) => {
              const formattedAmount = format({ value: amount });
              return (
                <li key={id}>
                  {formattedAmount}
                  &mdash;
                  {merchant || 'no merchant'}
                  &nbsp; &#40;
                  {name}
                  &#41;
                </li>
              );
            })}
          </ul>
        </Fragment>
      ))}
    </>
  );
};

export default MonthlyExpenses;
