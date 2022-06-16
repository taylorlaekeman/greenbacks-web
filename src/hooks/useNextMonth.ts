import useOffsetMonth from 'hooks/useOffsetMonth';

const useNextMonth = ({ iso }: { iso?: string }): { iso: string } => {
  const { iso: nextMonth } = useOffsetMonth({ iso, offset: 1 });
  return { iso: nextMonth };
};

export default useNextMonth;
