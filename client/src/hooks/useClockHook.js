import { useEffect, useState } from 'react';

import api from '../api';

const useClockHook = () => {
  const [clock, setClock] = useState(0);

  let clockInterval;

  const getTime = () =>
    api
      .getTime()
      .then(res => res.json())
      .then(({ time }) => setClock(time));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    clockInterval = setInterval(getTime, 1000);
    
    return () => {
      setClock(0);
      clearInterval(clockInterval);
    };
  }, []);

  return clock > 0 ? clock : 0;
};

export default useClockHook;
