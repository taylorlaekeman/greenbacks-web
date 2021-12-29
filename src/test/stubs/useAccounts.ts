import type {
  Account,
  IUseAccounts,
  UseAccountsInput,
} from 'hooks/useAccounts';

class UseAccountsStub {
  readonly accounts: Account[];

  readonly initializationToken?: string;

  readonly isLoadingAccounts: boolean;

  readonly isLoadingInitializationToken: boolean;

  readonly useAccountsCalls: (UseAccountsInput | undefined)[];

  constructor({
    accounts = [],
    initializationToken,
    isLoadingAccounts = false,
    isLoadingInitializationToken = false,
  }: ConstructorInput = {}) {
    this.accounts = accounts;
    this.useAccountsCalls = [];
    this.initializationToken = initializationToken;
    this.isLoadingAccounts = isLoadingAccounts;
    this.isLoadingInitializationToken = isLoadingInitializationToken;
  }

  useAccounts: IUseAccounts = (input) => {
    this.useAccountsCalls.push(input);
    return {
      accounts: this.accounts,
      initializationToken: this.initializationToken,
      isLoadingAccounts: this.isLoadingAccounts,
      isLoadingInitializationToken: this.isLoadingInitializationToken,
    };
  };
}

interface ConstructorInput {
  accounts?: Account[];
  initializationToken?: string;
  isLoadingAccounts?: boolean;
  isLoadingInitializationToken?: boolean;
}

export default UseAccountsStub;
