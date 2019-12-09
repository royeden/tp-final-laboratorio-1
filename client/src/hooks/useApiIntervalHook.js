import { useState } from 'react';

const useApiIntervalHook = (request, interval = 1000) => {
  const [response, setResponse] = useState(null);
  const [intervalStarted, setIntervalStarted] = useState(false);

  let intervalId = null;

  const tepmRequest = async () => {
    const tempRes = await request();
    const res = await tempRes.json();
    return res;
  };

  const intervalCallback = () => setResponse(tepmRequest())

  const start = () => {
    setIntervalStarted(true);
    intervalId = setInterval(intervalCallback, interval);
  }
  
  const stop = () => {
    setIntervalStarted(false);
    clearInterval(intervalId);
  }

  return [response, start, stop, intervalStarted];
}

export default useApiIntervalHook;
