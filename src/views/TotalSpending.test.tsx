import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import TotalSpending from 'views/TotalSpending';

describe('TotalSpending', () => {
  test.each([1, 2])('shows amount %d', (value) => {
    render(<TotalSpending amount={value} />);
    const element = screen.getByTestId('total-spending-amount');
    expect(element).toHaveTextContent(`$${value}`);
  });

  test('amount defaults to 0', () => {
    render(<TotalSpending />);
    const element = screen.getByTestId('total-spending-amount');
    expect(element).toHaveTextContent('$0');
  });
});
