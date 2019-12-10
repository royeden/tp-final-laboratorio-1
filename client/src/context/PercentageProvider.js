import React, { createContext } from 'react';
import usePercentageHook from '../hooks/usePercentageHook';

export const percentageContext = createContext();

percentageContext.displayName = 'PercentageContext';

const { Provider } = percentageContext;

const PercentageProvider = ({ children }) => {
  const percentage = usePercentageHook();
  return (
    <Provider value={{ percentage }}>
      {children}
    </Provider>
  );
}

export default PercentageProvider;