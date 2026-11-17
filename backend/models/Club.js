const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    path: { type: String, default: '' },
    description: { type: String, default: '' },
    logo: { type: String, default: '' }
}, { _id: false });

const clubSchema = new mongoose.Schema({
    clubId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: '🎯'
    },
    image: {
        type: String,
        default: ''
    },
    members: {
        type: String,
        default: '50+ members'
    },
    teams: [teamSchema]
}, { timestamps: true });

module.exports = mongoose.model('Club', clubSchema);
