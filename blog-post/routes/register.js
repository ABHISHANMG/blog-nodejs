const { handleRegister, handleLogin, handleLogout } = require('../controllers/register');
const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middleware/errorHandler');

router.post('/register', asyncHandler(handleRegister));
router.post('/login', asyncHandler(handleLogin));
router.post('/logout', asyncHandler(handleLogout));

module.exports = router;