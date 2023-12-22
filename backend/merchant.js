const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const MerchantModel = require('./merchant-model'); // Ensure this path is correct
const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '/uploads/');
    fs.mkdir(uploadsDir, { recursive: true }, (err) => cb(err, uploadsDir));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('document'), async (req, res) => {
  try {
    const { name, contactNumber, email, companyDescription } = req.body;
    const documentPath = req.file ? req.file.path : '';

    const newMerchant = new MerchantModel({
      name,
      contactNumber,
      email,
      companyDescription,
      documentPath
    });

    const result = await newMerchant.save();
    res.status(201).json({ message: 'Merchant created successfully', merchant: result });
  } catch (err) {
    console.error('Error occurred:', err);
    res.status(500).json({ message: 'Error saving merchant', error: err.message });
  }
});

module.exports = router;
