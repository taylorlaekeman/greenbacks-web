import IDatetime from 'utils/datetime';

const getMonth = ({
  datetime,
  offset = 0,
}: {
  datetime: IDatetime;
  offset?: number;
}): {
  datetime: IDatetime;
  daysInMonth: number;
  firstDay: string;
  iso: string;
  lastDay: string;
  readable: string;
} => {
  const offsetDatetime = datetime.plus({ months: offset });
  return {
    datetime: offsetDatetime,
    daysInMonth: offsetDatetime.endOf('month').day,
    firstDay: offsetDatetime.startOf('month').toISODate(),
    iso: offsetDatetime.toFormat('yyyy-LL'),
    lastDay: offsetDatetime.endOf('month').toISODate(),
    readable: offsetDatetime.toLocaleString({ month: 'long', year: 'numeric' }),
  };
};

export default getMonth;
