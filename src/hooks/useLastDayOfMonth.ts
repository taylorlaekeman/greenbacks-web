import datetime from 'utils/datetime';

const useLastDayOfMonth = ({ iso }: { iso: string }): { iso: string } => ({
  iso: datetime.fromISO(iso).endOf('month').toISODate(),
});

export default useLastDayOfMonth;
