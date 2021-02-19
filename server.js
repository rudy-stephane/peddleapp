const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

//CORS Middleware
app.use(function (req, res, next) {
//Enabling CORS
  res.header("Access-Control-Allow-Origin", "https://www.linkedin.com");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

app.use(express.static('./dist/peddle'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/peddle/'}),
);

app.listen(process.env.PORT || 8080);
