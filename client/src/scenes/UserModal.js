import React, { useContext } from 'react';

import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import { userContext } from '../context/UserProvider';

const UserModal = () => {
  const { handleUserSubmit, userHasId, userLoading } = useContext(userContext);

  return (
    <Modal dismissable={false} visible={!userHasId}>
      <UserForm loading={userLoading} onSubmit={handleUserSubmit} />
    </Modal>
  )
}

export default UserModal;
