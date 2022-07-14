const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc); // Required for timezone plugin
dayjs.extend(timezone); // Allows us to specify the timezone for the time request.

const test = require('./controllers/cardController');
const checkBusinessHours = require('./controllers/cardController');

const partnerRouter = require('./routes/partnerRoutes');
const Partner = require('./models/partnerModel');

const app = express();

// PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, '/public')));

// EJS ENGINe
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// MORGAN
console.log('Node Environment: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    // Sets time per timezone and formats it in a 12 hour clock w/ AM or PM
    const time = {
      easternTime: dayjs().tz('America/New_York').format('h:mm A'),
      centralTime: dayjs().tz('America/Chicago').format('h:mm A'),
    };

    const data = await Partner.find();

    // data.forEach(partner => console.log(partner.businessHours));

    // console.log(data);

    res.render('index', { data, time }, test(), checkBusinessHours());
  } catch (error) {
    res.status(404).render('notfound');
  }
});

// app.get('/dashboard', async (req, res) => {});

app.use('/api/v1/partners', partnerRouter);

app.get('/outages', (req, res) => {
  res.send('Outage Page');
});

module.exports = app;
