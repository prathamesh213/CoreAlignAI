const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8000;
const connectDB = require('./Connect/database');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
const app = express();

// 🛠️ Add middleware to parse JSON and URL-encoded data
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Add route handlers
app.use('/api/users', require('./routes/userRoutes'));

// Error handler
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
