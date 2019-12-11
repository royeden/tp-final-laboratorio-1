const bodyParser = require('body-parser');
const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
const serveStatic = require('serve-static')

const { config } = require('./config');

module.exports = () => {
  const { amount, language, port, strings: configStrings, timeout } = config;

  const strings = configStrings[language];

  const app = express();

  let id = 0;
  let started;
  let usersToRegister;
  let percentage;
  // let session_id = 0;
  let time;
  let timeInterval;

  const fullLogPath = `./logs/log.txt`;
  // const logPath = () => `./logs/${session_id}/log.txt`;
  // const increasePath = () => `./logs/${session_id}/increase.txt`;
  // const decreasePath = () => `./logs/${session_id}/decrease.txt`;
  // const dislikePath = () => `./logs/${session_id}/dislike.txt`;
  // const likePath = () => `./logs/${session_id}/like.txt`;
  // const finalDislikePath = () => `./logs/${session_id}/final_dislike.txt`;
  // const finalLikePath = () => `./logs/${session_id}/final_like.txt`;
  const logPath = () => `./logs/log.txt`;
  const increasePath = () => `./logs/increase.txt`;
  const decreasePath = () => `./logs/decrease.txt`;
  const dislikePath = () => `./logs/dislike.txt`;
  const likePath = () => `./logs/like.txt`;
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
    // fs.mkdir(`./logs/${session_id}`, fsCallback);
    [
      logPath,
      increasePath,
      decreasePath,
      dislikePath,
      likePath
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

  const reset = () => {
    started = false;
    usersToRegister = amount;
    percentage = 0;
    time = timeout;
    timeInterval = null;
  }

  const start = () => {
    started = true;
    timeInterval = setInterval(() => {
      if (time > 0) time -= 1000;
    }, 1000);
    setTimeout(() => {
      clearInterval(timeInterval);
    }, timeout + 1000);
  }

  reset();

  app.use(bodyParser.json());
  app.use(serveStatic('client/build/'));

  const handleUpdateRequest = (log, callback) => (req, res) => {
    const user = req.body.user;
    const logWithUser = log(user);
    console.log(logWithUser);
    append(fullLogPath, logWithUser);
    // append(logPath(), logWithUser); TODO FIX THIS
    callback(req, res, logWithUser);
  };

  app.get('/id', (_, res) => {
    res.json({
      id
    });
    ++id;
    --usersToRegister;
    if (!usersToRegister) start();
  });

  app.get('/percentage', (_, res) => {
    res.json({
      started,
      percentage
    });
  });
  
  app.get('/reset', (_, res) => {
    res.json({
      reset: !started
    });
  });

  app.get('/time', (_, res) => {
    res.json({
      time
    });
  });

  app.post(
    '/user',
    handleUpdateRequest(
      username => strings.registeredUser(username),
      (_, res, log) => {
        append(usersPath, log);
        res.send(log);
      }
    )
  );

  app.post(
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

  app.post(
    '/decrease',
    handleUpdateRequest(
      username =>
        `${strings.receivedRequest(strings.types.decrease, username)}${
          percentage > -100
            ? `${strings.boundaries.fallback}\n${strings.percentageIsAt(
                percentage - 1
              )}`
            : strings.boundaries.min
        }`,
      (_, res, log) => {
        append(decreasePath(), log);
        if (percentage > -100) {
          --percentage;
        }
        res.send(log);
      }
    )
  );

  app.post(
    '/like',
    handleUpdateRequest(
      username =>
        `${strings.receivedLike(strings.types.like, username)}${`${
          strings.boundaries.fallback
        }\n${strings.percentageIsAt(percentage)}`}`,
      (_, res, log) => {
        ++usersToRegister;
        if (usersToRegister === amount) reset();
        append(likePath(), log);
        res.send(log);
      }
    )
  );

  app.post(
    '/dislike',
    handleUpdateRequest(
      username =>
        `${strings.receivedLike(strings.types.dislike, username)}${`${
          strings.boundaries.fallback
        }\n${strings.percentageIsAt(percentage)}`}`,
      (_, res, log) => {
        ++usersToRegister;
        if (usersToRegister === amount) reset();
        append(dislikePath(), log);
        res.send(log);
      }
    )
  );

  app.listen(port, () =>
    console.log(chalk.bold(chalk.green(strings.initialMessage(port))))
  );
};
