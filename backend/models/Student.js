const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    passwordResetTokenHash: {
        type: String,
        default: null,
        select: false
    },
    passwordResetExpiresAt: {
        type: Date,
        default: null,
        select: false
    },
    department: {
        type: String,
        required: true,
        default: 'Not specified'
    },
    year: {
        type: String,
        required: true,
        default: '1st Year'
    },
    studentId: {
        type: String,
        default: '',
        trim: true
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
