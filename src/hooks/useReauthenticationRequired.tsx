import useSavingsRate from 'hooks/useSavingsRate';

const useReauthenticationRequired = (): {
  isLoading: boolean;
  isReauthenticationRequired: boolean;
} => {
  const { isLoading, error } = useSavingsRate();
  return {
    isLoading,
    isReauthenticationRequired:
      error?.message === 'Reauthentication required for a connected account',
  };
};

export default useReauthenticationRequired;
