import React from 'react';
import styled, { keyframes } from 'styled-components';
// import PropTypes from 'prop-types';

const opacityAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const LoaderItem = styled.span`
  animation: ${opacityAnimation} 1s,
    ${scaleAnimation} 1s ${({ amount, delay }) => delay / amount}s infinite;
  border-radius: 50%;
  background-color: var(--custom-${({ color }) => color});
  height: ${({ size }) => size}rem;
  margin: ${({ size }) => size / 8}rem;
  width: ${({ size }) => size}rem;
`;

const Loader = ({ amount, ...props }) => (
  <>
    {[...Array(amount)].map((_, index) => (
      <LoaderItem amount={amount} key={index} delay={index} {...props} />
    ))}
  </>
);

Loader.defaultProps = {
  color: 'green'
};

Loader.propTypes = {};

export default Loader;
