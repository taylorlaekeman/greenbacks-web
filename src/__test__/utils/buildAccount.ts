import type { Account } from 'types/account';

const buildAccount = ({
  createdDate = '2020-01-01 00:00:00',
  id = 'testId',
  institution: { name = 'test institution name' } = {},
  isReauthenticationRequired = false,
  modifiedDate = '2020-01-01 00:00:00',
}: {
  createdDate?: string;
  id?: string;
  institution?: { name?: string };
  isReauthenticationRequired?: boolean;
  modifiedDate?: string;
}): Account => ({
  createdDate,
  id,
  modifiedDate,
  institution: { name },
  isReauthenticationRequired,
});

export default buildAccount;
