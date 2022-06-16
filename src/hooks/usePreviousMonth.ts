import useOffsetMonth from 'hooks/useOffsetMonth';

const usePreviousMonth = ({ iso }: { iso?: string }): { iso: string } => {
  const { iso: previousMonth } = useOffsetMonth({ iso, offset: -1 });
  return {
    iso: previousMonth,
  };
};

export default usePreviousMonth;
