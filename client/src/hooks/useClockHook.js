import { useContext, useEffect, useState } from 'react';

import api from '../api';

import useApiIntervalHook from './useApiIntervalHook';
import { userContext } from '../context/UserProvider';

const useClockHook = () => {
  const [clock, setClock] = useState(0);
  const [response, start, stop] = useApiIntervalHook(api.getTime);
  const { userHasId } = useContext(userContext);

  if (response) response.then(({ time }) => time).then(setClock);

  useEffect(() => {
    if (userHasId) start();
    else stop();
  }, [start, stop, userHasId]);

  return clock > 0 ? clock / 1000 : 0;
};

export default useClockHook;
