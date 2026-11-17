const Announcement = require('../models/Announcement');

// Get all announcements
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.status(200).json(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error.message);
        res.status(500).json({ message: 'Failed to retrieve announcements.' });
    }
};

// Create a new announcement (Admin)
exports.createAnnouncement = async (req, res) => {
    try {
        const { title, description, category, date } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: 'Title and description are required.'
            });
        }

        const newAnnouncement = new Announcement({
            title: title.trim(),
            description: description.trim(),
            category: category || 'General',
            date: date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
            postedBy: (req.user && req.user.fullName) ? req.user.fullName : 'ClubGrid Admin'
        });

        await newAnnouncement.save();

        res.status(201).json({
            message: 'Announcement posted successfully!',
            announcement: newAnnouncement
        });
    } catch (error) {
        console.error('Create announcement error:', error);
        res.status(500).json({
            message: 'Failed to create announcement.'
        });
    }
};

// Update an announcement (Admin)
exports.updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Announcement.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ message: 'Announcement not found.' });
        }

        res.status(200).json({
            message: 'Announcement updated successfully!',
            announcement: updated
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update announcement.' });
    }
};

// Delete an announcement (Admin)
exports.deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Announcement.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Announcement not found.' });
        }

        res.status(200).json({ message: 'Announcement deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete announcement.' });
    }
};
