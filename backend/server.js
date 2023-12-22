const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const merchantRoutes = require('./merchant'); 
const MerchantModel = require('./merchant-model');

const cors = require('cors');


const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/RegisterMerchant")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// User schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
const UserModel = mongoose.model("UserModel", userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the merchant routes
app.use('/merchants', merchantRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// POST /sign-up
app.post('/sign-up', (req, res) => {
  console.log('Request body:', req.body);
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Missing fields for registration' });
  }
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      newUser.save()
        .then(result => res.status(201).json({ message: 'User created', result }))
        .catch(err => {
          console.error('Error saving user:', err);
          res.status(500).json({ message: 'Error saving user', error: err.message });
        });
    })
    .catch(err => {
      console.error('Error hashing password:', err);
      res.status(500).json({ message: 'Error hashing password', error: err.message });
    });
});

app.post('/login', (req,res) => {

    let userFound;

    UserModel.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: 'User not found'
                })
            }
            userFound = user
            return bcrypt.compare(req.body.password, user.password)
        })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: 'Password is incorrect'
            })
        }

        const token = jwt.sign({email: userFound.email, userId: userFound._id}, "secret_string", {expiresIn:"1h"})
        return res.status(200).json({
            token: token
        })
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Error with authentication'
        })
    })
})

app.get('/merchants', async (req, res) => {
  try {
    const merchants = await MerchantModel.find();
    res.json(merchants);
  } catch (err) {
    console.error('Error fetching merchants:', err);
    res.status(500).json({ message: 'Error fetching merchants', error: err.message });
  }
});

app.put('/merchants/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;
    
    const updatedMerchant = await MerchantModel.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updatedMerchant) {
      return res.status(404).send('Merchant not found');
    }

    res.json({ message: 'Merchant updated successfully', updatedMerchant });
  } catch (err) {
    console.error('Error updating merchant:', err);
    res.status(500).json({ message: 'Error updating merchant', error: err.message });
  }
});





// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
