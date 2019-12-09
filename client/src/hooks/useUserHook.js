import { useEffect,useState } from 'react';

import api from '../api';

const useUserHook = () => {
  const [userHasId, setUserHasId] = useState(!!localStorage.getItem('user'));
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user'));
  
  const handleUserSubmit = value => {
    setUser(value);
  };

  useEffect(() => {
    if (!userHasId && !userLoading && user) {
      setUserLoading(true);
      api
        .getId()
        .then(res => res.json())
        .then(({ id }) => {
          const realUser = `${id}_${user}`;
          api.postUser(realUser).then(res => {
            if (res.ok) {
              localStorage.setItem('user', realUser);
              setUserHasId(true);
              setUserLoading(false);
              setUser(realUser);
            }
          })
        });
    }
  }, [userHasId, userLoading, user]);

  const resetUser = () => {
    localStorage.clear();
    setUser('');
    setUserHasId(false);
  };

  return {
    user,
    handleUserSubmit,
    resetUser,
    userHasId,
    userLoading
  }
}

export default useUserHook;