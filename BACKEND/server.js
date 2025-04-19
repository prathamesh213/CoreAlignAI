const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 8000;
const connectDB = require('./Connect/database');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// 🛠️ Add middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Add route handlers
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handler
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
