import React, { createContext } from 'react';
import useClockHook from '../hooks/useClockHook';

export const clockContext = createContext();

clockContext.displayName = 'ClockContext';

const { Provider } = clockContext;

const ClockProvider = ({ children }) => {
  const clock = useClockHook();
  return (
    <Provider value={{ clock }}>
      {children}
    </Provider>
  );
}

export default ClockProvider;