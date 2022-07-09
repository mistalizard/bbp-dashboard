// TODO Add routes for updating / deleting partners. Updates will be able to cover adding and removing outages.

const express = require('express');
const partnerController = require('../controllers/partnerController');

const router = express.Router();

// Router root = /api/v1/partners
router
  .route('/')
  .get(partnerController.getAllPartners)
  .post(partnerController.addPartner);

module.exports = router;
