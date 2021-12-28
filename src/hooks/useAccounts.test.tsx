import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';

import useAccounts from 'hooks/useAccounts';
import type { IUseQuery } from 'hooks/useQuery';
import UseQueryStub from 'test/stubs/useQuery';
import VisibleList from 'test/utils/VisibleList';

const Component: FC<Props> = ({ useQuery = new UseQueryStub().useQuery }) => {
  const { accounts, initializationToken } = useAccounts({ useQuery });
  return (
    <>
      <p data-testid="token">{initializationToken}</p>
      <VisibleList id="accounts" list={accounts} />
    </>
  );
};

interface Props {
  useQuery?: IUseQuery;
}

Component.defaultProps = {
  useQuery: new UseQueryStub().useQuery,
};

const getAccount = ({
  id = 'id',
  institution = 'institution',
}: {
  id?: string;
  institution?: string;
}) => ({
  id,
  institution: {
    name: institution,
  },
});

describe('use accounts', () => {
  describe('initialization token', () => {
    test('calls useQuery correctly', () => {
      const stub = new UseQueryStub();
      render(<Component useQuery={stub.useQuery} />);
      expect(stub.useQueryCalls[0].query).toBe('{ getInitializationToken }');
      expect(stub.useQueryCalls[0].fetchPolicy).toBe('network-only');
    });

    test.each(['foo', 'bar'])('returns %s', (value) => {
      const stub = new UseQueryStub({
        data: { getInitializationToken: value },
      });
      render(<Component useQuery={stub.useQuery} />);
      const token = screen.getByTestId('token');
      expect(token).toHaveTextContent(value);
    });
  });

  describe('get accounts', () => {
    test('calls useQuery correctly', () => {
      const stub = new UseQueryStub();
      render(<Component useQuery={stub.useQuery} />);
      expect(stub.useQueryCalls[1].query).toBe(
        '{ getAccounts { id institution { name } } }'
      );
    });

    test.each(['foo', 'bar'])('returns id %s', (value) => {
      const stub = new UseQueryStub({
        data: { getAccounts: [getAccount({ id: value })] },
      });
      render(<Component useQuery={stub.useQuery} />);
      const text = screen.getByTestId('accounts-0-id');
      expect(text).toHaveTextContent(value);
    });

    test.each(['foo', 'bar'])('returns institution name %s', (value) => {
      const stub = new UseQueryStub({
        data: { getAccounts: [getAccount({ institution: value })] },
      });
      render(<Component useQuery={stub.useQuery} />);
      const text = screen.getByTestId('accounts-0-institution-name');
      expect(text).toHaveTextContent(value);
    });
  });
});
