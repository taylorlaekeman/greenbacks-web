import datetime from 'utils/datetime';

const getReadableMonth = ({ iso }: { iso: string }): string =>
  datetime.fromISO(iso).toLocaleString({ month: 'long', year: 'numeric' });

export default getReadableMonth;
