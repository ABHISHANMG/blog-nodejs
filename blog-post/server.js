const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const registerApi = require('./routes/register');
const postsRoutes = require('./routes/posts');
const connectDB = require('./config/configDB');
const verifyJwt = require('./middleware/verifyJwt');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/abhishan', (req, res) => {
    res.send('Missing you a little too much, a little too often, and a little more every day. 💖');
});

// Public routes (no JWT)
app.use('/', registerApi);

// Protected routes (JWT required)
app.use('/posts', verifyJwt, postsRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// ⚠️ DO NOT use app.listen() on Vercel
// module.exports = app;

// Start the server locally (for development/testing purposes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
