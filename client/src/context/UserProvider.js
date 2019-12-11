import React, { createContext } from 'react';
import useUserHook from '../hooks/useUserHook';

export const userContext = createContext();

userContext.displayName = 'UserContext';

const { Provider } = userContext;

const UserProvider = ({ children }) => {
  return <Provider value={{ ...useUserHook() }}>{children}</Provider>;
};

export default UserProvider;
