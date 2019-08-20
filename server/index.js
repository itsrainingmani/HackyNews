const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));

app.get('/ping', (req, res) => res.send('pong'));
app.get('/', (req, res) => {
  res.sendFile(path.join('build', 'index.html'), { root: '../' });
});

app.listen(port, () => {
  console.log(`Server is listening on port - ${port}`);
});
