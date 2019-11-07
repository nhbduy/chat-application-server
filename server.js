const express = require('express');

const { SERVER_PORT } = require('./config');

const app = express();

app.listen(SERVER_PORT, () => {
  console.log(`Server is start on port ${SERVER_PORT}`);
});
