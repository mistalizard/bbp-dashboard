const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc); // Required for timezone plugin
dayjs.extend(timezone); // Allows us to specify the timezone for the time request.
dayjs.extend(customParseFormat); // Allows us to parse a string into a dayjs object.

// Used to convert the supplied hour and minut into a single value which can be used for time comparison.
const getCurrentTime = (hour, minute) => {
  minute = minute < 10 ? `0${minute}` : `${minute}`;
  let currentTime = `${hour}${minute}`;
  currentTime = parseInt(currentTime);
  return currentTime;
};

module.exports = function () {
  this.test = function (timezone, open, close) {
    console.log(timezone, open, close);
  };
  this.checkBusinessHours = function (timezone, open, close) {
    // Accepts the opening business hour string passed from the database and converts it into a number in the 24hr format without a ':'. This creates a value we can use to compare to the current time.
    const startOfBusiness = parseInt(parseInt(open.split(':')[0]) + open.split(':')[1]);
    const endOfBusiness = parseInt(parseInt(close.split(':')[0]) + 12 + close.split(':')[1]);

    // Creates an object containing the current time based on the timezone, then passes it to the getCurrentTime function in order to convert it into a format we can compare to startOfBusiness and endOfBusiness.
    if (timezone === 'eastern') {
      const currentTimeObj = dayjs().tz('America/New_York');
      const currentTime = getCurrentTime(currentTimeObj.$H, currentTimeObj.$m);

      // If within business hours
      if (currentTime >= startOfBusiness && currentTime < endOfBusiness) {
        return true;
      } else {
        return false;
      }
    } else if (timezone === 'central') {
      const currentTimeObj = dayjs().tz('America/Chicago');
      const currentTime = getCurrentTime(currentTimeObj.$H, currentTimeObj.$m);

      if (currentTime >= startOfBusiness && currentTime < endOfBusiness) {
        return true;
      } else {
        return false;
      }
    }
  };
};
