import { DateTime } from 'luxon';
import React from 'react';

import { MonthlyAmountsGraph } from 'components/MonthlyAmountsGraph';
import { Panel, PanelBody } from 'components/Panel';
import { Size, Text } from 'components/Text';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useNow from 'hooks/useNow';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction from 'types/transaction';
import { GroupBy, groupTransactions } from 'utils/groupTransactions';

export function CategoryAverageSummary({
  transactions = [],
}: { transactions?: Transaction[] } = {}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  const transactionsByMonth = groupTransactions({
    groupBy: GroupBy.Month,
    transactions,
  });
  if (!transactionsByMonth) return <div>empty</div>;
  const graphData = {
    Spending: transactionsByMonth
      .map((group) => ({
        amount: group.total,
        month: DateTime.fromISO(group.key),
      }))
      .sort((a, b) => (a.month > b.month ? 1 : -1)),
  };
  const averageMonthlySpending =
    transactionsByMonth.reduce((result, group) => result + group.total, 0) / 12;
  return (
    <Panel>
      <PanelBody hasBottomBorder>
        <Text>On average each month you&apos;ve spent</Text>
        <Text size={Size.Large}>{format(averageMonthlySpending)}</Text>
      </PanelBody>
      <PanelBody>
        <MonthlyAmountsGraph
          hasLegend={false}
          monthlyAmountsBySeriesName={graphData}
        />
      </PanelBody>
    </Panel>
  );
}

export function CategoryAverageSummaryContainer(): React.ReactElement {
  const { now } = useNow();
  const endDate = now.minus({ months: 1 }).endOf('month').toISODate();
  const startDate = now.minus({ years: 1 }).startOf('month').toISODate();
  const { spending } = useTransactionsByCategory({
    endDate,
    startDate,
  });
  return <CategoryAverageSummary transactions={spending} />;
}
