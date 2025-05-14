const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const registerApi = require('./routes/register');
const postsRoutes = require('./routes/posts');
const connectDB = require('./config/configDB');
const verifyJwt = require('./middleware/verifyJwt');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const multer = require('multer');
const path = require('path');

// Connect to MongoDB
// connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // serve uploaded files statically

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



// Storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // upload folder
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    }
  });
  
  // File filter (optional: only allow certain types)
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false);
  };
  
  // Multer config
  const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB max
  });
  
  
  // 🧪 Upload endpoint
  app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.json({
      message: 'File uploaded successfully',
      file: req.file.filename,
      path: `/uploads/${req.file.filename}`
    });
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
