import useNow from 'hooks/useNow';
import getMonth from 'utils/getMonth';

const useAveragingPeriod = (): {
  count: number;
  endIso: string;
  startIso: string;
} => {
  const { now } = useNow();
  const { firstDay: startIso } = getMonth({ datetime: now, offset: -12 });
  const { lastDay: endIso } = getMonth({ datetime: now, offset: -1 });
  return { count: 12, endIso, startIso };
};

export default useAveragingPeriod;
