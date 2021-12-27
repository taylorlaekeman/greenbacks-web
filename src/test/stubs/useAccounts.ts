import type { IUseAccounts, UseAccountsInput } from 'hooks/useAccounts';

class UseAccountsStub {
  readonly useAccountsCalls: (UseAccountsInput | undefined)[];

  constructor() {
    this.useAccountsCalls = [];
  }

  useAccounts: IUseAccounts = (input) => {
    this.useAccountsCalls.push(input);
    return {};
  };
}

export default UseAccountsStub;
