import type { IUseAccounts, UseAccountsInput } from 'hooks/useAccounts';

class UseAccountsStub {
  readonly isLoadingAccounts: boolean;

  readonly isLoadingInitializationToken: boolean;

  readonly useAccountsCalls: (UseAccountsInput | undefined)[];

  constructor({
    isLoadingAccounts = false,
    isLoadingInitializationToken = false,
  }: ConstructorInput = {}) {
    this.useAccountsCalls = [];
    this.isLoadingAccounts = isLoadingAccounts;
    this.isLoadingInitializationToken = isLoadingInitializationToken;
  }

  useAccounts: IUseAccounts = (input) => {
    this.useAccountsCalls.push(input);
    return {
      accounts: [],
      isLoadingAccounts: this.isLoadingAccounts,
      isLoadingInitializationToken: this.isLoadingInitializationToken,
    };
  };
}

interface ConstructorInput {
  isLoadingAccounts?: boolean;
  isLoadingInitializationToken?: boolean;
}

export default UseAccountsStub;
