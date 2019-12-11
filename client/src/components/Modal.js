import React from 'react';
import styled, { css } from 'styled-components';
import { bool, func } from 'prop-types';

const absoluteFillMixin = css`
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const visibilityMixin = css`
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  transition-property: opacity;
  transition-duration: 0.4s;
`;

const ModalBackdrop = styled.div`
  ${absoluteFillMixin}
  ${visibilityMixin}
  background: rgba(0, 0, 0, 0.2);
`;

const ModalVisibility = styled.div`
  ${absoluteFillMixin}
  ${visibilityMixin}
  align-items: flex-start;
  display: flex;
  justify-content: center;
  padding-top: 15vh;
  pointer-events: none;
`;

const ModalBody = styled.div`
  background-color: #FFF;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  display: flex;
  height: auto;
  min-height: 40%;
  max-height: 80%;
  overflow-y: auto;
  padding: 2rem 1rem;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
  width: 90%;
`

const Modal = ({ children, dismissable, onClose, visible }) => {
  return (
    <>
      <ModalBackdrop onClick={dismissable ? onClose : undefined} visible={visible} />
      <ModalVisibility visible={visible}>
        <ModalBody visible={visible}>
          {visible && children}
        </ModalBody>
      </ModalVisibility>
    </>
  );
};

Modal.propTypes = {
  dismissable: bool,
  onClose: func,
  visible: bool.isRequired
};

export default Modal;