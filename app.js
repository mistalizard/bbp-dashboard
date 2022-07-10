const express = require('express');
const path = require('path');
const morgan = require('morgan');

const partnerRouter = require('./routes/partnerRoutes');
const Partner = require('./models/partnerModel');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

console.log('Node Environment: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', async (req, res) => {
  const providers = [{ name: 'Altamaha' }, { name: 'Tri-Co Connections' }];
  const data = await Partner.find();
  console.log('Results: ', data.length);
  console.log(data);
  res.render('dashboard', { data });
});

app.use('/api/v1/partners', partnerRouter);

app.get('/outages', (req, res) => {
  res.send('Outage Page');
});

module.exports = app;
