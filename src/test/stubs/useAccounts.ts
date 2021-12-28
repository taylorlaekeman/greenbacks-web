import type {
  Account,
  IUseAccounts,
  UseAccountsInput,
} from 'hooks/useAccounts';

class UseAccountsStub {
  readonly accounts: Account[];

  readonly isLoadingAccounts: boolean;

  readonly isLoadingInitializationToken: boolean;

  readonly useAccountsCalls: (UseAccountsInput | undefined)[];

  constructor({
    accounts = [],
    isLoadingAccounts = false,
    isLoadingInitializationToken = false,
  }: ConstructorInput = {}) {
    this.accounts = accounts;
    this.useAccountsCalls = [];
    this.isLoadingAccounts = isLoadingAccounts;
    this.isLoadingInitializationToken = isLoadingInitializationToken;
  }

  useAccounts: IUseAccounts = (input) => {
    this.useAccountsCalls.push(input);
    return {
      accounts: this.accounts,
      isLoadingAccounts: this.isLoadingAccounts,
      isLoadingInitializationToken: this.isLoadingInitializationToken,
    };
  };
}

interface ConstructorInput {
  accounts?: Account[];
  isLoadingAccounts?: boolean;
  isLoadingInitializationToken?: boolean;
}

export default UseAccountsStub;
