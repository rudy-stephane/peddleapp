const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.static('./dist/peddle'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/peddle/'}),
);

app.listen(process.env.PORT || 8080);
