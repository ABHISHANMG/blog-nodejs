const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const handleRegister = async (req, res) => {
    const {name, email, password} = req.body;  
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPasswordFun = await hashPassword(password)
        const newUser = new User({
            name,
            email,
            password: hashedPasswordFun
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}


const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }   
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }   
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}  

const handleLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}



module.exports = {handleRegister, handleLogin,handleLogout};
// module.exports = router;