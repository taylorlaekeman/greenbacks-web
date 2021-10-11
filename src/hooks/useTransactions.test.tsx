import { render } from '@testing-library/react';

import useTransactions from 'hooks/useTransactions';

expect.extend({});

const extractQuery = (mock) => {
  const call = mock.mock.calls[0][0];
  const query = call.definitions[0].selectionSet.selections[0];
  const name = query.name.value;
  const fields = query.selectionSet.selections.map(
    (selection) => selection.name.value
  );
  return { fields, name };
};

const Component = ({ mock }) => {
  const transactions = useTransactions({ useQuery: mock });
  return <>test</>;
};

describe('useTransactions', () => {
  test('uses correct query', () => {
    const mock = jest.fn();
    mock.mockReturnValue({ data: 'test' });
    render(<Component mock={mock} />);
    const { name } = extractQuery(mock);
    expect(name).toBe('getTransactions');
  });

  test('queries correct values', () => {
    const mock = jest.fn();
    mock.mockReturnValue({ data: 'test' });
    render(<Component mock={mock} />);
    const { fields } = extractQuery(mock);
    expect(fields).toContain('amount');
    expect(fields).toContain('date');
    expect(fields).toContain('name');
  });
});
