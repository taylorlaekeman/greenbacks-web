import { render } from '@testing-library/react';

import useTransactions from 'hooks/useTransactions';

expect.extend({});

const getMock = () => {
  const mock = jest.fn();
  mock.mockReturnValue({ data: 'test' });
  return mock;
};

const extractQuery = (mock) => {
  const details = mock.mock.calls[0][0];
  const query = details.definitions[0].selectionSet.selections[0];
  const name = query.name.value;
  const fields = query.selectionSet.selections.map(
    (selection) => selection.name.value
  );
  const { variables } = mock.mock.calls[0][1];
  return { fields, name, variables };
};

const Component = ({ endDate, mock, startDate }) => {
  const transactions = useTransactions({ endDate, startDate, useQuery: mock });
  return <></>;
};

describe('useTransactions', () => {
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
});
