const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//////////////////// Register a new user////////////////////////////////////////
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;

  if (!firstname || !email || !password || !phone || !lastname) {
    res.status(400);
    throw new Error('Please enter all fields');
  }
  
  // Fix: Properly await the userExists query
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Corrected user creation
  const user = await User.create({
    firstname: firstname, // Use correct field names
    lastname: lastname,   // Use correct field names
    email: email,
    phone: phone,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,  // Use correct field names
      lastname: user.lastname,    // Use correct field names
      phone: user.phone,
      email: user.email,
      token: generateJWTToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }

});

//////////////////// Login a existing user////////////////////////////////////////
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validation check
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide both email and password');
  }
  // Await the query result
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname, // Use correct field names
      email: user.email,
      token: generateJWTToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id, firstname, email } = await User.findById(req.user.id); // Correct field names
  res.status(200).json({ id: _id, firstname, email }); // Correct field names
});

const generateJWTToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
