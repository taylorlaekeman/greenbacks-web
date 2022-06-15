import useNow from 'hooks/useNow';

const useCurrentMonth = (): { iso: string } => {
  const { now } = useNow();
  return { iso: now.toFormat('yyyy-LL') };
};

export default useCurrentMonth;
