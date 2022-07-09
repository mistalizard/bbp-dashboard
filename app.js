const express = require('express');
const morgan = require('morgan');

const app = express();

console.log('Node Environment: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Server Live');
});

module.exports = app;
