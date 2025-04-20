const {handleRegister, handleLogin,handleLogout} = require('../controllers/register');
const express = require('express');
const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);

module.exports = router;