import React, { forwardRef } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ type }) => `var(--custom-${type})`};
  border: none;
  border-radius: 4px;
  color: ${({ type }) =>
    ['brown', 'red'].find(t => t === type) ? 'white' : 'black'};
  cursor: pointer;
  /* font-family: ''; */
  font-size: 1rem;
  font-weight: 400;
  padding: 0.6rem 2rem;
  transition: filter 0.4s ease;

  :focus,
  :hover {
    box-shadow: 1px 1px 2px #00000044;
    filter: brightness(${({ type }) => ['brown', 'green'].find(t => t === type) ? 120 : 90}%);
  }
`;

const Button = ({ children, ...props }, ref) => {
  return (
    <StyledButton ref={ref} {...props}>
      {children.toUpperCase ? children.toUpperCase() : children}
    </StyledButton>
  );
};

export default forwardRef(Button);
