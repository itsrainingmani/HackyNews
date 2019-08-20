import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { join } from 'path';

const port = process.env.PORT || 8080;
const app = express();

app.use(json());
app.use(cors());
app.use(express.static('build'));

app.get('/ping', (req, res) => res.send('pong'));
app.get('/', (req, res) => {
  res.sendFile(join('build', 'index.html'), { root: '../' });
});

app.listen(port, () => {
  console.log(`Server is listening on port - ${port}`);
});
