const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        default: 'General'
    },
    date: {
        type: String,
        default: () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    },
    postedBy: {
        type: String,
        default: 'ClubGrid Admin'
    }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
