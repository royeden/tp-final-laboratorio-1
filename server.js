const express = require('express');
const serveStatic = require('serve-static');

const app = express();

let percentage = 0;

app.use(serveStatic('static'));

app.get('/update', (_, res) => {
  res.json({
    percentage
  });
});

app.put('/increase', (req, res) => {
  console.log(`Received increase request from ${req.username}`);
  if (percentage < 100) percentage++;
  res.send();
});

app.put('/decrease', (req, res) => {
  console.log(`Received decrease request from ${req.params.username}`);
  if (percentage > 0) percentage--;
  res.send();
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
