import React, { useContext } from 'react';
// import PropTypes from 'prop-types';

import { clockContext } from '../context/ClockProvider';

const Clock = () => {
  const { clock } = useContext(clockContext);

  return (
    <h3>{clock}s</h3>  
  );
};

Clock.propTypes = {
  
};

export default Clock;