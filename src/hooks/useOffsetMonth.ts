import useCurrentMonth from 'hooks/useCurrentMonth';
import datetime from 'utils/datetime';

const useOffsetMonth = ({
  iso,
  offset,
}: {
  iso?: string;
  offset: number;
}): { iso: string } => {
  const { iso: currentMonth } = useCurrentMonth();
  const anchorMonth = iso || currentMonth;
  return {
    iso: datetime
      .fromISO(anchorMonth)
      .plus({ months: offset })
      .toFormat('yyyy-LL'),
  };
};

export default useOffsetMonth;
