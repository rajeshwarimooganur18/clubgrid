const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    clubId: {
        type: Number,
        min: 1
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    usn: {
        type: String,
        trim: true,
        default: ''
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    clubName: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    appliedOn: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
