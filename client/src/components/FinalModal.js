import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import { clockContext } from '../context/ClockProvider';

import Modal from './Modal';
import Button from './Button';

const ModalTitle = styled.h1`
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const FinalModal = () => {
  const { clock } = useContext(clockContext);
  const [finalModal, setFinalModal] = useState(false);
  const [sentFinalModal, setSentFinalModal] = useState(false);
  useEffect(() => {
    if (clock === 1) setFinalModal(true);
  }, [clock]);
  return (
    <Modal visible={finalModal}>
      <Container>
        <ModalTitle>¡Gracias por participar!</ModalTitle>
        <ModalButtons>
          <Button type="lightblue">No me gustó</Button>
          <Button type="red">Me gustó</Button>
        </ModalButtons>
      </Container>
    </Modal>
  );
};

FinalModal.propTypes = {};

export default FinalModal;
