const en = {
  boundaries: {
    max: ', but percentage is at max!',
    min: ', but percentage is at min!',
    fallback: '!'
  },
  initialMessage: port => `Initiated server in port ${port}!`,
  logSaved: 'Updated log!',
  percentageIsAt: percentage => `Percentage is at ${percentage}%`,
  receivedRequest: (type, from) => `Received ${type} request from ${from}`,
  registeredUser: (id, username) => `Registered the user ${id}_${username}`,
  types: {
    decrease: 'decrease',
    increase: 'increase'
  }
};

const es = {
  boundaries: {
    max: ', pero el porcentaje está al máximo!',
    min: ', pero el porcentaje está al mínimo!',
    fallback: '!'
  },
  initialMessage: port => `¡Servidor iniciado en el puerto ${port}!`,
  logSaved: '¡Datos actualizados!',
  percentageIsAt: percentage => `El porcentaje está al ${percentage}%`,
  receivedRequest: (type, from) =>
  `¡Recibido pedido de ${type} realizado por ${from}`,
  registeredUser: (id, username) => `Se registró el usuario ${id}_${username}`,
  types: {
    decrease: 'disminuir',
    increase: 'incrementar'
  }
};

exports.config = {
  port: 3000,
  strings: {
    en,
    es
  }
};
