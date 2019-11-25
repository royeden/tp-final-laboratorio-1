const port = 3000;
const timeout = 180000;

const language = 'es';

const patch = {
  local_ip: '1.22',
  local_url: '/update',
  regex: /\/\/ change next line\n[^\n]*/g,
  raw_regex: '// change next line',
  replacement: url => `GetRequest getPercentage = new GetRequest("${url}");`
};

const html = {
  images: [...Array(12)].map((_, i) => `images/${i + 1}.png`),
  thresholds: [0, 10, 7, 3, 1]
};

const en = {
  boundaries: {
    max: ', but percentage is at max!',
    min: ', but percentage is at min!',
    fallback: '!'
  },
  html: {
    decrease: 'Decrease',
    description: 'Violence meter:',
    dislike: 'Dislike',
    increase: 'Increase',
    final_dislike: 'I liked it!',
    final_like: "I didn't like it",
    like: 'Like',
    loading: 'Loading...',
    prompt: 'Enter your desired name (letters, number and underscores are valid):',
    reset: 'Reset',
    response: 'Violence level:',
    title: 'Control panel'
  },
  initialMessage: port => `Initiated server in port ${port}!`,
  logSaved: 'Updated log!',
  percentageIsAt: percentage => `Percentage is at ${percentage}%`,
  receivedRequest: (type, from) => `Received ${type} request from ${from}`,
  receivedLike: (type, from) =>
    `${from} ${type} the presentation`,
  registeredUser: (id, username) => `Registered the user ${id}_${username}`,
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
  html: {
    decrease: 'Disminuir',
    description: 'Medidor de violencia:',
    dislike: 'No me gusta',
    increase: 'Aumentar',
    final_dislike: '¡No me gustó!',
    final_like: '¡Me gustó!',
    like: 'Me gusta',
    loading: 'Cargando...',
    prompt: 'Ingresa el nombre que quieras usar (son válidas letras, números y guiones bajos):',
    reset: 'Reiniciar',
    response: 'Nivel de violencia:',
    title: 'Panel de control'
  },
  initialMessage: port => `¡Servidor iniciado en el puerto ${port}!`,
  logSaved: '¡Datos actualizados!',
  percentageIsAt: percentage => `El porcentaje está al ${percentage}%`,
  receivedRequest: (type, from) =>
    `¡Recibido pedido de ${type} realizado por ${from}`,
  receivedLike: (type, from) =>
    `¡A ${from} le ${type} la presentación`,
  registeredUser: (id, username) => `Se registró el usuario ${id}_${username}`,
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
  language,
  patch,
  port,
  strings: {
    en,
    es
  },
  timeout,
  values: {
    html
  }
};
