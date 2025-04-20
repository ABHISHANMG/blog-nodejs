const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const registerApi = require('./routes/register');
const postsRoutes = require('./routes/posts');
const connectDB = require('./config/configDB');
const verifyJwt = require('./middleware/verifyJwt');

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

// ⚠️ DO NOT use app.listen() on Vercel
module.exports = app;
