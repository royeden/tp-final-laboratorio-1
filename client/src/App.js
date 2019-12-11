import React from 'react';

import ContextProvider from './context/';
import Ads from './scenes/Ads';
import UI from './scenes/UI';
import UserModal from './scenes/UserModal';

const App = () => {
  return (
    <ContextProvider>
      <UserModal />
      <UI />
      <Ads />
    </ContextProvider>
  );
};

export default App;
