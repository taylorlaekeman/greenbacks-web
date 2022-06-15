import useFirstDayOfMonth from 'hooks/useFirstDayOfMonth';
import useLastDayOfMonth from 'hooks/useLastDayOfMonth';
import useOffsetMonth from 'hooks/useOffsetMonth';

const usePreviousSixMonths = (): { endIso: string; startIso: string } => {
  const { iso: sixMonthsAgo } = useOffsetMonth({ offset: -6 });
  const { iso: lastMonth } = useOffsetMonth({ offset: -1 });
  const { iso: startOfPeriod } = useFirstDayOfMonth({ iso: sixMonthsAgo });
  const { iso: endOfPeriod } = useLastDayOfMonth({ iso: lastMonth });
  return { endIso: endOfPeriod, startIso: startOfPeriod };
};

export default usePreviousSixMonths;
