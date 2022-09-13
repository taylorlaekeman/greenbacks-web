import useNow from 'hooks/useNow';
import getMonth from 'utils/getMonth';

const usePreviousSixMonths = (): { endIso: string; startIso: string } => {
  const { now } = useNow();
  const { firstDay: startIso } = getMonth({ datetime: now, offset: -6 });
  const { lastDay: endIso } = getMonth({ datetime: now, offset: -1 });
  return { endIso, startIso };
};

export default usePreviousSixMonths;
