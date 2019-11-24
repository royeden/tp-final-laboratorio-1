const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');
const fs = require('fs');

const { config } = require('./config');

const { language, port, strings: configStrings, timeout, values } = config;

const strings = configStrings[language];

const app = express();

let percentage = 0;
let user_id = 0;

const logPath = './logs/log.txt';
const increasePath = './logs/increase.txt';
const decreasePath = './logs/decrease.txt';
const likePath = './logs/like.txt';
const dislikePath = './logs/dislike.txt';
const usersPath = './logs/users.txt';

const fsCallback = error => {
  if (error) {
    return console.error(error);
  }

  console.log(strings.logSaved);
};

const write = (path, log) => fs.writeFile(path, log, fsCallback);
const append = (path, log) => fs.appendFile(path, `\n${log}\n`, fsCallback);

[
  logPath,
  increasePath,
  decreasePath,
  likePath,
  dislikePath,
  usersPath
].forEach(path =>
  write(
    path,
    `${strings.initialMessage(port)}\n${strings.percentageIsAt(percentage)}\n`
  )
);

app.use(bodyParser.json());
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
  res.render('index', { ...strings.html, timeout: 0, values: values.html });
});

app.get('/timeout', function(req, res) {
  res.render('index', { ...strings.html, timeout, values: values.html });
});

app.get('/admin', function(req, res) {
  res.render('admin', { ...strings.html, timeout: 0, values: values.html });
});

const handleUpdateRequest = (log, callback) => (req, res) => {
  const username = req.body.username;
  const logWithUser = log(username);
  console.log(logWithUser);
  append(logPath, logWithUser);
  callback(req, res, logWithUser);
};

app.post(
  '/id',
  handleUpdateRequest(
    username => strings.registeredUser(user_id, username),
    (_, res, log) => {
      append(usersPath, log);
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
      append(increasePath, log);
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
      append(decreasePath, log);
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
