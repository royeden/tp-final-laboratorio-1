import React from 'react';

import UI from './scenes/UI';
import UserModal from './scenes/UserModal';
import UserProvider from './context/UserProvider';


const App = () => {

  return (
    <UserProvider>
      <UserModal />
      <UI />
    </UserProvider>
  );
};

export default App;
