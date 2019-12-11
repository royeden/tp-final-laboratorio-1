import React from 'react';

import UserProvider from './UserProvider';
import PercentageProvider from './PercentageProvider';
import ClockProvider from './ClockProvider';

const ContextProvider = ({ children }) => (
  <UserProvider>
    <PercentageProvider>
      <ClockProvider>{children}</ClockProvider>
    </PercentageProvider>
  </UserProvider>
);

export default ContextProvider;
