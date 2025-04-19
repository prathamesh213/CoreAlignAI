const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//////////////////// Register a new user////////////////////////////////////////
    const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const userExists = await User.findOne({ email });
   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({  name, email, password: hashedPassword });       
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
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
            name: user.name,
            email: user.email,
            token: generateJWTToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const getCurrentUser = asyncHandler(async (req,res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({id: _id, name, email});
});

const generateJWTToken = id => {
 return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });  
};
module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
  };
