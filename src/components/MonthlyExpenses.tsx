import React, { FC, Fragment, useState } from 'react';

import Button from 'components/Button';
import LoadingIndicator from 'components/LoadingIndicator';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useCurrentMonth from 'hooks/useCurrentMonth';
import useDailyExpenses from 'hooks/useDailyExpenses';
import useNextMonth from 'hooks/useNextMonth';
import usePreviousMonth from 'hooks/usePreviousMonth';
import useReadableMonth from 'hooks/useReadableMonth';

const MonthlyExpenses: FC = () => {
  const { iso: currentMonth } = useCurrentMonth();
  const [month, setMonth] = useState(currentMonth);
  const { iso: nextMonth } = useNextMonth({ iso: month });
  const { iso: previousMonth } = usePreviousMonth({ iso: month });
  const { month: readableMonth } = useReadableMonth({ iso: month });
  const { format } = useCurrencyFormatter();
  const { dailyExpenses, isLoading } = useDailyExpenses({
    month,
  });

  if (isLoading) return <LoadingIndicator name="monthly-expenses" />;

  return (
    <>
      <p>{readableMonth}</p>
      <Button onClick={() => setMonth(previousMonth)}>
        Go to previous month
      </Button>
      <Button onClick={() => setMonth(nextMonth)}>Go to next month</Button>
      {Object.entries(dailyExpenses || {}).map(([day, expenses]) => (
        <Fragment key={day}>
          <p>{day}</p>
          <ul>
            {expenses?.map(({ amount, category, id, merchant, name, tag }) => {
              const formattedAmount = format({ value: amount });
              return (
                <li key={id}>
                  {formattedAmount}
                  &mdash;
                  {merchant || 'no merchant'}
                  &nbsp; &#40;
                  {name}
                  &#41; &nbsp;
                  {category}
                  &nbsp;
                  {tag}
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
