import datetime from 'utils/datetime';

const useFirstDayOfMonth = ({ iso }: { iso: string }): { iso: string } => ({
  iso: datetime.fromISO(iso).startOf('month').toISODate(),
});

export default useFirstDayOfMonth;
