import datetime from 'utils/datetime';

const useNextMonth = ({ iso }: { iso: string }): { month: string } => ({
  month: datetime.fromISO(iso).plus({ months: 1 }).startOf('month').toISO(),
});

export default useNextMonth;
