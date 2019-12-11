import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import api from '../api';
import useApiIntervalHook from '../hooks/useApiIntervalHook';
import usePreviousHook from '../hooks/usePreviousHook';
import { clockContext } from '../context/ClockProvider';
import { percentageContext } from '../context/PercentageProvider';
import { userContext } from '../context/UserProvider';

import Modal from './Modal';
import Button from './Button';

const ModalTitle = styled.h1`
  text-align: center;
`;

const ModalDescription = styled.h4`
  margin: 1rem 0;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;

  button {
    flex: 1;
    margin: 0 1rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const FinalModalContainer = () => {
  const { clock } = useContext(clockContext);
  const { percentage } = useContext(percentageContext);
  const { user, resetUser } = useContext(userContext);
  const [response, start, stop] = useApiIntervalHook(api.getReset, 1000);
  const [finalPercentage, setFinalPercentage] = useState(false);
  const [finalModal, setFinalModal] = useState(false);
  const [sentFinalModal, setSentFinalModal] = useState(false);

  const previousClock = usePreviousHook(clock);
  useEffect(() => {
    if (previousClock === 1 && clock === 0) {
      setFinalPercentage(percentage);
      setFinalModal(true);
    }
  }, [clock, percentage, previousClock]);

  if (response)
    response.then(({ reset }) => {
      if (reset) {
        resetUser();
      }
    });

  useEffect(() => {
    if (sentFinalModal) start();
  }, [sentFinalModal, start]);

  useEffect(() => {
    return stop;
  }, [stop])

  const handleRequest = ep => () =>
    ep(user).then(res => res.ok && setSentFinalModal(true));
  return (
    <Modal visible={finalModal}>
      <Container>
        <ModalTitle>¡Gracias por participar!</ModalTitle>
        {sentFinalModal ? (
          <>
            <ModalDescription>
              ¡Muchas gracias por tu respuesta!
            </ModalDescription>
            <ModalDescription>
              Aguardá a que lxs demás terminen de responder...
            </ModalDescription>
          </>
        ) : (
          <>
            <ModalDescription>
              Nivel de violencia final: {finalPercentage}%
            </ModalDescription>
            <ModalDescription>Contanos tu experiencia:</ModalDescription>
            <ModalButtons>
              <Button onClick={handleRequest(api.postDislike)} type="lightblue">
                No me gustó
              </Button>
              <Button onClick={handleRequest(api.postLike)} type="red">
                Me gustó
              </Button>
            </ModalButtons>
          </>
        )}
      </Container>
    </Modal>
  );
};

const FinalModal = () => {
  const { userHasId } = useContext(userContext);
  return userHasId && <FinalModalContainer />;
};

FinalModal.propTypes = {};

export default FinalModal;
