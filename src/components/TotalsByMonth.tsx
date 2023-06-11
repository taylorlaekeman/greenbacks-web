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
      <table>
        <thead>
          <tr>
            <td />
            <th>Earning</th>
            <th>Saving</th>
            <th>Spending</th>
          </tr>
        </thead>
        <tbody>
          {totalsByMonth?.map(({ earning, month, saving, spending }) => {
            const monthId = month.replace(' ', '-').toLowerCase();
            return (
              <tr key={monthId}>
                <th>{month}</th>
                <td aria-label={`${monthId}-earning`}>
                  {format({ value: earning })}
                </td>
                <td aria-label={`${monthId}-saving`}>
                  {format({ value: saving })}
                </td>
                <td aria-label={`${monthId}-spending`}>
                  {format({ value: spending })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </SectionContainer>
  );
};

const Graph: FC<{ totalsByMonth?: MonthTotals[] }> = ({ totalsByMonth }) => (
  <>
    <div
      data-testid="totals-by-month-graph"
      {...totalsByMonth?.reduce(
        (dataTags, { earning, month, saving, spending }) => {
          const key = `data-month-${month.replace(' ', '-')}`.toLowerCase();
          return {
            ...dataTags,
            [key]: `earning-${earning}-saving-${saving}-spending-${spending}`,
          };
        },
        {}
      )}
    />
    <ResponsiveContainer aspect={1.5} minWidth={300} width="100%">
      <BarChart barGap={0} data={formatData({ totalsByMonth })}>
        <Bar dataKey="earning" fill="green" stackId="a" />
        <Bar dataKey="spending" fill="orange" stackId="b" />
        <Bar dataKey="saving" fill="blue" stackId="b" />
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
