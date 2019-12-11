import React from 'react';

import ContextProvider from './context/';
import Ads from './scenes/Ads';
import UI from './scenes/UI';
import UserModal from './scenes/UserModal';
import Alert from './components/Alert';
import FinalModal from './components/FinalModal';

const App = () => {
  return (
    <ContextProvider>
      <UserModal />
      <UI />
      <Ads />
      <Alert />
      <FinalModal />
    </ContextProvider>
  );
};

export default App;
