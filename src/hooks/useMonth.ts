import { useState } from 'react';

import useCurrentMonth from 'hooks/useCurrentMonth';
import useFirstDayOfMonth from 'hooks/useFirstDayOfMonth';
import useLastDayOfMonth from 'hooks/useLastDayOfMonth';
import useNextMonth from 'hooks/useNextMonth';
import usePreviousMonth from 'hooks/usePreviousMonth';
import useReadableMonth from 'hooks/useReadableMonth';

const useMonth = (): {
  endDate: string;
  iso: string;
  next: () => void;
  previous: () => void;
  readable: string;
  startDate: string;
} => {
  const { iso: currentMonth } = useCurrentMonth();
  const [month, setMonth] = useState(currentMonth);
  const { iso: nextMonth } = useNextMonth({ iso: month });
  const { iso: previousMonth } = usePreviousMonth({ iso: month });
  const { month: readableMonth } = useReadableMonth({ iso: month });
  const { iso: startDate } = useFirstDayOfMonth({ iso: month });
  const { iso: endDate } = useLastDayOfMonth({ iso: month });
  return {
    endDate,
    iso: month,
    next: () => setMonth(nextMonth),
    previous: () => setMonth(previousMonth),
    readable: readableMonth,
    startDate,
  };
};

export default useMonth;
