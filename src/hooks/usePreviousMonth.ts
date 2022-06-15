import datetime from 'utils/datetime';

const usePreviousMonth = ({ iso }: { iso: string }): { month: string } => ({
  month: datetime.fromISO(iso).minus({ months: 1 }).startOf('month').toISO(),
});

export default usePreviousMonth;
