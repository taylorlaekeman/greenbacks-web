import datetime from 'utils/datetime';

const useReadableMonth = ({ iso }: { iso: string }): { month: string } => ({
  month: datetime
    .fromISO(iso)
    .toLocaleString({ month: 'long', year: 'numeric' }),
});

export default useReadableMonth;
