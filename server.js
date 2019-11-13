const express = require('express');
const serveStatic = require('serve-static');

const app = express();

let percentage = 10;

app.use(serveStatic('static'));

app.get('/update', (_, res) => {
  res.set('Content-Type', 'text/html')
  res.json({
    percentage
  });
});

/*
fetch('/update', {
    method: 'GET'
}).then(res => res.json()).then(console.log)
*/

app.listen(3000, () => console.log('Example app listening on port 3000!'));

