const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const stories = require('./routes/stories');

const port = parseInt(process.env.PORT) || 8080;
const app = express();

app.use(bodyParser.json(), cors(), express.static('build'));
app.use('/stories', stories);

app.get('/ping', (_req, res) => res.send('pong'));
app.get('/', (_req, res) => {
  res.sendFile(path.join('build', 'index.html'));
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
