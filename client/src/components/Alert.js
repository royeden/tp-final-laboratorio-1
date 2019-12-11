import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import { clockContext } from '../context/ClockProvider';
import { percentageContext } from '../context/PercentageProvider';

import Modal from './Modal';
import Button from './Button';

const ModalTitle = styled.h1`
  text-align: center;
`;

const ModalDescription = styled.p`
  margin: 1rem 0;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const Alert = () => {
  const [alert, setAlert] = useState(false);
  const [hasShownAlert, setHasShownAlert] = useState(false);
  const { percentage } = useContext(percentageContext);
  const { clock } = useContext(clockContext);

  useEffect(() => {
    if (percentage >= 85 && !hasShownAlert) {
      setAlert(true);
      setHasShownAlert(true);
    }
    if (clock === 0) setAlert(false);
  }, [clock, hasShownAlert, percentage]);

  return (
    <Modal visible={alert}>
      <Container>
        <ModalTitle>AVISO:</ModalTitle>
        <ModalDescription>
          Los contenidos que se van a mostrar a continuación pueden incomodar a
          algunas personas. Se recomienda discreción.
        </ModalDescription>
        <Button type="red" onClick={() => setAlert(false)}>
          Entendido
        </Button>
      </Container>
    </Modal>
  );
};

Alert.propTypes = {};

export default Alert;
