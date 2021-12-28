import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';

import useAccounts from 'hooks/useAccounts';
import type { IUseQuery } from 'hooks/useQuery';
import UseQueryStub from 'test/stubs/useQuery';
import getAccount from 'test/utils/getAccount';
import VisibleObject from 'test/utils/VisibleObject';

const Component: FC<Props> = ({ useQuery = new UseQueryStub().useQuery }) => {
  const {
    accounts,
    initializationToken,
    isLoadingAccounts,
    isLoadingInitializationToken,
  } = useAccounts({
    useQuery,
  });
  return (
    <>
      <p data-testid="token">{initializationToken}</p>
      <p data-testid="is-loading-accounts">{isLoadingAccounts.toString()}</p>
      <p data-testid="is-loading-initialization-token">
        {isLoadingInitializationToken.toString()}
      </p>
      <VisibleObject id="accounts" object={accounts} />
    </>
  );
};

interface Props {
  useQuery?: IUseQuery;
}

Component.defaultProps = {
  useQuery: new UseQueryStub().useQuery,
};

describe('use accounts', () => {
  describe('get initialization token', () => {
    test('calls useQuery correctly', () => {
      const stub = new UseQueryStub();
      render(<Component useQuery={stub.useQuery} />);
      expect(stub.useQueryCalls[0].query).toBe('{ getInitializationToken }');
      expect(stub.useQueryCalls[0].fetchPolicy).toBe('network-only');
    });
  });

  describe('initialization token', () => {
    test.each(['foo', 'bar'])('returns %s', (value) => {
      const stub = new UseQueryStub({
        data: { getInitializationToken: value },
      });
      render(<Component useQuery={stub.useQuery} />);
      const token = screen.getByTestId('token');
      expect(token).toHaveTextContent(value);
    });
  });

  describe.each([
    ['accounts', 'accounts'],
    ['initialization token', 'initialization-token'],
  ])('is loading %s', (_readable, key) => {
    test.each([true, false])('returns %s', (value) => {
      const stub = new UseQueryStub({
        isLoading: value,
      });
      render(<Component useQuery={stub.useQuery} />);
      const text = screen.getByTestId(`is-loading-${key}`);
      expect(text).toHaveTextContent(value.toString());
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
  });

  describe('accounts', () => {
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
