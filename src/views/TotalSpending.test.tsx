import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import TotalSpending from 'views/TotalSpending';

describe('TotalSpending', () => {
  test('shows amount', () => {
    render(<TotalSpending amount={42.42} />);
    const element = screen.getByTestId('total-spending-amount');
    expect(element).toHaveTextContent('$42.42');
  });
});
