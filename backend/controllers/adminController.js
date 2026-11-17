const Application = require('../models/Application');
const Student = require('../models/Student');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

// Get overall admin dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const [
            totalApplications,
            pendingApplications,
            acceptedApplications,
            rejectedApplications,
            totalStudents,
            totalEvents,
            totalAnnouncements
        ] = await Promise.all([
            Application.countDocuments(),
            Application.countDocuments({ status: 'Pending' }),
            Application.countDocuments({ status: 'Accepted' }),
            Application.countDocuments({ status: 'Rejected' }),
            Student.countDocuments({ role: 'student' }),
            Event.countDocuments(),
            Announcement.countDocuments()
        ]);

        res.status(200).json({
            totalApplications,
            pending: pendingApplications,
            accepted: acceptedApplications,
            rejected: rejectedApplications,
            totalStudents,
            totalEvents,
            totalAnnouncements
        });
    } catch (error) {
        console.error('Error fetching admin dashboard stats:', error);
        res.status(500).json({ message: 'Failed to retrieve dashboard stats.' });
    }
};

// Get all registered students
exports.getRegisteredStudents = async (req, res) => {
    try {
        const students = await Student.find({ role: 'student' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching registered students:', error);
        res.status(500).json({ message: 'Failed to retrieve students list.' });
    }
};
