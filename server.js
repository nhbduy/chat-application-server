const SERVER_PORT = 3000;

const express = require('express');

const app = express();

app.listen(SERVER_PORT, () => {
  console.log('It works!!!');
})