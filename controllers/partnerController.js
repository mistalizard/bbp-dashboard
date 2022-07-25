const Partner = require('../models/partnerModel');
const messageEmiter = require('./../io');

// Get All Partners
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();

    res.status(200).json({
      status: 'success',
      data: {
        partner: partners,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: `${error}`,
    });
  }
};

// Get One Partner
exports.getPartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        partner,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `${error}`,
    });
  }
};

// Create Partner
exports.addPartner = async (req, res) => {
  try {
    const newPartner = await Partner.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        partner: newPartner,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: `${error}`,
    });
  }
};

// Update Partner
exports.updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      // Return the modified document rather than the original
      new: true,
      // Validate the data against our schema
      runValidators: true,
    });
    console.log('Params: ', req.params.id);
    console.log('Body: ', req.body);

    // TESTING///////////////////////////
    if (req.body.activeOutage === true) {
      console.log('Active Outage');
    } else {
      console.log('No Active Outage');
    }
    //////////////////////////////////////

    res.status(200).json({
      status: 'success',
      data: {
        partner,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: `${error}`,
    });
  }
};

// Delete Partner
exports.deletePartner = async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: {
        partner: null,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: `${error}`,
    });
  }
};
