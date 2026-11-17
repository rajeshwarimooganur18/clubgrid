const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    club: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed'],
        default: 'Upcoming'
    },
    countdown: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: '📅'
    },
    color: {
        type: String,
        default: '#7953ed'
    },
    background: {
        type: String,
        default: '#f0ebff'
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
