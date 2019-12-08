import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

import Button from './Button';
import Input from './Input';
import Loader from './Loader';

const Center = styled.div`
  align-items: center;
  display: flex;
  flex: ${({ grow }) => grow ? 1 : 0};
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;


const UserForm = ({ loading, onSubmit }) => {
  const userInput = useRef();

  useEffect(() => {
    if (userInput.current) userInput.current.focus();
  }, []);

  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (value) {
      const regexp = /[^\wÑñÁáÉéÍíÓóÚúÜü _\-.]+/g;
      if (regexp.test(value))
        setError(
          'Por favor ingresa caracteres válidos (letras, números, espacios "_", "-" o ".")'
        );
      else setError('');
    } else setError('Es requerido ingresar un nombre');
  }, [value]);

  const handleUserInput = ({ target }) => {
    setValue(target.value);
  };

  const handleSubmit = () => {
    if (!error) onSubmit(value);
  };

  return loading ? (
    <Center grow>
      <Loader amount={3} size={2} />
    </Center>
  ) : (
    <Container>
      <Input
        error={error}
        maxLength="20"
        onChange={handleUserInput}
        onSubmit={handleSubmit}
        placeholder="Ingresá tu nombre de usuario"
        ref={userInput}
        title="Nombre"
        value={value}
      />

      <Center>
        <Button type="primary" onClick={handleSubmit}>
          Confirmar
        </Button>
      </Center>
    </Container>
  );
};

UserForm.propTypes = {};

export default UserForm;
