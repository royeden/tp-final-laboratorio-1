import { useEffect, useState } from 'react';

import api from '../api';
import useApiIntervalHook from './useApiIntervalHook';

const useClockHook = () => {
  const [clock, setClock] = useState(0);
  const [response, start, stop] = useApiIntervalHook(api.getTime);


  if (response) response.then(({ time }) => time).then(setClock);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return clock > 0 ? clock : 0;
};

export default useClockHook;
