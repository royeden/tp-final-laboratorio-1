import React from 'react';

import Ads from './scenes/Ads';
import PercentageProvider from './context/PercentageProvider';
import ClockProvider from './context/ClockProvider';
import UI from './scenes/UI';
import UserModal from './scenes/UserModal';
import UserProvider from './context/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <PercentageProvider>
        <ClockProvider>
          <UserModal />
          <UI />
          <Ads />
        </ClockProvider>
      </PercentageProvider>
    </UserProvider>
  );
};

export default App;
