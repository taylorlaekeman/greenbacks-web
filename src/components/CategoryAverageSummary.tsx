import { DateTime } from 'luxon';
import React, { useState } from 'react';

import { Button, ButtonStyle } from 'components/Button';
import { Icon, IconType } from 'components/Icon';
import { JustifiedRow as Row, Space } from 'components/JustifiedRow';
import List, { Item } from 'components/List';
import { MonthlyAmountsGraph } from 'components/MonthlyAmountsGraph';
import { Panel, PanelBody } from 'components/Panel';
import { Size, Text } from 'components/Text';
import useCurrencyFormatter from 'hooks/useCurrencyFormatter';
import useNow from 'hooks/useNow';
import useTransactionsByCategory from 'hooks/useTransactionsByCategory';
import Transaction from 'types/transaction';
import {
  Group,
  GroupBy,
  groupTransactions,
  SortGroupsBy,
} from 'utils/groupTransactions';
import noop from 'utils/noop';

export function CategoryAverageSummary({
  endDate,
  expandedTag,
  onChangeVisibleTagCount = noop,
  onSelectTag = noop,
  startDate,
  transactions = [],
  visibleTagCount = 5,
}: {
  endDate?: DateTime;
  expandedTag?: string;
  onChangeVisibleTagCount?: (input: number) => void;
  onSelectTag?: (input: string | undefined) => void;
  startDate?: DateTime;
  transactions?: Transaction[];
  visibleTagCount?: number;
} = {}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  const transactionsByMonth = groupTransactions({
    groupBy: GroupBy.Month,
    transactions,
  });
  if (!transactionsByMonth) return <div>empty</div>;
  const graphData = formatGroupsForGraph({
    groups: transactionsByMonth,
    seriesName: 'Spending',
  });
  const averageMonthlySpending =
    transactionsByMonth.reduce((result, group) => result + group.total, 0) / 12;
  const transactionsByTag = groupTransactions({
    groupBy: GroupBy.Tag,
    sortGroupsBy: SortGroupsBy.Total,
    transactions,
  });
  const transactionsByTagAndMonth = transactionsByTag?.map<{
    average: number;
    tag: string;
    transactionsByMonth: Group[];
  }>((group) => {
    const tagTransactionsByMonth = groupTransactions({
      groupBy: GroupBy.Month,
      transactions: group.transactions,
    });
    return {
      average: group.total / 12,
      tag: group.key,
      transactionsByMonth: tagTransactionsByMonth ?? [],
    };
  });
  const allTags = Object.keys(transactionsByTag ?? {});
  const visibleTransactionGroups =
    transactionsByTagAndMonth?.slice(0, visibleTagCount) ?? [];
  const remainingTagsAmount = (
    transactionsByTagAndMonth?.slice(visibleTagCount, allTags.length) ?? []
  ).reduce((sum, group) => sum + group.average, 0);
  return (
    <Panel>
      <PanelBody hasBottomBorder>
        <Text size={Size.Small}>On average each month you&apos;ve spent</Text>
        <Text size={Size.Large}>{format(averageMonthlySpending)}</Text>
      </PanelBody>
      <PanelBody hasBottomBorder>
        <MonthlyAmountsGraph
          endDate={endDate}
          hasLegend={false}
          monthlyAmountsBySeriesName={graphData}
          startDate={startDate}
        />
      </PanelBody>
      <List
        hasOutsideBorder={false}
        hasRoundedBottomCorners
        hasRoundedTopCorners={false}
      >
        {visibleTransactionGroups &&
          visibleTransactionGroups.map(
            ({ average, tag, transactionsByMonth: transactionGroups }) => (
              <ExpandableTagAmount
                amount={average}
                endDate={endDate}
                isExpanded={expandedTag === tag}
                key={tag}
                onCollapse={() => onSelectTag(undefined)}
                onExpand={() => onSelectTag(tag)}
                startDate={startDate}
                tag={tag}
                transactionsByMonth={transactionGroups}
              />
            )
          )}
        {remainingTagsAmount > 0 && (
          <ExpandableTagAmount
            amount={remainingTagsAmount}
            tag="All other transactions"
          />
        )}
        <Item>
          <TagVisibilityController
            onChangeVisibleTagCount={onChangeVisibleTagCount}
            totalTagCount={allTags.length}
            visibleTagCount={visibleTagCount}
          />
        </Item>
      </List>
    </Panel>
  );
}

