import React, { FC, Fragment } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useTotalsByMonth from 'hooks/useTotalsByMonth';

const TotalsByMonth: FC = () => {
  const { format } = useCurrencyFormatter();
  const { isLoading, totalsByMonth } = useTotalsByMonth();

  if (isLoading)
    return (
      <SectionContainer id="totals-by-month" title="Totals by Month">
        <LoadingIndicator name="totals-by-month" />
      </SectionContainer>
    );

  return (
    <SectionContainer id="totals-by-month" title="Totals by Month">
      {totalsByMonth?.map(({ earning, month, saving, spending }) => (
        <Fragment key={month}>
          <h4>{month}</h4>
          <ul>
            <li>
              Earning:&nbsp;
              {format({ value: earning })}
            </li>
            <li>
              Saving:&nbsp;
              {format({ value: saving })}
            </li>
            <li>
              Spending:&nbsp;
              {format({ value: spending })}
            </li>
          </ul>
        </Fragment>
      ))}
    </SectionContainer>
  );
};

export default TotalsByMonth;
