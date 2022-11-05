import React, { FC, Fragment } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';

import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useTotalsByMonth, { MonthTotals } from 'hooks/useTotalsByMonth';

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
      <Graph totalsByMonth={totalsByMonth} />
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

const Graph: FC<{ totalsByMonth?: MonthTotals[] }> = ({ totalsByMonth }) => (
  <>
    <div
      data-testid="totals-by-month-graph"
      {...totalsByMonth?.reduce(
        (dataTags, { earning, month, saving, spending }) => ({
          ...dataTags,
          [`data-total-${month.replace(
            ' ',
            '-'
          )}`]: `earning-${earning}-saving-${saving}-spending-${spending}`,
        }),
        {}
      )}
    />
    <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
      <BarChart barGap={0} data={formatData({ totalsByMonth })}>
        <Bar dataKey="earning" fill="green" />
        <Bar dataKey="saving" fill="blue" />
        <Bar dataKey="spending" fill="orange" />
        <XAxis dataKey="name" interval="preserveStartEnd" reversed />
      </BarChart>
    </ResponsiveContainer>
  </>
);

const formatData = ({
  totalsByMonth,
}: {
  totalsByMonth?: MonthTotals[];
}): { earning: number; name: string; saving: number; spending: number }[] => {
  if (!totalsByMonth) return [];
  const result = totalsByMonth.map(({ earning, month, saving, spending }) => ({
    earning: earning || 0,
    name: month,
    saving: saving || 0,
    spending: spending || 0,
  }));
  return result;
};

export default TotalsByMonth;
