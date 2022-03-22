import { useContext } from 'react';

import { NowContext } from 'context/Now';
import datetime from 'utils/datetime';

const useNow: UseNow = () => {
  const { now } = useContext(NowContext);
  return { now: now() };
};

export type UseNow = () => UseNowResult;

export interface UseNowResult {
  now: datetime;
}

export default useNow;
