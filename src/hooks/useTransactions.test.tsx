import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { DocumentNode } from 'api/gql';
import type { QueryResult } from 'api/queries';
import useTransactions from 'hooks/useTransactions';

const getMock = ({
  result = [],
  isEmpty = false,
}: {
  result?: { amount?: number; date?: string; name?: string }[];
  isEmpty?: boolean;
} = {}) => {
  const mock = jest.fn();
  mock.mockReturnValue({ data: { getTransactions: result } });
  if (isEmpty) mock.mockReturnValue({ data: null });
  return mock;
};

const extractQuery = (mock: jest.Mock) => {
  const details = mock.mock.calls[0][0];
  const query = details.definitions[0].selectionSet.selections[0];
  const name = query.name.value;
  const fields = query.selectionSet.selections.map(
    (selection: { name: { value: string } }) => selection.name.value
  );
  const { variables } = mock.mock.calls[0][1];
  return { fields, name, variables };
};

const Component = ({ endDate, mock, startDate }: Props) => {
  const result = useTransactions({
    endDate,
    startDate,
    useQuery: mock,
  });
  if (result.length === 0) return <div aria-label="empty">empty</div>;
  return (
    <>
      {result.map(({ amount, date, name }) => (
        <div key={`${amount}|${date}|${name}`}>
          <div aria-label="amount">{amount}</div>
          <div aria-label="date">{date}</div>
          <div aria-label="name">{name}</div>
        </div>
      ))}
    </>
  );
};

Component.defaultProps = {
  endDate: null,
  startDate: null,
};

interface Props {
  endDate?: string;
  mock: <QueryResults, Variables>(
    query: DocumentNode,
    config: { variables: Variables }
  ) => QueryResult<QueryResults>;
  startDate?: string;
}

describe('useTransactions', () => {
  describe('query details', () => {
    test('uses correct query', () => {
      const mock = getMock();
      render(<Component mock={mock} />);
      const { name } = extractQuery(mock);
      expect(name).toBe('getTransactions');
    });

    test('queries correct values', () => {
      const mock = getMock();
      render(<Component mock={mock} />);
      const { fields } = extractQuery(mock);
      expect(fields).toContain('amount');
      expect(fields).toContain('date');
      expect(fields).toContain('name');
    });
  });

  describe('variables', () => {
    test.each(['foo', 'bar'])('uses start date %s', (value) => {
      const mock = getMock();
      render(<Component mock={mock} startDate={value} />);
      const {
        variables: { startDate },
      } = extractQuery(mock);
      expect(startDate).toBe(value);
    });

    test.each(['foo', 'bar'])('uses end date %s', (value) => {
      const mock = getMock();
      render(<Component mock={mock} endDate={value} />);
      const {
        variables: { endDate },
      } = extractQuery(mock);
      expect(endDate).toBe(value);
    });

    test('does not use start date if not provided', () => {
      const mock = getMock();
      render(<Component mock={mock} />);
      const { variables } = extractQuery(mock);
      expect(variables).not.toHaveProperty('startDate');
    });

    test('does not use end date if not provided', () => {
      const mock = getMock();
      render(<Component mock={mock} />);
      const { variables } = extractQuery(mock);
      expect(variables).not.toHaveProperty('endDate');
    });
  });

  describe('result', () => {
    test.each([1, 2])('returns amount %d', (value) => {
      const mock = getMock({ result: [{ amount: value }] });
      render(<Component mock={mock} />);
      const element = screen.getByRole('generic', { name: 'amount' });
      expect(element).toHaveTextContent(value.toString());
    });

    test.each(['foo', 'bar'])('returns date %s', (value) => {
      const mock = getMock({ result: [{ date: value }] });
      render(<Component mock={mock} />);
      const element = screen.getByRole('generic', { name: 'date' });
      expect(element).toHaveTextContent(value);
    });

    test.each(['foo', 'bar'])('returns name %s', (value) => {
      const mock = getMock({ result: [{ name: value }] });
      render(<Component mock={mock} />);
      const element = screen.getByRole('generic', { name: 'name' });
      expect(element).toHaveTextContent(value);
    });
  });
});
