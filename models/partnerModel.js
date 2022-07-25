const mongoose = require('mongoose');
const slugify = require('slugify');

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
  businessHours: {
    open: {
      type: String,
      required: [true, 'Business hours start time must be specified in this format HH:MM'],
    },
    close: {
      type: String,
      required: [true, 'Business hours end time must be specified in this format HH:MM'],
    },
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create slug from name. Runs before any validation
partnerSchema.pre('validate', function (next) {
  if (this.name) {
    // Sets slug to lowercase and gets rid of any characters that don't fit in a URL such as ':'
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  next();
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
