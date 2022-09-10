import React, { FC, Fragment } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useDailyExpenses from 'hooks/useDailyExpenses';
import useMonth from 'hooks/useMonth';

const MonthlyExpenses: FC = () => {
  const { iso: month } = useMonth();
  const { format } = useCurrencyFormatter();
  const { dailyExpenses, isLoading } = useDailyExpenses({
    month,
  });

  if (isLoading)
    return (
      <SectionContainer id="monthly-expenses" title="Expenses">
        <LoadingIndicator name="monthly-expenses" />
      </SectionContainer>
    );

  return (
    <SectionContainer id="monthly-expenses" title="Expenses">
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
    </SectionContainer>
  );
};

export default MonthlyExpenses;
