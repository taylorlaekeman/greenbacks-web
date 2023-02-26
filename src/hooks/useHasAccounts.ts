import useAccounts from 'hooks/useAccounts';

const useHasAccounts = (): {
  hasAccounts?: boolean;
  isLoading: boolean;
} => {
  const { accounts, isLoadingAccounts } = useAccounts();

  return {
    hasAccounts: accounts?.length > 0,
    isLoading: isLoadingAccounts,
  };
};

export default useHasAccounts;
