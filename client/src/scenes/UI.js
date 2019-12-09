import React, { useContext } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';
import { userContext } from '../context/UserProvider';
import Clock from '../components/Clock';

const Container = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const UI = () => {
  const { user, userHasId, resetUser } = useContext(userContext);

  return (
    <Container>
      {userHasId && process.env.NODE_ENV === 'development' && (
        <>
          <h1>Bienvenidx {user.replace(/\d_/, "")}:</h1>
          <Clock />
          <Button onClick={resetUser} type="secondary">
            Reset
          </Button>
        </>
      )}
    </Container>
  );
};

export default UI;
