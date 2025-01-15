const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.isSupplier = async (req, res, next) => {
    try {
        // Verify JWT token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        if (user.userType !== 'supplier') {
            return res.status(403).json({ error: 'User is not a supplier' });
        }

        // Attach user details to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying supplier:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};



exports.isCustomer = async (req, res, next) => {
    try {
        // Extract and verify JWT token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Check if the userType is "customer"
        if (user.userType !== 'customer') {
            return res.status(403).json({ error: 'User is not a customer' });
        }

        // Attach user details to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying customer:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};



exports.isAdmin = async (req, res, next) => {
    try {
        // Extract and verify JWT token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Check if the userType is "admin"
        if (user.userType !== 'admin') {
            return res.status(403).json({ error: 'User is not an admin' });
        }

        // Attach user details to the request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying admin:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};
