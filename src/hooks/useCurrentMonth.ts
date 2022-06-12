import useNow from 'hooks/useNow';
import datetime from 'utils/datetime';

const useCurrentMonth = (): { datetime: datetime; iso: string } => {
  const { now } = useNow();
  return { datetime: now.startOf('month'), iso: now.toFormat('yyyy-LL') };
};

export default useCurrentMonth;
