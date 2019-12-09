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
  justify-content: space-around;
  width: 100vw;
`;

const UI = () => {
  const { user, userHasId, resetUser } = useContext(userContext);

  return (
    userHasId && (
      <Container>
        <h1>Bienvenidx {user.replace(/\d_/, '')}:</h1>
        
        <Clock />
        {process.env.NODE_ENV === 'development' && (
          <Button onClick={resetUser} type="brown">
            Reset
          </Button>
        )}
      </Container>
    )
  );
};

export default UI;
