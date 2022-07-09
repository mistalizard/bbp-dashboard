const express = require('express');
const morgan = require('morgan');

const partnerRouter = require('./routes/partnerRoutes');

const app = express();

console.log('Node Environment: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server Live');
});

app.use('/api/v1/partners', partnerRouter);

app.get('/outages', (req, res) => {
  res.send('Outage Page');
});

module.exports = app;
