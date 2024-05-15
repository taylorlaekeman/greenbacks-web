import React, { useState } from 'react';

import { SpendingSummaryList } from 'components/SpendingSummaryList';
import useNow from 'hooks/useNow';
import useSpendingByDayOfMonth from 'hooks/useSpendingByDayOfMonth';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';

export function SpendingSummaryListPage(): React.ReactElement {
  const { now } = useNow();
  const { spending: currentMonthSpending } = useTransactionsByCategory({
    endDate: now.endOf('month').toISODate(),
    startDate: now.startOf('month').toISODate(),
  });
  const {
    spending: previousYearSpendingByDayOfMonth,
  } = useSpendingByDayOfMonth({
    endDate: now.minus({ months: 1 }).endOf('month').toISODate(),
    startDate: now.minus({ years: 1 }).startOf('month').toISODate(),
  });
  const [expandedTag, setExpandedTag] = useState<string | undefined>(undefined);
  const [visibleTagCount, setVisibleTagCount] = useState<number>(5);

  const comparisonSpendingByDate = Object.entries(
    previousYearSpendingByDayOfMonth ?? {}
  ).reduce((result, [day, spending]) => {
    const date = now.set({ day: parseInt(day, 10) }).toISODate();
    return { ...result, [date]: spending / 12 };
  }, {});

  return (
    <SpendingSummaryList
      comparisonSpendingByDate={comparisonSpendingByDate}
      endDate={now.endOf('month')}
      expandedTag={expandedTag}
      isCurrentMonth
      onChangeVisibleTagCount={setVisibleTagCount}
      onSelectTag={(tag) => setExpandedTag(tag)}
      startDate={now.startOf('month')}
      transactions={currentMonthSpending}
      visibleTagCount={visibleTagCount}
    />
  );
}
