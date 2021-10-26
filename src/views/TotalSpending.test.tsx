import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import TotalSpending from 'views/TotalSpending';

describe('TotalSpending', () => {
  test.each([1, 2])('shows amount %d', (value) => {
    render(<TotalSpending amount={value} month="2020-01" />);
    const element = screen.getByTestId('total-spending-amount');
    expect(element).toHaveTextContent(`$${value}`);
  });

  test('amount defaults to 0', () => {
    render(<TotalSpending month="2020-01" />);
    const element = screen.getByTestId('total-spending-amount');
    expect(element).toHaveTextContent('$0');
  });

  test.each([
    ['01', 'January'],
    ['02', 'February'],
    ['03', 'March'],
    ['04', 'April'],
    ['05', 'May'],
    ['06', 'June'],
    ['07', 'July'],
    ['08', 'August'],
    ['09', 'September'],
    ['10', 'October'],
    ['11', 'November'],
    ['12', 'December'],
  ])('includes numeric month %s as %s in label', (monthNumber, monthName) => {
    render(<TotalSpending month={`2020-${monthNumber}`} />);
    const element = screen.getByTestId('total-spending-month');
    expect(element).toHaveTextContent(`Spent in ${monthName}, 2020`);
  });

  test.each(['2020', '2021'])('includes year as %s in label', (value) => {
    render(<TotalSpending month={`${value}-01`} />);
    const element = screen.getByTestId('total-spending-month');
    expect(element).toHaveTextContent(`Spent in January, ${value}`);
  });
});
