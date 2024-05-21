import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greenbacks from 'components/Greenbacks';
import { TestGreenbacksProvider } from 'context/Greenbacks';
import buildFilter from '__test__/utils/buildFilter';
import buildFiltersMock from '__test__/utils/buildFiltersMock';

test('tags are selected by default', async () => {
  const filterMock = buildFiltersMock({
    filters: [
      buildFilter({
        tagToAssign: 'first-tag',
      }),
      buildFilter({
        tagToAssign: 'second-tag',
      }),
    ],
  });
  render(
    <TestGreenbacksProvider
      route="/widgets/spending"
      mocks={[filterMock]}
      now="2021-01-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  await screen.findByRole('checkbox', { name: 'first-tag' });
  screen.debug();
  expect(
    await screen.findByRole('checkbox', { name: 'first-tag' })
  ).toHaveAttribute('data-checked', 'true');
  expect(
    await screen.findByRole('checkbox', { name: 'second-tag' })
  ).toHaveAttribute('data-checked', 'true');
});

test('clicking checkbox for selected tag deselects and reselects it', async () => {
  const filtersMock = buildFiltersMock({
    filters: [
      buildFilter({
        tagToAssign: 'test-tag',
      }),
    ],
  });
  render(
    <TestGreenbacksProvider
      route="/widgets/spending"
      mocks={[filtersMock]}
      now="2021-01-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  const checkbox = await screen.findByRole('checkbox', { name: 'test-tag' });
  userEvent.click(checkbox);
  expect(checkbox).toHaveAttribute('data-checked', 'false');
  userEvent.click(checkbox);
  expect(checkbox).toHaveAttribute('data-checked', 'true');
});

test('clicking deselect all deselects all', async () => {
  const filtersMock = buildFiltersMock({
    filters: [
      buildFilter({
        tagToAssign: 'first-tag',
      }),
      buildFilter({
        tagToAssign: 'second-tag',
      }),
    ],
  });
  render(
    <TestGreenbacksProvider
      route="/widgets/spending"
      mocks={[filtersMock]}
      now="2021-01-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.click(await screen.findByRole('button', { name: 'Deselect all' }));
  expect(
    await screen.findByRole('checkbox', { name: 'first-tag' })
  ).toHaveAttribute('data-checked', 'false');
  expect(
    await screen.findByRole('checkbox', { name: 'second-tag' })
  ).toHaveAttribute('data-checked', 'false');
});

test('clicking select all selects all', async () => {
  const filtersMock = buildFiltersMock({
    filters: [
      buildFilter({
        tagToAssign: 'first-tag',
      }),
      buildFilter({
        tagToAssign: 'second-tag',
      }),
    ],
  });
  render(
    <TestGreenbacksProvider
      route="/widgets/spending"
      mocks={[filtersMock]}
      now="2021-01-01"
    >
      <Greenbacks />
    </TestGreenbacksProvider>
  );
  userEvent.click(await screen.findByRole('button', { name: 'Deselect all' }));
  userEvent.click(await screen.findByRole('button', { name: 'Select all' }));
  expect(
    await screen.findByRole('checkbox', { name: 'first-tag' })
  ).toHaveAttribute('data-checked', 'true');
  expect(
    await screen.findByRole('checkbox', { name: 'second-tag' })
  ).toHaveAttribute('data-checked', 'true');
});
