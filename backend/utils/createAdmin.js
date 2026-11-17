const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const connectDB = require('../config/db');

const createAdmin = async () => {
    const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error('ADMIN_CREDENTIALS_MISSING');
    }

    if (password.length < 6) {
        throw new Error('ADMIN_PASSWORD_TOO_SHORT');
    }

    await connectDB();
    try {
        const existingAccount = await Student.findOne({ email }).select('_id');
        if (existingAccount) {
            throw new Error('ADMIN_EMAIL_ALREADY_EXISTS');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Student({
            fullName: 'ClubGrid Admin',
            email,
            password: hashedPassword,
            department: 'Administration',
            year: 'Staff',
            role: 'admin'
        });

        await admin.save();
    } finally {
        await mongoose.disconnect();
    }

    console.log('Admin account created successfully.');
};

createAdmin().catch((error) => {
    const messages = {
        ADMIN_CREDENTIALS_MISSING: 'Set ADMIN_EMAIL and ADMIN_PASSWORD in the process environment.',
        ADMIN_PASSWORD_TOO_SHORT: 'ADMIN_PASSWORD must be at least 6 characters.',
        ADMIN_EMAIL_ALREADY_EXISTS: 'An account with ADMIN_EMAIL already exists; no changes were made.'
    };

    if (error.code === 11000) {
        console.error('An account with ADMIN_EMAIL already exists; no changes were made.');
    } else if (error.name === 'ValidationError') {
        console.error('Admin account details failed model validation.');
    } else {
        console.error(messages[error.message] || `Admin account creation failed (${error.name || 'Error'}).`);
    }

    process.exitCode = 1;
});
