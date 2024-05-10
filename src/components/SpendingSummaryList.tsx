import React from 'react';
import styled from 'styled-components';

import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import type Transaction from 'types/transaction';
import datetime from 'utils/datetime';

export function SpendingSummaryList({
  areAllTagsVisible = false,
  endDate,
  isCurrentMonth = false,
  month,
  startDate,
  transactions = [],
  visibleTagCount = 5,
}: {
  areAllTagsVisible?: boolean;
  endDate?: datetime;
  isCurrentMonth?: boolean;
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
  const tagCutoffIndex = areAllTagsVisible
    ? tagsByTotalAmount.length
    : visibleTagCount;
  const visibleTagAmounts = tagsByTotalAmount.slice(0, tagCutoffIndex);
  const remainingTagAmounts = tagsByTotalAmount.slice(tagCutoffIndex);
  const remainingSpendingAmount = remainingTagAmounts.reduce(
    (totalSoFar, tagAmount) => totalSoFar + tagAmount[1],
    0
  );
  return (
    <Wrapper>
      <Header>
        <DateRange>
          {getSpendingPeriodText({ endDate, isCurrentMonth, month, startDate })}
        </DateRange>
        <Amount>{format(totalSpending)}</Amount>
      </Header>
      <TagList>
        {visibleTagAmounts.map(([tag, amount]) => (
          <TagAmount key={tag}>
            <p>{format(amount)}</p>
            <p>{tag}</p>
          </TagAmount>
        ))}
        {remainingSpendingAmount > 0 && (
          <TagAmount>
            <p>{format(remainingSpendingAmount)}</p>
            <p>All other spending</p>
          </TagAmount>
        )}
      </TagList>
    </Wrapper>
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
      const tag = transaction.tag ?? 'Untagged';
      const totalSoFar = totalsByTag[tag] ?? 0;
      return {
        ...totalsByTag,
        [tag]: totalSoFar + transaction.amount,
      };
    },
    {}
  );
}

const Wrapper = styled.div`
  border: solid lightgrey 1px;
  border-radius: 4px;

  & p {
    margin: 0;
  }
`;

const Header = styled.div`
  border-bottom: solid lightgrey 1px;
  margin-bottom: 0;
  padding: 16px;
`;

const DateRange = styled.p`
  font-size: 0.9rem;
  padding-bottom: 8px;
`;

const Amount = styled.p`
  font-size: 2rem;
`;

const TagList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const TagAmount = styled.li`
  border-bottom: solid lightgrey 1px;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;

  &:last-child {
    border-bottom: none;
  }
`;

function getSpendingPeriodText({
  endDate,
  isCurrentMonth = false,
  month,
  startDate,
}: {
  endDate?: datetime;
  isCurrentMonth?: boolean;
  month?: datetime;
  startDate?: datetime;
}): string | undefined {
  if (isCurrentMonth) return "This month you've spent";
  if (month)
    return `In ${month.toLocaleString({
      month: 'long',
      year: 'numeric',
    })} you spent`;
  if (startDate && !endDate)
    return `Since ${startDate.toLocaleString(datetime.DATE_FULL)} you've spent`;
  if (startDate && endDate)
    return `Between ${startDate.toLocaleString(
      datetime.DATE_MED
    )} and ${endDate.toLocaleString(datetime.DATE_MED)} you spent`;
  return undefined;
}
