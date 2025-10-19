// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModal');
const User = require('../models/userModel');

const protectAdminRoute = async (req, res, next) => {
    let token;
    // console.log(req.headers);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

            req.admin = await Admin.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const protectUserRoute = async (req, res, next) => {
    let token;
    // console.log(req.headers);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = {
    protectAdminRoute,
    protectUserRoute
};
