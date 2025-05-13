const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyJwt = (req, res, next) => {
    // Check for token in Authorization header or cookies
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        }

        req.userId = decoded.id;
        console.log('Decoded JWT:', decoded);
        console.log('User ID:', req.userId);
        next();
    });
};

module.exports = verifyJwt;
