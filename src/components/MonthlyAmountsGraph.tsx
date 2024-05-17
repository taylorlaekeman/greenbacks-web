import { DateTime } from 'luxon';
import React from 'react';
import {
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
} from 'recharts';

export function MonthlyAmountsGraph({
  hasAverageLines = true,
  hasLegend = true,
  monthlyAmountsBySeriesName = {},
  seriesConfigurationByName = {},
}: {
  hasAverageLines?: boolean;
  hasLegend?: boolean;
  monthlyAmountsBySeriesName?: Record<string, MonthlyAmount[]>;
  seriesConfigurationByName?: Record<string, SeriesConfiguration>;
} = {}): React.ReactElement {
  if (Object.keys(monthlyAmountsBySeriesName).length === 0) return <></>;
  if (
    Object.values(monthlyAmountsBySeriesName).every(
      (series) => series.length === 0
    )
  )
    return <></>;
  const { earliestMonth, latestMonth } = getObservedMonthRange({
    monthlyAmountsBySeriesName,
  });
  const seriesNames = Object.keys(monthlyAmountsBySeriesName);
  const averagesBySeriesName = seriesNames.reduce<Record<string, number>>(
    (result, name) => {
      const monthlyAmounts = monthlyAmountsBySeriesName[name] ?? [];
      const sum = monthlyAmounts.reduce(
        (total, { amount }) => total + amount,
        0
      );
      const average = sum / monthlyAmounts.length;
      return {
        ...result,
        [name]: average,
      };
    },
    {}
  );
  const amountsByMonth = seriesNames.reduce<
    Record<string, Record<string, number>>
  >((result, seriesName) => {
    const newResult: Record<string, Record<string, number>> = {};
    const seriesData = monthlyAmountsBySeriesName[seriesName];
    seriesData.forEach((monthAmount) => {
      const serializedMonth = monthAmount.month.toFormat('yyyy-LL');
      const existingMonthAmounts = result[serializedMonth] ?? {};
      newResult[serializedMonth] = {
        ...existingMonthAmounts,
        [seriesName]: monthAmount.amount,
      };
    });
    return newResult;
  }, {});
  const graphableData = Object.entries(amountsByMonth).map(
    ([serializedMonth, amountsBySeriesName]) => ({
      ...amountsBySeriesName,
      month: serializedMonth,
    })
  );
  return (
    <ResponsiveContainer
      aspect={2}
      height="max-content"
      minWidth={300}
      width="100%"
    >
      <LineChart data={graphableData}>
        {seriesNames.map((name) => {
          const { colour = 'orange' } = seriesConfigurationByName[name] ?? {};
          return (
            <Line
              dataKey={name}
              dot={false}
              isAnimationActive={false}
              key={name}
              stroke={colour}
            />
          );
        })}
        {hasAverageLines &&
          seriesNames.map((name) => {
            const { colour = 'orange' } = seriesConfigurationByName[name] ?? {};
            return (
              <ReferenceLine
                key={name}
                label={{
                  fontSize: '0.8rem',
                  value: formatThousands(averagesBySeriesName[name]),
                }}
                stroke={colour}
                strokeDasharray="4 4"
                y={averagesBySeriesName[name]}
              />
            );
          })}
        <XAxis
          dataKey="month"
          interval="preserveStartEnd"
          tick={{ fontSize: '0.8rem' }}
          ticks={[
            earliestMonth.toFormat('yyyy-LL'),
            latestMonth.toFormat('yyyy-LL'),
          ]}
        />
        {hasLegend && (
          <Legend
            align="center"
            iconType="plainline"
            wrapperStyle={{ fontSize: '0.8rem' }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

interface SeriesConfiguration {
  colour: string;
}

interface MonthlyAmount {
  amount: number;
  month: DateTime;
}

function formatThousands(cents: number): string {
  const dollars = cents / 100;
  if (dollars < 1000) return Math.round(dollars).toString();
  const hundreds = Math.round(dollars / 100);
  return `${hundreds / 10}k`;
}

function getObservedMonthRange({
  monthlyAmountsBySeriesName,
}: {
  monthlyAmountsBySeriesName: Record<string, MonthlyAmount[]>;
}): { earliestMonth: DateTime; latestMonth: DateTime } {
  const series = Object.values(monthlyAmountsBySeriesName);
  let earliestMonth = series[0][0].month;
  let latestMonth = earliestMonth;
  series.forEach((monthlyAmounts) => {
    monthlyAmounts.forEach((monthlyAmount) => {
      if (monthlyAmount.month < earliestMonth)
        earliestMonth = monthlyAmount.month;
      if (monthlyAmount.month > latestMonth) latestMonth = monthlyAmount.month;
    });
  });
  return {
    earliestMonth,
    latestMonth,
  };
}
