const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/userController');

const { mapResultToUser } = require('../controllers/assessmentOne');
const {protect} = require('../middleware/authMiddleware');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', protect, getCurrentUser);
router.post('/assessmentone', protect, mapResultToUser); // Route to map results to user




module.exports = router;
// Compare this snippet from node_modules/express/lib/router/index.js: