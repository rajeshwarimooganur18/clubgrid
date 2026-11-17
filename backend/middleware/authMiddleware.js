const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Verify JWT token
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Access denied. No authorization token provided.'
            });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'clubgrid_jwt_secret_key_2026_super_secure_random_string';

        const decoded = jwt.verify(token, secret);

        // Fetch user from DB to ensure account still exists
        const student = await Student.findById(decoded.id).select('-password');
        if (!student) {
            return res.status(401).json({
                message: 'Invalid session. User account not found.'
            });
        }

        req.user = student;
        next();
    } catch (error) {
        console.error('Auth verification error:', error.message);
        return res.status(401).json({
            message: 'Invalid or expired token. Please log in again.'
        });
    }
};

// Check if user is an admin
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Forbidden. Admin privileges are required to access this resource.'
        });
    }
    next();
};

// Optional auth - populates req.user if token is present, but doesn't block if missing
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET || 'clubgrid_jwt_secret_key_2026_super_secure_random_string';
            const decoded = jwt.verify(token, secret);
            const student = await Student.findById(decoded.id).select('-password');
            if (student) {
                req.user = student;
            }
        }
    } catch (e) {
        // ignore errors in optional auth
    }
    next();
};

module.exports = {
    verifyToken,
    requireAdmin,
    optionalAuth
};
