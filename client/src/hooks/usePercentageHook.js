import { useContext, useEffect, useState } from 'react';

import api from '../api';

import useApiIntervalHook from './useApiIntervalHook';
import { userContext } from '../context/UserProvider';

const usePercentageHook = () => {
  const [percentage, setPercentage] = useState(0);
  const [started, setStarted] = useState(0);
  const [response, start, stop] = useApiIntervalHook(api.getPercentage);
  const { userHasId } = useContext(userContext)

  if (response)
    response.then(({ percentage: p, started: s }) => {
      setPercentage(p);
      setStarted(s);
    });

  useEffect(() => {
    if (userHasId) start();
    else stop()
  }, [start, stop, userHasId]);

  return [percentage, started];
};

export default usePercentageHook;
