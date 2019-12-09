import React, { useContext } from 'react';
import styled from 'styled-components';

import api from '../api';
import mapValue from '../utils/mapValue';
import usePercentageHook from '../hooks/usePercentageHook';
import { userContext } from '../context/UserProvider';

import Button from './Button';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const RectContainer = styled.div`
  background-color: #00000044;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  height: 2rem;
  overflow-x: hidden;
  width: 90vw;
`;

const Rect = styled.div`
  background-color: hsl(
    ${({ percentage }) =>
      `${mapValue(percentage, -100, 100, 193, 338)},${mapValue(
        percentage,
        -100,
        100,
        95,
        85
      )}%,${mapValue(percentage, -100, 100, 68, 46)}%`}
  );

  height: 2rem;
  transform: translateX(
    ${({ percentage }) => mapValue(percentage, -100, 100, -45, 45)}vw
  );
  transition: color 1s ease, transform 1s ease;
  width: 2vw;
`;

const LabelsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;

  span {
    font-size: 1rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90vw;
`;

const Display = () => {
  const percentage = usePercentageHook();
  const { user } = useContext(userContext);

  const decrease = () => api.postPercentageDecrease(user);
  const increase = () => api.postPercentageIncrease(user);
  return (
    <Container>
      <h3>Nivel de violencia:</h3>
      <LabelsContainer>
        <span>-100%</span>
        <span>0%</span>
        <span>100%</span>
      </LabelsContainer>
      <RectContainer>
        <Rect percentage={percentage} />
      </RectContainer>
      <ButtonsContainer>
        <Button type="lightblue" onClick={decrease}>
          Disminuir
        </Button>
        <Button type="red" onClick={increase}>
          Aumentar
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Display;
