import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';
import wait from 'utils/wait';

test('displays loading indicator while transactions are loading', () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const loadingIndicator = screen.getByTestId(
    'loading-indicator-average-monthly-earnings'
  );
  expect(loadingIndicator).toBeInTheDocument();
});

test('shows zero without any earnings', async () => {
  const mocks = [buildApiTransactionsMock()];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  const text = screen.getByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$0.00');
});

test('correctly averages transactions', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -100, datetime: '2020-01-01' }),
        buildTransaction({ amount: -100, datetime: '2020-02-01' }),
        buildTransaction({ amount: -100, datetime: '2020-03-01' }),
        buildTransaction({ amount: -200, datetime: '2020-04-01' }),
        buildTransaction({ amount: -200, datetime: '2020-05-01' }),
        buildTransaction({ amount: -200, datetime: '2020-06-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  const text = screen.getByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.50');
});

test('handles months without earnings', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -600, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  const text = screen.getByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.00');
});

test('excludes expenses', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -600, datetime: '2020-01-01' }),
        buildTransaction({ amount: 600, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  const text = screen.getByTestId('average-monthly-earnings');
  expect(text).toHaveTextContent('$1.00');
});

test('shows label text', async () => {
  const mocks = [
    buildApiTransactionsMock({
      transactions: [
        buildTransaction({ amount: -600, datetime: '2020-01-01' }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={mocks} now="2020-07-01">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await act(wait);
  const label = screen.getByTestId('average-monthly-earnings-label');
  expect(label).toHaveTextContent(/^Average monthly earnings$/);
});

test.each(['/expenses/2020-01'])(
  'does not render at route %s',
  async (value) => {
    const mocks = [
      buildApiTransactionsMock({
        transactions: [
          buildTransaction({ amount: 600, datetime: '2020-01-01' }),
        ],
      }),
    ];
    render(
      <TestGreenbacksProvider mocks={mocks} route={value}>
        <Greenbacks />
      </TestGreenbacksProvider>
    );
    await act(wait);
    const text = screen.queryByTestId('average-monthly-earnings');
    const label = screen.queryByTestId('average-monthly-earnings-label');
    expect(text).not.toBeInTheDocument();
    expect(label).not.toBeInTheDocument();
  }
);
