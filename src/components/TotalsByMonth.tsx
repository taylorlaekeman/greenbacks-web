import { DateTime } from 'luxon';
import React, { FC, Fragment } from 'react';
import {
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from 'recharts';

import { Button, ButtonStyle } from 'components/Button';
import Checkboxes from 'components/Checkboxes';
import { Icon, IconType } from 'components/Icon';
import { Alignment, JustifiedRow } from 'components/JustifiedRow';
import LoadingIndicator from 'components/LoadingIndicator';
import { Panel, PanelItem } from 'components/Panel';
import { Size, Text } from 'components/Text';
import useMultiselect from 'hooks/useMultiselect';
import useTotalsByMonth, { MonthTotals } from 'hooks/useTotalsByMonth';

const TotalsByMonth: FC<{ area?: string; hasCheckboxes?: boolean }> = ({
  area,
  hasCheckboxes = true,
}) => {
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
  const totalsByMonthWithAvailable = totalsByMonth?.map((totals) => {
    const earning = totals[Series.Earning];
    if (!earning) return totals;
    const saving = totals[Series.Saving] ?? 0;
    const available = earning - saving;
    return {
      ...totals,
      [Series.Available]: available,
    };
  });

  console.log({ visibleCategories });

  if (isLoading)
    return (
      <Panel area={area}>
        <PanelItem hasBottomBorder>
          <Text size={Size.Medium}>Cash Flow</Text>
        </PanelItem>
        <PanelItem>
          <JustifiedRow alignment={Alignment.Center}>
            <LoadingIndicator />
          </JustifiedRow>
        </PanelItem>
      </Panel>
    );

  return (
    <Panel area={area}>
      <PanelItem hasBottomBorder>
        <JustifiedRow>
          <Text size={Size.Medium}>Cash Flow</Text>
          <Button
            onClick={() => {
              if (visibleCategories.includes('Earning'))
                onChangeVisibleCategories(['Earning Minus Saving', 'Spending']);
              else onChangeVisibleCategories(['Earning', 'Saving', 'Spending']);
            }}
            style={ButtonStyle.Unstyled}
          >
            <Icon icon={IconType.Filter} />
          </Button>
        </JustifiedRow>
      </PanelItem>
      <PanelItem>
        <Graph
          isEarningVisible={visibleCategories.includes('Earning')}
          isEarningMinusSavingVisible={visibleCategories.includes(
            'Earning Minus Saving',
          )}
          isSavingVisible={visibleCategories.includes('Saving')}
          isSavingAndSpendingVisible={visibleCategories.includes(
            'Saving & Spending',
          )}
          isSpendingVisible={visibleCategories.includes('Spending')}
          totalsByMonth={totalsByMonthWithAvailable}
        />
        {hasCheckboxes && (
          <Checkboxes
            label="Categories"
            onChange={onChangeVisibleCategories}
            options={categories}
            selectedOptions={visibleCategories}
          />
        )}
      </PanelItem>
    </Panel>
  );
};

const Graph: FC<{
  isEarningVisible?: boolean;
  isEarningMinusSavingVisible?: boolean;
  isSavingVisible?: boolean;
  isSavingAndSpendingVisible?: boolean;
  isSpendingVisible?: boolean;
  totalsByMonth?: MonthTotalsWithAvailable[];
}> = ({
  isEarningVisible = true,
  isEarningMinusSavingVisible = true,
  isSavingVisible = true,
  isSavingAndSpendingVisible = true,
  isSpendingVisible = true,
  totalsByMonth,
}) => {
  const earliestMonth = totalsByMonth?.[0].month ?? '';
  const latestMonth = totalsByMonth?.[totalsByMonth.length - 1].month ?? '';
  const monthsToLabelBySeriesName = getMonthsToLabel(totalsByMonth);
  return (
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
          {},
        )}
      />
      <ResponsiveContainer aspect={4} minWidth={250} width="100%">
        <LineChart data={formatData({ totalsByMonth })}>
          {isEarningVisible && (
            <Line dataKey="earning" dot={false} stroke="green">
              <LabelList
                formatter={formatThousands}
                style={{
                  fontSize: '0.8rem',
                }}
                valueAccessor={(entry: {
                  payload: { month: string };
                  value: number;
                }) => {
                  if (
                    entry.payload.month ===
                    monthsToLabelBySeriesName[Series.Earning]
                  )
                    return entry.value;
                  return null;
                }}
              />
            </Line>
          )}
          {isEarningMinusSavingVisible && (
            <Line dataKey="available" dot={false} stroke="yellowgreen">
              <LabelList
                formatter={formatThousands}
                style={{
                  fontSize: '0.8rem',
                }}
                valueAccessor={(entry: {
                  payload: { month: string };
                  value: number;
                }) => {
                  if (
                    entry.payload.month ===
                    monthsToLabelBySeriesName[Series.Available]
                  )
                    return entry.value;
                  return null;
                }}
              />
            </Line>
          )}
          {isSavingVisible && (
            <Line dataKey="saving" dot={false} stroke="blue">
              <LabelList
                formatter={formatThousands}
                style={{
                  fontSize: '0.8rem',
                }}
                valueAccessor={(entry: {
                  payload: { month: string };
                  value: number;
                }) => {
                  if (
                    entry.payload.month ===
                    monthsToLabelBySeriesName[Series.Saving]
                  )
                    return entry.value;
                  return null;
                }}
              />
            </Line>
          )}
          {isSpendingVisible && (
            <Line dataKey="spending" dot={false} stroke="orange">
              <LabelList
                formatter={formatThousands}
                style={{
                  fontSize: '0.8rem',
                }}
                valueAccessor={(entry: {
                  payload: { month: string };
                  value: number;
                }) => {
                  if (
                    entry.payload.month ===
                    monthsToLabelBySeriesName[Series.Spending]
                  )
                    return entry.value;
                  return null;
                }}
              />
            </Line>
          )}
          {isSavingAndSpendingVisible && (
            <Line
              dataKey="savingAndSpending"
              dot={false}
              stroke="purple"
              strokeWidth={1}
            />
          )}
          <XAxis
            dataKey="month"
            interval="preserveStartEnd"
            reversed
            tick={{ fontSize: '0.8rem' }}
            tickFormatter={(value) =>
              DateTime.fromISO(value).toLocaleString({
                month: 'short',
                year: 'numeric',
              })
            }
            ticks={[earliestMonth, latestMonth]}
          />
          <Legend
            align="center"
            formatter={(value) => LEGEND_LABELS[value] ?? value}
            iconType="plainline"
            wrapperStyle={{ fontSize: '0.8rem' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

const formatData = ({
  totalsByMonth,
}: {
  totalsByMonth?: MonthTotals[];
}): { earning: number; month: string; saving: number; spending: number }[] => {
  if (!totalsByMonth) return [];
  const result = totalsByMonth.map(({ earning, month, saving, spending }) => ({
    earning: earning || 0,
    available: difference(earning, saving),
    month,
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

function getMonthsToLabel(
  totals: MonthTotalsWithAvailable[] | undefined,
): Partial<Record<Series, string>> {
  if (!totals) return {};
  const monthsToLabel = totals?.reduce(
    (result, monthTotal) => {
      const newResult = { ...result };
      Object.values(Series).forEach((series) => {
        const seriesTotal = monthTotal[series];
        if (!seriesTotal) return;
        if (seriesTotal > result[series]?.maximum)
          newResult[series] = {
            maximum: seriesTotal,
            month: monthTotal.month,
          };
      });
      return newResult;
    },
    {
      earning: { maximum: 0, month: '' },
      available: { maximum: 0, month: '' },
      saving: { maximum: 0, month: '' },
      spending: { maximum: 0, month: '' },
    },
  );
  return Object.entries(monthsToLabel).reduce(
    (result, [key, value]) => ({
      ...result,
      [key]: value.month,
    }),
    {},
  );
}

enum Series {
  Available = 'available',
  Earning = 'earning',
  Saving = 'saving',
  Spending = 'spending',
}

interface MonthTotalsWithAvailable extends MonthTotals {
  available?: number;
}

const LEGEND_LABELS: Record<string, string> = {
  [Series.Available]: 'Available (Earning - Saving)',
  [Series.Earning]: 'Earning',
  [Series.Saving]: 'Saving',
  [Series.Spending]: 'Spending',
};

export default TotalsByMonth;
