const port = 3000;
const timeout = 180000;
const amount = 1; // Amount of people in the experience

const language = 'es';

const patch = {
  local_ip: '0.7',
  regex: /(GetRequest get(\w+) = new GetRequest\("([\w.:/]+)"\);\n)+/,
  replacement: url => `GetRequest getTime = new GetRequest("${url}/time");\nGetRequest getPercentage = new GetRequest("${url}/percentage");\n`
};

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
  receivedLike: (type, from) =>
    `${from} ${type} the presentation`,
  registeredUser: username => `Registered the user ${username}`,
  types: {
    decrease: 'decrease',
    increase: 'increase',
    like: 'likes',
    dislike: 'dislikes',
    final_like: 'liked',
    final_dislike: 'disliked',
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
  receivedLike: (type, from) =>
    `¡A ${from} le ${type} la presentación`,
  registeredUser: username => `Se registró el usuario ${username}`,
  types: {
    decrease: 'disminuir',
    increase: 'incrementar',
    like: 'gusta',
    dislike: 'disgusta',
    final_like: 'gustó',
    final_dislike: 'disgustó',
  }
};

exports.config = {
  amount,
  language,
  patch,
  port,
  strings: {
    en,
    es
  },
  timeout,

};
