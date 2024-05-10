import React from 'react';

import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import type Transaction from 'types/transaction';
import datetime from 'utils/datetime';

export function SpendingSummaryList({
  endDate,
  isCurrentMonth = false,
  isYearVisible = false,
  month,
  startDate,
  transactions = [],
  visibleTagCount = 5,
}: {
  endDate?: datetime;
  isCurrentMonth?: boolean;
  isYearVisible?: boolean;
  month?: datetime;
  startDate?: datetime;
  transactions?: Transaction[];
  visibleTagCount?: number;
}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  const totalSpending = getTotalSpending({ transactions });
  const totalSpendingByTag = getTotalSpendingByTag({ transactions });
  const tagsByTotalAmount = Object.entries(totalSpendingByTag).sort((a, b) =>
    a[1] > b[1] ? -1 : 1
  );
  const visibleTagAmounts = tagsByTotalAmount.slice(0, visibleTagCount);
  const remainingTagAmounts = tagsByTotalAmount.slice(visibleTagCount);
  const remainingSpendingAmount = remainingTagAmounts.reduce(
    (totalSoFar, tagAmount) => totalSoFar + tagAmount[1],
    0
  );
  const summaryText = getSummaryText({
    endDate,
    formattedAmount: format(totalSpending),
    isCurrentMonth,
    isYearVisible,
    month,
    startDate,
  });
  return (
    <>
      <p>{summaryText}</p>
      <p>Your top spending categories are:</p>
      <ul>
        {visibleTagAmounts.map(([tag, amount]) => (
          <li key={tag}>
            {tag}: {format(amount)}
          </li>
        ))}
        {remainingSpendingAmount > 0 && (
          <li>All other spending: {format(remainingSpendingAmount)}</li>
        )}
      </ul>
    </>
  );
}

function getTotalSpending({
  transactions,
}: {
  transactions: Transaction[];
}): number {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
}

function getTotalSpendingByTag({
  transactions,
}: {
  transactions: Transaction[];
}): Record<string, number> {
  return transactions.reduce<Record<string, number>>(
    (totalsByTag, transaction) => {
      if (transaction.tag === undefined) return totalsByTag;
      const totalSoFar = totalsByTag[transaction.tag] ?? 0;
      return {
        ...totalsByTag,
        [transaction.tag]: totalSoFar + transaction.amount,
      };
    },
    {}
  );
}

function getSummaryText({
  endDate,
  formattedAmount,
  isCurrentMonth = false,
  isYearVisible = false,
  month,
  startDate,
}: {
  endDate?: datetime;
  formattedAmount: string;
  isCurrentMonth?: boolean;
  isYearVisible?: boolean;
  month?: datetime;
  startDate?: datetime;
}): string {
  if (isCurrentMonth) return `You've spent ${formattedAmount} this month`;
  if (month)
    return `You spent ${formattedAmount} in ${getReadableMonth({
      isYearVisible,
      month,
    })}`;
  if (startDate)
    return `You've spent ${formattedAmount} ${getReadableDateRange({
      isYearVisible,
      startDate,
    })}`;
  if (startDate && endDate)
    return `You spent ${formattedAmount} ${getReadableDateRange({
      endDate,
      isYearVisible,
      startDate,
    })}`;
  return `You've spent ${formattedAmount}`;
}

function getReadableMonth({
  isYearVisible = false,
  month,
}: {
  isYearVisible?: boolean;
  month: datetime;
}): string {
  if (isYearVisible) return month.toFormat('MMMM yyyy');
  return month.toFormat('MMMM');
}

function getReadableDateRange({
  endDate,
  isYearVisible = false,
  startDate,
}: {
  endDate?: datetime;
  isYearVisible?: boolean;
  startDate: datetime;
}): string {
  const dateFormat = isYearVisible ? 'DDD' : 'MMMM d';
  if (!endDate) return `since ${startDate.toFormat(dateFormat)}`;
  return `between ${startDate.toFormat(dateFormat)} and ${endDate.toFormat(
    dateFormat
  )}`;
}
