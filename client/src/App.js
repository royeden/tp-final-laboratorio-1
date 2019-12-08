import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from './components/Button';
import Modal from './components/Modal';
import UserForm from './components/UserForm';
import api from './api';

const Container = styled.main`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const App = () => {
  const [hasId, setHasId] = useState(!!localStorage.getItem('user'));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const handleSubmit = value => {
    setUser(value);
  };

  useEffect(() => {
    if (!hasId && !loading && user) {
      setLoading(true);
      api
        .getId()
        .then(res => res.json())
        .then(({ id }) => {
          const realUser = `${id}_${user}`;
          api.postUser(realUser).then(res => {
            if (res.ok) {
              localStorage.setItem('user', realUser);
              setHasId(true);
              setLoading(false);
              setUser(realUser);
            }
          })
        });
    }
  }, [hasId, loading, user]);

  const reset = () => {
    localStorage.clear();
    setUser('');
    setHasId(false);
  };

  return (
    <>
      <Modal dismissable={false} visible={!hasId}>
        <UserForm loading={loading} onSubmit={handleSubmit} />
      </Modal>
      <Container>
        {hasId && (
          process.env.NODE_ENV === 'development' && (
            <Button onClick={reset} type="secondary">
              Reset
            </Button>
          )
        )}
      </Container>
    </>
  );
};

export default App;
