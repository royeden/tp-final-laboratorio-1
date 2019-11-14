const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const serveStatic = require('serve-static');

const app = express();

let percentage = 0;
let user_id = 0;

const fsCallback = error => {
  if (error) {
    return console.error(error);
  }

  console.log('Log was saved!');
};

fs.writeFile('log.txt', 'Initiated Log!\nPercentage is at 0%\n', fsCallback);

const fsAppend = (log, percentage) => {
  console.log(log);
  fs.appendFile(
    'log.txt',
    `\n${log}\n\nPercentage is at ${percentage}%\n`,
    fsCallback
  );
};

app.use(bodyParser.json());

app.use(serveStatic('static'));

app.post('/id', (req, res) => {
  const username = req.body.username;
  console.log(username)
  const log = `\nRegistered ${user_id}_${username}\n`;
  fs.appendFile('log.txt', log, fsCallback);
  res.json({
    user_id
  });
  ++user_id;
});

app.get('/update', (_, res) => {
  res.json({
    percentage
  });
});

app.put('/increase', (req, res) => {
  const username = req.body.username;
  const log = `Received increase request from ${username}`;
  if (percentage < 100) {
    ++percentage;
    fsAppend(log, percentage);
    res.send(log);
  } else {
    fsAppend(`${log}, but percentage is at max!`, percentage);
    res.send(`${log}, but percentage is at max!`);
  }
});

app.put('/decrease', (req, res) => {
  const username = req.body.username;
  const log = `Received decrease request from ${username}`;
  if (percentage > 0) {
    --percentage;
    fsAppend(log, percentage);
    res.send(log);
  } else {
    fsAppend(`${log}, but percentage is at min!`, percentage);
    res.send(`${log}, but percentage is at min!`);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
