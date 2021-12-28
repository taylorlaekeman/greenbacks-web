import type { IUseAccounts, UseAccountsInput } from 'hooks/useAccounts';

class UseAccountsStub {
  readonly useAccountsCalls: (UseAccountsInput | undefined)[];

  constructor() {
    this.useAccountsCalls = [];
  }

  useAccounts: IUseAccounts = (input) => {
    this.useAccountsCalls.push(input);
    return {
      accounts: [],
      isLoadingAccounts: false,
    };
  };
}

export default UseAccountsStub;