function formatGroupsForGraph({
  groups,
  seriesName,
}: {
  groups: Group[];
  seriesName: string;
}) {
  return {
    [seriesName]: groups
      .map((group) => ({
        amount: group.total,
        month: DateTime.fromISO(group.key),
      }))
      .sort((a, b) => (a.month > b.month ? 1 : -1)),
  };
}

function ExpandableTagAmount({
  amount,
  endDate,
  isExpanded = false,
  onCollapse = noop,
  onExpand = noop,
  startDate,
  tag,
  transactionsByMonth = [],
}: {
  amount: number;
  endDate?: DateTime;
  isExpanded?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
  startDate?: DateTime;
  tag: string;
  transactionsByMonth?: Group[];
}): React.ReactElement {
  const formattedGroups = formatGroupsForGraph({
    groups: transactionsByMonth,
    seriesName: tag,
  });
  if (!isExpanded)
    return (
      <Item>
        <ExpandableTagAmountHeader
          amount={amount}
          isExpanded={isExpanded}
          onClick={onExpand}
          tag={tag}
        />
      </Item>
    );
  return (
    <Item hasPadding={false}>
      <Panel hasBorder={false}>
        <PanelBody hasBottomBorder>
          <ExpandableTagAmountHeader
            amount={amount}
            isExpanded={isExpanded}
            onClick={onCollapse}
            tag={tag}
          />
        </PanelBody>
        <PanelBody isInset>
          <MonthlyAmountsGraph
            endDate={endDate}
            hasLegend={false}
            monthlyAmountsBySeriesName={formattedGroups}
            startDate={startDate}
          />
        </PanelBody>
      </Panel>
    </Item>
  );
}

function ExpandableTagAmountHeader({
  amount,
  isExpanded = false,
  onClick = noop,
  tag,
}: {
  amount: number;
  isExpanded?: boolean;
  onClick?: () => void;
  tag: string;
}): React.ReactElement {
  const { format } = useCurrencyFormatter();
  return (
    <Button isFullWidth onClick={onClick} style={ButtonStyle.Unstyled}>
      <Row>
        <Text isBold={isExpanded}>{format(amount)}</Text>
        <Text isBold={isExpanded} isUnderlined size={Size.Small}>
          {tag}
        </Text>
      </Row>
    </Button>
  );
}

function TagVisibilityController({
  onChangeVisibleTagCount = noop,
  totalTagCount,
  visibleTagCount,
}: {
  onChangeVisibleTagCount?: (input: number) => void;
  totalTagCount: number;
  visibleTagCount: number;
}): React.ReactElement {
  const actualVisibleTagCount = Math.max(
    Math.min(visibleTagCount, totalTagCount),
    1
  );
  const canIncreaseVisibleTagCount = totalTagCount > actualVisibleTagCount;
  const canDecreaseVisibleTagCount = actualVisibleTagCount > 1;
  return (
    <Row>
      <Text size={Size.Small}>
        {actualVisibleTagCount} of {totalTagCount} tags visible
      </Text>
      <Row space={Space.Small}>
        {canIncreaseVisibleTagCount && (
          <Button
            isDisabled={!canIncreaseVisibleTagCount}
            onClick={() => {
              onChangeVisibleTagCount(actualVisibleTagCount + 1);
            }}
            style={ButtonStyle.Unstyled}
          >
            <Icon icon={IconType.Plus} />
          </Button>
        )}
        {canDecreaseVisibleTagCount && (
          <Button
            onClick={() => {
              onChangeVisibleTagCount(actualVisibleTagCount - 1);
            }}
            style={ButtonStyle.Unstyled}
          >
            <Icon icon={IconType.Minus} />
          </Button>
        )}
      </Row>
    </Row>
  );
}

export function CategoryAverageSummaryContainer(): React.ReactElement {
  const { now } = useNow();
  const [visibleTagCount, onChangeVisibleTagCount] = useState<number>(5);
  const [expandedTag, onSelectTag] = useState<string | undefined>();
  const endDate = now.minus({ months: 1 }).endOf('month');
  const startDate = now.minus({ years: 1 }).startOf('month');
  const { spending } = useTransactionsByCategory({
    endDate: endDate.toISODate(),
    startDate: startDate.toISODate(),
  });
  return (
    <CategoryAverageSummary
      endDate={endDate}
      expandedTag={expandedTag}
      onChangeVisibleTagCount={onChangeVisibleTagCount}
      onSelectTag={onSelectTag}
      startDate={startDate}
      transactions={spending}
      visibleTagCount={visibleTagCount}
    />
  );
}
