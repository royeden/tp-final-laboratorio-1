import { useEffect, useState } from 'react';

import useIntervalHook from './useIntervalHook';

const useApiIntervalHook = (request, interval = 1000) => {
  const [response, setResponse] = useState(null);
  const [running, setRunning] = useState(false);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);

  useEffect(() => {
    return stop;
  }, []);

  useIntervalHook(
    () => {
      const tepmRequest = async () => {
        const tempRes = await request();
        const res = await tempRes.json();
        return res;
      };
      setResponse(tepmRequest());
    },
    running ? interval : null
  );

  return [response, start, stop, running];
};

export default useApiIntervalHook;
