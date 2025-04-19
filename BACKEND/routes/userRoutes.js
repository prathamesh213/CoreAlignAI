const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', protect, getCurrentUser);

module.exports = router;
// Compare this snippet from node_modules/express/lib/router/index.js: