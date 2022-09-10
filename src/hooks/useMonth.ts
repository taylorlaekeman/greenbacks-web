import { useParams as useRouteParams } from 'react-router-dom';

import useCurrentMonth from 'hooks/useCurrentMonth';
import useFirstDayOfMonth from 'hooks/useFirstDayOfMonth';
import useLastDayOfMonth from 'hooks/useLastDayOfMonth';
import useNextMonth from 'hooks/useNextMonth';
import usePreviousMonth from 'hooks/usePreviousMonth';
import useReadableMonth from 'hooks/useReadableMonth';

const useMonth = (): {
  endDate: string;
  iso: string;
  nextMonth: string;
  previousMonth: string;
  readable: string;
  startDate: string;
} => {
  const { month: monthInRoute } = useRouteParams();
  const { iso: currentMonth } = useCurrentMonth();
  const month = monthInRoute || currentMonth;
  const { iso: nextMonth } = useNextMonth({ iso: month });
  const { iso: previousMonth } = usePreviousMonth({ iso: month });
  const { month: readableMonth } = useReadableMonth({ iso: month });
  const { iso: startDate } = useFirstDayOfMonth({ iso: month });
  const { iso: endDate } = useLastDayOfMonth({ iso: month });
  return {
    endDate,
    iso: month,
    nextMonth,
    previousMonth,
    readable: readableMonth,
    startDate,
  };
};

export default useMonth;
