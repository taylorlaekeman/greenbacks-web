import React from 'react';

import { Button, ButtonStyle } from 'components/Button';
import { JustifiedRow } from 'components/JustifiedRow';
import List, { Item } from 'components/List';
import { Panel, PanelHeader } from 'components/Panel';
import { Size, Text } from 'components/Text';
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
import noop from 'utils/noop';

export function SpendingSummaryList({
  areAllTagsVisible = false,
  endDate,
  expandedTag,
  isCurrentMonth = false,
  month,
  onSelectTag = noop,
  startDate,
  transactions = [],
  visibleTagCount = 5,
}: {
  areAllTagsVisible?: boolean;
  endDate?: datetime;
  expandedTag?: string;
  isCurrentMonth?: boolean;
  month?: datetime;
  onSelectTag?: (input: string | undefined) => void;
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
    <Panel>
      <PanelHeader hasBottomBorder={visibleTagAmounts.length > 0} isColumnar>
        <Text>
          {getSpendingPeriodText({ endDate, isCurrentMonth, month, startDate })}
        </Text>
        <Text size={Size.Large}>{format(totalSpending)}</Text>
      </PanelHeader>
      {visibleTagAmounts.length > 0 && (
        <List
          hasOutsideBorder={false}
          hasRoundedBottomCorners
          hasRoundedTopCorners={false}
        >
          {visibleTagAmounts.map(
            ({ key: tag, total, transactions: visibleTransactions }, index) => {
              const isExpanded = tag === expandedTag;
              return (
                <TagAmount
                  isExpanded={isExpanded}
                  isFirstTag={index === 0}
                  isLastTag={index === groupedTransactions.length - 1}
                  onClick={() => {
                    const tagToReport = isExpanded ? undefined : tag;
                    onSelectTag(tagToReport);
                  }}
                  key={tag}
                  tag={tag}
                  total={total}
                  transactions={visibleTransactions}
                />
              );
            }
          )}
          {remainingSpendingAmount > 0 && (
            <TagAmount
              tag="All other transactions"
              total={remainingSpendingAmount}
            />
          )}
        </List>
      )}
    </Panel>
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

function TagAmount({
  isExpanded = false,
  isFirstTag = false,
  isLastTag = false,
  onClick = noop,
  tag,
  total,
  transactions = [],
}: {
  isExpanded?: boolean;
  isFirstTag?: boolean;
  isLastTag?: boolean;
  onClick?: () => void;
  tag: string;
  total: number;
  transactions?: TransactionType[];
}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  if (!isExpanded)
    return (
      <Item>
        <Button onClick={onClick} style={ButtonStyle.Unstyled}>
          <JustifiedRow>
            <Text>{format(total)}</Text>
            <Text>{tag}</Text>
          </JustifiedRow>
        </Button>
      </Item>
    );
  return (
    <Button onClick={onClick} style={ButtonStyle.Unstyled}>
      <Panel hasBorder={false} hasTopBorder={!isFirstTag}>
        <PanelHeader isShort>
          <Text isBold>{format(total)}</Text>
          <Text isBold>{tag}</Text>
        </PanelHeader>
        <List
          hasOutsideBorder={false}
          hasRoundedBottomCorners={isLastTag}
          hasRoundedTopCorners={false}
          isIndented
          isInset
        >
          {transactions.map((transaction) => (
            <Item key={transaction.id}>
              <Transaction isCompact transaction={transaction} />
            </Item>
          ))}
        </List>
      </Panel>
    </Button>
  );
}

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
