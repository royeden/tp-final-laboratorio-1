import React, { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const baseColor = '#000';
const errorColor = 'var(--custom-red)';
const focusedColor = 'var(--custom-green)';

const Container = styled.div`
  margin-bottom: 1rem;
`;

const StyledInputContainer = styled.div`
  border-radius: 4px 4px 0px 0px;
  border-bottom: 2px solid
    ${({ error, focused }) =>
      focused ? focusedColor : error ? errorColor : baseColor};
  padding: 0.5rem;
  transition: border-bottom 0.4s ease;
`;

const StyledLabel = styled.label`
  color: ${({ error }) => (error ? errorColor : baseColor)};
  font-size: 0.9rem;
`;

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  font-size: 1.1rem;
  margin: 4px 0;
  outline: none;
  width: 100%;
`;

const StyledError = styled.span`
  color: ${errorColor};
`;

const Input = ({ error, onBlur, onFocus, onSubmit, title, value, ...props }, ref) => {
  const input = useRef();
  const [focused, setFocused] = useState(false);

  const compositeRef = element => {
    input.current = element;
    if (ref) {
      if (typeof ref === 'function') ref(element);
      else ref.current = element;
    }
  };

  const focusInput = () => input.current.focus();

  const handleBlur = () => {
    setFocused(false);
    onBlur && onBlur(input.current);
  };

  const handleFocus = () => {
    setFocused(true);
    onFocus && onFocus(input.current);
  };

  const handleKeyPress = ({ key }) => {
    if (key === "Enter") {
      if (error) input.current.blur();
      else if(onSubmit) onSubmit(value)
    }
  };

  return (
    <Container>
      <StyledInputContainer
        error={error}
        onClick={focusInput}
        focused={focused}
      >
        <>
          <StyledLabel htmlFor={title}>{title}</StyledLabel>
          <StyledInput
            {...props}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyPress={handleKeyPress}
            ref={compositeRef}
            type="text"
            value={value}
          />
        </>
      </StyledInputContainer>
      {error && !focused && <StyledError>{error}</StyledError>}
    </Container>
  );
};

export default forwardRef(Input);
