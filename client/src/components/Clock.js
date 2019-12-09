import React from 'react';
// import PropTypes from 'prop-types';

import useClockHook from '../hooks/useClockHook';

const Clock = props => {
  const clock = useClockHook();

  return (
    <h3>{clock}s</h3>  
  );
};

Clock.propTypes = {
  
};

export default Clock;