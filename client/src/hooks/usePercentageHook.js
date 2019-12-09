import { useEffect, useState } from 'react';

import api from '../api';

import useApiIntervalHook from './useApiIntervalHook';

const usePercentageHook = () => {
  const [percentage, setPercentage] = useState(0);
  const [response, start] = useApiIntervalHook(api.getPercentage);

  if (response)
    response.then(({ percentage }) => percentage).then(setPercentage);

  useEffect(() => {
    start();
  }, [start]);

  return percentage;
};

export default usePercentageHook;
