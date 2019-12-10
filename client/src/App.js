import React from 'react';

import Ads from './scenes/Ads';
import PercentageProvider from './context/PercentageProvider';
import UI from './scenes/UI';
import UserModal from './scenes/UserModal';
import UserProvider from './context/UserProvider';


const App = () => {

  return (
    <UserProvider>
      <PercentageProvider>
        <UserModal />
        <UI />
        <Ads />
      </PercentageProvider>
    </UserProvider>
  );
};

export default App;
