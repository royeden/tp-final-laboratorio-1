const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');
const fs = require('fs');

const { config } = require('./config');

module.exports = () => {
  require('dotenv').config();
  
  const { PASSWORD } = process.env;

  const { language, port, strings: configStrings, timeout, values } = config;

  const strings = configStrings[language];

  const app = express();

  let percentage = 0;
  let user_id = 0;
  let session_id = 0;
  let time = null;
  let reset = false;

  const fullLogPath = `./logs/log.txt`;
  const logPath = () => `./logs/${session_id}/log.txt`;
  const increasePath = () => `./logs/${session_id}/increase.txt`;
  const decreasePath = () => `./logs/${session_id}/decrease.txt`;
  const dislikePath = () => `./logs/${session_id}/dislike.txt`;
  const likePath = () => `./logs/${session_id}/like.txt`;
  const finalDislikePath = () => `./logs/${session_id}/final_dislike.txt`;
  const finalLikePath = () => `./logs/${session_id}/final_like.txt`;
  const usersPath = `./logs/users.txt`;

  const fsCallback = path => error => {
    if (error) {
      throw new Error(error);
    }

    console.log(`${path}:\n${strings.logSaved}`);
  };

  const unlink = path => fs.unlinkSync(path, fsCallback(path));
  const write = (path, log) => fs.writeFile(path, log, fsCallback(path));
  const append = (path, log) =>
    fs.appendFile(path, `\n${log}\n`, fsCallback(path));

  fs.readdirSync('./logs/').forEach(folder => {
    if (fs.lstatSync(`./logs/${folder}`).isDirectory()) {
      fs.readdirSync(`./logs/${folder}/`).forEach(file => {
        unlink(`./logs/${folder}/${file}`);
      });
      fs.rmdirSync(`./logs/${folder}`);
    }
  });

  write(
    fullLogPath,
    `${strings.initialMessage(port)}\n${strings.percentageIsAt(percentage)}\n`
  );
  write(
    usersPath,
    `${strings.initialMessage(port)}\n${strings.percentageIsAt(percentage)}\n`
  );

  const init = () => {
    fs.mkdir(`./logs/${session_id}`, fsCallback);
    [
      logPath,
      increasePath,
      decreasePath,
      dislikePath,
      likePath,
      finalDislikePath,
      finalLikePath
    ].forEach(path =>
      write(
        path(),
        `${strings.initialMessage(port)}\n${strings.percentageIsAt(
          percentage
        )}\n`
      )
    );
  };

  init();

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
    append(fullLogPath, logWithUser);
    // append(logPath(), logWithUser); TODO FIX THIS
    callback(req, res, logWithUser);
  };

  app.get('/time', (req, res) => {
    res.json({
      time
    });
  });

  app.put('/time', (req, res) => {
    const { timeout } = req.body;
    time = timeout;
    res.send(`Received ${time}!`);
  });

  app.post('/password', (req, res) => {
    const password = req.body.password;
    res.json({
      correct: password === PASSWORD
    });
  });

  app.get('/reset', (req, res) => {
    res.json({
      reset
    });
    reset = false;
  });

  app.post('/reset', (req, res) => {
    const password = req.body.password;
    if (password === PASSWORD && time === 0 && !reset) {
      percentage = 0;
      time = null;
      append(
        fullLogPath,
        `\n\n===\n\nReset\n${strings.percentageIsAt(percentage)}\n`
      );
      reset = true;
      session_id += 1;
      init();
    }
    res.send('Reset');
  });

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
        append(increasePath(), log);
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
        append(decreasePath(), log);
        if (percentage > 0) {
          --percentage;
        }
        res.send(log);
      }
    )
  );

  app.put(
    '/like',
    handleUpdateRequest(
      username =>
        `${strings.receivedLike(strings.types.like, username)}${`${
          strings.boundaries.fallback
        }\n${strings.percentageIsAt(percentage)}`}`,
      (_, res, log) => {
        append(likePath(), log);
        res.send(log);
      }
    )
  );

  app.put(
    '/dislike',
    handleUpdateRequest(
      username =>
        `${strings.receivedLike(strings.types.dislike, username)}${`${
          strings.boundaries.fallback
        }\n${strings.percentageIsAt(percentage)}`}`,
      (_, res, log) => {
        append(dislikePath(), log);
        res.send(log);
      }
    )
  );

  app.put(
    '/final_like',
    handleUpdateRequest(
      username =>
        `${strings.receivedLike(strings.types.final_like, username)}${`${
          strings.boundaries.fallback
        }\n${strings.percentageIsAt(percentage)}`}`,
      (_, res, log) => {
        append(finalLikePath(), log);
        res.send(log);
      }
    )
  );

  app.put(
    '/final_dislike',
    handleUpdateRequest(
      username =>
        `${strings.receivedLike(strings.types.final_dislike, username)}${`${
          strings.boundaries.fallback
        }\n${strings.percentageIsAt(percentage)}`}`,
      (_, res, log) => {
        append(finalDislikePath(), log);
        res.send(log);
      }
    )
  );

  app.listen(port, () =>
    console.log(chalk.bold(chalk.green(strings.initialMessage(port))))
  );
};
