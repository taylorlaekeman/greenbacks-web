import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildApiTransactionsMock from '__test__/utils/buildApiTransactionsMock';
import buildTransaction from '__test__/utils/buildTransaction';

test('adds spending filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Property' }),
    'name'
  );
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Expected Value' }),
    'test name'
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Category' }),
    'Spending'
  );
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Tag' }),
    'test tag'
  );
  userEvent.click(screen.getByRole('button', { name: 'Save filter' }));
  expect(
    screen.queryByTestId('section-untagged-transactions')
  ).not.toBeInTheDocument();
});

test('adds saving filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: 100,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Property' }),
    'name'
  );
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Expected Value' }),
    'test name'
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Category' }),
    'Saving'
  );
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Tag' }),
    'test tag'
  );
  userEvent.click(screen.getByRole('button', { name: 'Save filter' }));
  const { findByText } = within(
    await screen.findByTestId('section-monthly-overview')
  );
  expect(await findByText(/Total Saving: \$1.00/)).toBeVisible();
});

test('adds earning filter', async () => {
  const apiMocks = [
    buildApiTransactionsMock({
      endDate: '2020-01-31',
      startDate: '2020-01-01',
      transactions: [
        buildTransaction({
          amount: -100,
          name: 'test name',
        }),
      ],
    }),
  ];
  render(
    <TestGreenbacksProvider mocks={apiMocks} route="/months/2020-01/">
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Property' }),
    'name'
  );
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Expected Value' }),
    'test name'
  );
  userEvent.selectOptions(
    screen.getByRole('combobox', { name: 'Category' }),
    'Earning'
  );
  userEvent.type(
    await screen.findByRole('textbox', { name: 'Tag' }),
    'test tag'
  );
  userEvent.click(screen.getByRole('button', { name: 'Save filter' }));
  const { findByText } = within(
    await screen.findByTestId('section-monthly-overview')
  );
  expect(await findByText(/Total Earning: \$1.00/)).toBeVisible();
});
