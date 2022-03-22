import React from 'react';
import { act, render, screen } from '@testing-library/react';

import Greenbacks from 'components/Greenbacks';
import { TestNowProvider } from 'context/Now';
import { TestGreenbacksApiProvider } from 'context/GreenbacksApi';
import { GET_TRANSACTIONS_QUERY, Transaction } from 'hooks/useTransactions';
import buildTransaction from '__test__/utils/buildTransaction';
import wait from 'utils/wait';

describe('greenbacks', () => {
  describe('average monthly earnings', () => {
    const buildApiMock = ({
      transactions = [],
    }: { transactions?: Transaction[] } = {}) => [
      {
        request: {
          query: GET_TRANSACTIONS_QUERY,
          variables: { endDate: '2020-06-30', startDate: '2020-01-01' },
        },
        result: {
          data: {
            transactions,
          },
        },
      },
    ];

    test('displays loading indicator while transactions are loading', () => {
      const mocks = buildApiMock();
      render(
        <TestGreenbacksApiProvider mocks={mocks}>
          <TestNowProvider now="2020-07-01">
            <Greenbacks />
          </TestNowProvider>
        </TestGreenbacksApiProvider>
      );
      const loadingIndicator = screen.getByTestId(
        'loading-indicator-average-monthly-earnings'
      );
      expect(loadingIndicator).toBeInTheDocument();
    });

    test('shows zero without any earnings', async () => {
      const mocks = buildApiMock();
      render(
        <TestGreenbacksApiProvider mocks={mocks}>
          <TestNowProvider now="2020-07-01">
            <Greenbacks />
          </TestNowProvider>
        </TestGreenbacksApiProvider>
      );
      await act(wait);
      const text = screen.getByTestId('average-monthly-earnings');
      expect(text).toHaveTextContent('$0.00');
    });

    test('correctly averages transactions', async () => {
      const mocks = buildApiMock({
        transactions: [
          buildTransaction({ amount: -100, datetime: '2020-01-01' }),
          buildTransaction({ amount: -100, datetime: '2020-02-01' }),
          buildTransaction({ amount: -100, datetime: '2020-03-01' }),
          buildTransaction({ amount: -200, datetime: '2020-04-01' }),
          buildTransaction({ amount: -200, datetime: '2020-05-01' }),
          buildTransaction({ amount: -200, datetime: '2020-06-01' }),
        ],
      });
      render(
        <TestGreenbacksApiProvider mocks={mocks}>
          <TestNowProvider now="2020-07-01">
            <Greenbacks />
          </TestNowProvider>
        </TestGreenbacksApiProvider>
      );
      await act(wait);
      const text = screen.getByTestId('average-monthly-earnings');
      expect(text).toHaveTextContent('$1.50');
    });

    test('handles months without earnings', async () => {
      const mocks = buildApiMock({
        transactions: [
          buildTransaction({ amount: -600, datetime: '2020-01-01' }),
        ],
      });
      render(
        <TestGreenbacksApiProvider mocks={mocks}>
          <TestNowProvider now="2020-07-01">
            <Greenbacks />
          </TestNowProvider>
        </TestGreenbacksApiProvider>
      );
      await act(wait);
      const text = screen.getByTestId('average-monthly-earnings');
      expect(text).toHaveTextContent('$1.00');
    });

    test('excludes expenses', async () => {
      const mocks = buildApiMock({
        transactions: [
          buildTransaction({ amount: -600, datetime: '2020-01-01' }),
          buildTransaction({ amount: 600, datetime: '2020-01-01' }),
        ],
      });
      render(
        <TestGreenbacksApiProvider mocks={mocks}>
          <TestNowProvider now="2020-07-01">
            <Greenbacks />
          </TestNowProvider>
        </TestGreenbacksApiProvider>
      );
      await act(wait);
      const text = screen.getByTestId('average-monthly-earnings');
      expect(text).toHaveTextContent('$1.00');
    });

    test('shows label text', async () => {
      const mocks = buildApiMock({
        transactions: [
          buildTransaction({ amount: -600, datetime: '2020-01-01' }),
        ],
      });
      render(
        <TestGreenbacksApiProvider mocks={mocks}>
          <TestNowProvider now="2020-07-01">
            <Greenbacks />
          </TestNowProvider>
        </TestGreenbacksApiProvider>
      );
      await act(wait);
      const label = screen.getByTestId('average-monthly-earnings-label');
      expect(label).toHaveTextContent(/^Average monthly earnings$/);
    });
  });
});
