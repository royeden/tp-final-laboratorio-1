import { useState } from 'react';

const useApiIntervalHook = (request, interval = 1000) => {
  const [response, setResponse] = useState(null);
  const [running, setRunning] = useState(false);

  let intervalId = null;

  const stop = () => {
    setRunning(false);
    clearInterval(intervalId);
  }

  const tepmRequest = async () => {
    const tempRes = await request();
    const res = await tempRes.json();
    return res;
  };

  const intervalCallback = () => setResponse(tepmRequest())

  const start = () => {
    setRunning(true);
    intervalId = setInterval(intervalCallback, interval);
  }

  return [response, start, stop, running];
}

export default useApiIntervalHook;
