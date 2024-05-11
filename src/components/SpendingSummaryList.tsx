import React from 'react';
import styled from 'styled-components';

import List, { Item } from 'components/List';
import Transaction from 'components/Transaction';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import type TransactionType from 'types/transaction';
import datetime from 'utils/datetime';
import {
  GroupBy,
  groupTransactions,
  SortGroupsBy,
  SortTransactionsBy,
} from 'utils/groupTransactions';

export function SpendingSummaryList({
  areAllTagsVisible = false,
  endDate,
  expandedTag,
  isCurrentMonth = false,
  month,
  startDate,
  transactions = [],
  visibleTagCount = 5,
}: {
  areAllTagsVisible?: boolean;
  endDate?: datetime;
  expandedTag?: string;
  isCurrentMonth?: boolean;
  month?: datetime;
  startDate?: datetime;
  transactions?: TransactionType[];
  visibleTagCount?: number;
}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  const totalSpending = getTotalSpending({ transactions });
  const groupedTransactions =
    groupTransactions({
      groupBy: GroupBy.Tag,
      sortGroupsBy: SortGroupsBy.Total,
      sortTransactionsBy: SortTransactionsBy.Amount,
      transactions,
    }) ?? [];
  const tagCutoffIndex = areAllTagsVisible
    ? groupedTransactions.length
    : visibleTagCount;
  const visibleTagAmounts = groupedTransactions.slice(0, tagCutoffIndex);
  const remainingTagAmounts = groupedTransactions.slice(tagCutoffIndex);
  const remainingSpendingAmount = remainingTagAmounts.reduce(
    (totalSoFar, group) => totalSoFar + group.total,
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
        {visibleTagAmounts.map(
          ({ key, total, transactions: visibleTransactions }) => (
            <TagAmount key={key}>
              <p>{format(total)}</p>
              <p>{key}</p>
              {key === expandedTag && (
                <List>
                  {visibleTransactions.map((transaction) => (
                    <Item key={transaction.id}>
                      <Transaction
                        isBadgeVisible={false}
                        isDateVisible={false}
                        isFilteringEnabled={false}
                        transaction={transaction}
                      />
                    </Item>
                  ))}
                </List>
              )}
            </TagAmount>
          )
        )}
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
  transactions: TransactionType[];
}): number {
  return transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
}

const Wrapper = styled.div`
  border: solid lightgrey 1px;
  border-radius: 4px;
  min-width: 250px;

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
