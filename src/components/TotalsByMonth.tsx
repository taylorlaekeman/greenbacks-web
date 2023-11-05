import React, { FC, Fragment } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import Checkboxes from 'components/Checkboxes';
import LoadingIndicator from 'components/LoadingIndicator';
import SectionContainer from 'components/SectionContainer';
import useMultiselect from 'hooks/useMultiselect';
import useTotalsByMonth, { MonthTotals } from 'hooks/useTotalsByMonth';

const TotalsByMonth: FC = () => {
  const categories = [
    'Earning',
    'Earning Minus Saving',
    'Saving',
    'Spending',
    'Saving & Spending',
  ];
  const {
    onChange: onChangeVisibleCategories,
    selectedOptions: visibleCategories,
  } = useMultiselect({
    defaultValue: ['Earning Minus Saving', 'Spending'],
    options: categories,
  });
  const { isLoading, totalsByMonth } = useTotalsByMonth();

  if (isLoading)
    return (
      <SectionContainer id="totals-by-month" title="Totals by Month">
        <LoadingIndicator name="totals-by-month" />
      </SectionContainer>
    );

  return (
    <SectionContainer id="totals-by-month" title="Totals by Month">
      <Graph
        isEarningVisible={visibleCategories.includes('Earning')}
        isEarningMinusSavingVisible={visibleCategories.includes(
          'Earning Minus Saving'
        )}
        isSavingVisible={visibleCategories.includes('Saving')}
        isSavingAndSpendingVisible={visibleCategories.includes(
          'Saving & Spending'
        )}
        isSpendingVisible={visibleCategories.includes('Spending')}
        totalsByMonth={totalsByMonth}
      />
      <Checkboxes
        label="Categories"
        onChange={onChangeVisibleCategories}
        options={categories}
        selectedOptions={visibleCategories}
      />
    </SectionContainer>
  );
};

const Graph: FC<{
  isEarningVisible?: boolean;
  isEarningMinusSavingVisible?: boolean;
  isSavingVisible?: boolean;
  isSavingAndSpendingVisible?: boolean;
  isSpendingVisible?: boolean;
  totalsByMonth?: MonthTotals[];
}> = ({
  isEarningVisible = true,
  isEarningMinusSavingVisible = true,
  isSavingVisible = true,
  isSavingAndSpendingVisible = true,
  isSpendingVisible = true,
  totalsByMonth,
}) => (
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
      <LineChart data={formatData({ totalsByMonth })}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        {isEarningVisible && (
          <Line dataKey="earning" dot={false} stroke="green" />
        )}
        {isEarningMinusSavingVisible && (
          <Line dataKey="earningMinusSaving" dot={false} stroke="yellowgreen" />
        )}
        {isSavingVisible && <Line dataKey="saving" dot={false} stroke="blue" />}
        {isSpendingVisible && (
          <Line dataKey="spending" dot={false} stroke="orange" />
        )}
        {isSavingAndSpendingVisible && (
          <Line
            dataKey="savingAndSpending"
            dot={false}
            stroke="purple"
            strokeWidth={1}
          />
        )}
        <XAxis dataKey="name" interval="preserveStartEnd" reversed />
        <YAxis
          axisLine={false}
          tickFormatter={formatThousands}
          tickLine={false}
          width={30}
        />
      </LineChart>
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
    earningMinusSaving: difference(earning, saving),
    name: shortenMonth(month),
    saving: saving || 0,
    savingAndSpending: sum(saving, spending),
    spending: spending || 0,
  }));
  return result;
};

function sum(a: number | undefined, b: number | undefined): number {
  let total = 0;
  if (a) total += a;
  if (b) total += b;
  return total;
}

function difference(a: number | undefined, b: number | undefined): number {
  let total = 0;
  if (a) total += a;
  if (b) total -= b;
  return total;
}

function formatThousands(cents: number): string {
  const dollars = cents / 100;
  if (Math.abs(dollars) < 1000) return Math.round(dollars).toString();
  const hundreds = Math.round(dollars / 100);
  return `${hundreds / 10}k`;
}

function shortenMonth(month: string): string {
  const [monthName] = month.split(' ');
  return SHORT_MONTH_NAMES[monthName];
}

const SHORT_MONTH_NAMES: Record<string, string> = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'Aug',
  September: 'Sept',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};

export default TotalsByMonth;
