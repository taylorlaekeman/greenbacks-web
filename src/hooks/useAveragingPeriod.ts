import useNow from 'hooks/useNow';
import getMonth from 'utils/getMonth';

const useAveragingPeriod = ({ months = 12 }: { months?: number } = {}): {
  count: number;
  endIso: string;
  startIso: string;
} => {
  const { now } = useNow();
  const { firstDay: startIso } = getMonth({ datetime: now, offset: -months });
  const { lastDay: endIso } = getMonth({ datetime: now, offset: -1 });
  return { count: months, endIso, startIso };
};

export default useAveragingPeriod;
