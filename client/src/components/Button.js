import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';

const TYPES = {
  customRed: 'custom-red',
  customGreen: 'custom-green',
  primary: 'primary',
  secondary: 'secondary',
};

const StyledButton = styled.button`
  background-color: ${({ type }) => type ? `var(--${TYPES[type]})` : 'transparent'};
  border: none;
  border-radius: 4px;
  color: ${({ type }) => type === "secondary" || type === "customRed" ? "white" : "black"};
  cursor: pointer;
  /* font-family: ''; */
  font-size: 1rem;
  font-weight: 400;
  padding: 0.6rem 2rem;
  transition: filter 0.4s ease;

  :focus,
  :hover {
    filter: brightness(${({ type }) => type === "secondary" ? 150 : 90}%);
  }
`;

const Button = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children.toUpperCase ? children.toUpperCase() : children}
    </StyledButton>
  );
};

Button.propTypes = {
  
};

export default Button;