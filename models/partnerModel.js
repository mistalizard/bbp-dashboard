const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Partner must have a name'],
    unique: true,
    trim: true,
  },
  timeZone: {
    type: String,
    required: [true, 'Time zone must be "eastern", "central", or "pacific"'],
    trim: true,
  },
  activeOutage: {
    type: Boolean,
    default: false,
  },
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
