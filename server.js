require('dotenv').config();

const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');
const fs = require('fs');
const serveStatic = require('serve-static');

const { config } = require('./config');

const { LANGUAGE_CONFIG } = process.env;

const { port, strings: configStrings } = config;

const strings = configStrings[LANGUAGE_CONFIG.toLowerCase()];

const app = express();

let percentage = 0;
let user_id = 0;

const fsCallback = error => {
  if (error) {
    return console.error(error);
  }

  console.log(strings.logSaved);
};

fs.writeFile(
  'log.txt',
  `${strings.initialMessage(port)}\n${strings.percentageIsAt(percentage)}\n`,
  fsCallback
);

app.use(bodyParser.json());

app.use(serveStatic('static'));

const handleUpdateRequest = (log, callback) => (req, res) => {
  const username = req.body.username;
  const logWithUser = log(username);
  console.log(logWithUser);
  fs.appendFile('log.txt', `\n${logWithUser}\n`, fsCallback);
  callback(req, res, logWithUser);
};

app.post(
  '/id',
  handleUpdateRequest(
    username => strings.registeredUser(user_id, username),
    (_, res) => {
      res.json({
        user_id
      });
      ++user_id;
    }
  )
);

app.get('/update', (_, res) => {
  res.json({
    percentage
  });
});

app.put(
  '/increase',
  handleUpdateRequest(
    username =>
      `${strings.receivedRequest(strings.types.increase, username)}${
        percentage < 100
          ? `${strings.boundaries.fallback}\n${strings.percentageIsAt(
              percentage + 1
            )}`
          : strings.boundaries.max
      }`,
    (_, res, log) => {
      if (percentage < 100) {
        ++percentage;
      }
      res.send(log);
    }
  )
);

app.put(
  '/decrease',
  handleUpdateRequest(
    username =>
      `${strings.receivedRequest(strings.types.decrease, username)}${
        percentage > 0
          ? `${strings.boundaries.fallback}\n${strings.percentageIsAt(
              percentage - 1
            )}`
          : strings.boundaries.min
      }`,
    (_, res, log) => {
      if (percentage > 0) {
        --percentage;
      }
      res.send(log);
    }
  )
);

app.listen(port, () =>
  console.log(chalk.bold(chalk.green(strings.initialMessage(port))))
);
