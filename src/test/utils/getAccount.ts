import type { Account } from 'hooks/useAccounts';

const getAccount = ({
  id = 'id',
  institution = 'institution',
}: {
  id?: string;
  institution?: string;
}): Account => ({
  id,
  institution: {
    name: institution,
  },
});

export default getAccount;
