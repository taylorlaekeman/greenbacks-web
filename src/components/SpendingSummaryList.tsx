import React from 'react';

import { Button, ButtonStyle } from 'components/Button';
import { Icon, IconType } from 'components/Icon';
import { JustifiedRow, Space } from 'components/JustifiedRow';
import List, { Item } from 'components/List';
import { Panel, PanelBody, PanelHeader } from 'components/Panel';
import { PureSpendingTimeline as SpendingTimeline } from 'components/SpendingTimeline';
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
  comparisonSpendingByDate = {},
  endDate,
  expandedTag,
  isCurrentMonth = false,
  month,
  onChangeVisibleTagCount = noop,
  onSelectTag = noop,
  startDate,
  transactions = [],
  visibleTagCount = 5,
}: {
  areAllTagsVisible?: boolean;
  comparisonSpendingByDate?: Record<string, number>;
  endDate?: datetime;
  expandedTag?: string;
  isCurrentMonth?: boolean;
  month?: datetime;
  onChangeVisibleTagCount?: (input: number) => void;
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
  const remainingTransactions = remainingTagAmounts
    .flatMap((group) => group.transactions)
    .sort((a, b) => (a.amount > b.amount ? -1 : 1));
  const canIncreaseVisibleTagCount =
    groupedTransactions.length > visibleTagCount;
  const actualVisibleTagCount = Math.min(
    visibleTagCount,
    groupedTransactions.length
  );
  const canDecreaseVisibleTagCount = actualVisibleTagCount > 1;
  return (
    <Panel>
      <PanelHeader hasBottomBorder={visibleTagAmounts.length > 0} isColumnar>
        <Text>
          {getSpendingPeriodText({ endDate, isCurrentMonth, month, startDate })}
        </Text>
        <Text size={Size.Large}>{format(totalSpending)}</Text>
      </PanelHeader>
      <PanelBody hasBottomBorder>
        <SpendingTimeline
          comparisonLabel="average"
          comparisonSpendingByDate={comparisonSpendingByDate}
          endDate={endDate}
          startDate={startDate}
          transactions={transactions}
        />
      </PanelBody>
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
                  onExpand={() => {
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
              isExpanded={expandedTag === 'other'}
              onExpand={() => {
                const tagToReport =
                  expandedTag === 'other' ? undefined : 'other';
                onSelectTag(tagToReport);
              }}
              tag="All other transactions"
              total={remainingSpendingAmount}
              transactions={remainingTransactions}
            />
          )}
          <Item>
            <JustifiedRow>
              <Text size={Size.Small}>
                {actualVisibleTagCount} of {groupedTransactions.length} tag
                {groupedTransactions.length !== 1 && 's'} visible
              </Text>
              <JustifiedRow space={Space.Small}>
                {canIncreaseVisibleTagCount && (
                  <Button
                    isDisabled={!canIncreaseVisibleTagCount}
                    onClick={() => {
                      onChangeVisibleTagCount(visibleTagCount + 1);
                    }}
                    style={ButtonStyle.Unstyled}
                  >
                    <Icon icon={IconType.Plus} />
                  </Button>
                )}
                {canDecreaseVisibleTagCount && (
                  <Button
                    onClick={() => {
                      const currentTagCount = Math.min(
                        visibleTagCount,
                        visibleTagAmounts.length
                      );
                      const newTagCount = Math.max(currentTagCount - 1, 1);
                      onChangeVisibleTagCount(newTagCount);
                    }}
                    style={ButtonStyle.Unstyled}
                  >
                    <Icon icon={IconType.Minus} />
                  </Button>
                )}
              </JustifiedRow>
            </JustifiedRow>
          </Item>
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
  onExpand = noop,
  tag,
  total,
  transactions = [],
}: {
  isExpanded?: boolean;
  isFirstTag?: boolean;
  isLastTag?: boolean;
  onExpand?: () => void;
  tag: string;
  total: number;
  transactions?: TransactionType[];
}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  if (!isExpanded)
    return (
      <Item>
        <Button isFullWidth onClick={onExpand} style={ButtonStyle.Unstyled}>
          <JustifiedRow>
            <Text>{format(total)}</Text>
            <Text isUnderlined size={Size.Small}>
              {tag}
            </Text>
          </JustifiedRow>
        </Button>
      </Item>
    );
  return (
    <Panel hasBorder={false} hasTopBorder={!isFirstTag}>
      <PanelHeader isShort>
        <Button isFullWidth onClick={onExpand} style={ButtonStyle.Unstyled}>
          <JustifiedRow>
            <Text isBold>{format(total)}</Text>
            <Text isBold isUnderlined size={Size.Small}>
              {tag}
            </Text>
          </JustifiedRow>
        </Button>
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
            <Transaction
              isCompact
              isFilteringEnabled
              transaction={transaction}
            />
          </Item>
        ))}
      </List>
    </Panel>
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
