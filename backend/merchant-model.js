const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  companyDescription: {
    type: String,
    required: true
  },
  documentName: {
    type: String,
    required: false // Optional
  },
  documentDescription: {
    type: String,
    required: false // Optional
  },
  documentPath: {
    type: String,
    required: false // Optional
  }
});

const MerchantModel = mongoose.model('Merchant', merchantSchema);

module.exports = MerchantModel;
