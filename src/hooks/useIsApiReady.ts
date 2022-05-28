import { useContext } from 'react';

import { GreenbacksApiContext } from 'context/GreenbacksApi';

const useIsApiReady = (): { isReady: boolean } => {
  const { isReady } = useContext(GreenbacksApiContext);
  return { isReady };
};

export default useIsApiReady;
