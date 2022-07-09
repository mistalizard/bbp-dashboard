const Partner = require('../models/partnerModel');

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
