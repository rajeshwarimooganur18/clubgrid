const Application = require('../models/Application');
const sendApplicationStatusEmail = require('../utils/applicationStatusEmail');

const normalizeText = (value) => typeof value === 'string' ? value.trim() : '';

// Submit a new club application
exports.createApplication = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'student') {
            return res.status(403).json({
                message: 'Only students can submit applications.'
            });
        }
        const body = req.body || {};
        const studentUser = req.user;
        const studentId = studentUser._id;
        const name = normalizeText(studentUser.fullName);
        const usn = normalizeText(studentUser.studentId).toUpperCase();
        const department = normalizeText(studentUser.department);
        const year = normalizeText(studentUser.year);
        const reason = normalizeText(body.reason);
        const clubName = normalizeText(body.clubName);
        const teamName = normalizeText(body.teamName);
        const providedEmail = normalizeText(body.email);
        const studentEmail = normalizeText(
            (studentUser && studentUser.email) ||
            providedEmail ||
            (usn ? `${usn.toLowerCase()}@college.edu` : '')
        ).toLowerCase();
        const clubId = body.clubId === undefined || body.clubId === null || body.clubId === ''
            ? undefined
            : Number(body.clubId);
        const skills = normalizeText(body.skills);

        if (!name || !studentEmail || !department || !year || !reason || !clubName || !teamName) {
            return res.status(400).json({
                message: 'Please provide your name, email, department, year, reason, club, and team.'
            });
        }

        if (clubId !== undefined && (!Number.isInteger(clubId) || clubId < 1)) {
            return res.status(400).json({ message: 'Club ID must be a positive integer.' });
        }

        const identityConditions = [{ email: studentEmail }];
        if (usn) identityConditions.push({ usn });
        if (studentId) identityConditions.push({ student: studentId });

        const existingApplication = await Application.findOne({
            clubName,
            teamName,
            $or: identityConditions
        });

        if (existingApplication) {
            return res.status(409).json({
                message: `You have already applied to ${teamName} (${clubName}). Your application status is currently: ${existingApplication.status}.`
            });
        }

        const newApplication = new Application({
            student: studentId,
            clubId,
            name,
            email: studentEmail,
            usn,
            department,
            year,
            clubName,
            teamName,
            reason,
            skills,
            status: 'Pending',
            appliedOn: new Date()
        });

        await newApplication.save();

        res.status(201).json({
            message: 'Your application has been submitted successfully!',
            application: newApplication
        });
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'CastError') {
            return res.status(400).json({
                message: error.message
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                message: 'An application with these details already exists.'
            });
        }

        console.error('Submit application error:', error);
        res.status(500).json({
            message: 'Failed to submit application. Please try again.'
        });
    }
};

// Get applications submitted by the logged-in student
exports.getMyApplications = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required.' });
        }

        const applications = await Application.find({
            student: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error('Get my applications error:', error);
        res.status(500).json({
            message: 'Failed to load your applications.'
        });
    }
};

// Get all applications (Admin) with optional filter
exports.getAllApplications = async (req, res) => {
    try {
        const { club, status } = req.query;
        const filter = {};

        if (club && club !== 'All') {
            filter.clubName = club;
        }

        if (status && status !== 'All') {
            filter.status = status;
        }

        const applications = await Application.find(filter).sort({ createdAt: -1 });

        res.status(200).json(applications);
    } catch (error) {
        console.error('Get all applications error:', error);
        res.status(500).json({
            message: 'Failed to retrieve applications.'
        });
    }
};

// Update application status (Admin)
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Accepted', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status. Must be Pending, Accepted, or Rejected.'
            });
        }

        const application = await Application.findById(id);

        if (!application) {
            return res.status(404).json({
                message: 'Application not found.'
            });
        }

        if (application.status === status) {
            return res.status(200).json({
                message: `Application status is already ${status}.`,
                application
            });
        }

        const updatedApplication = await Application.findOneAndUpdate(
            { _id: application._id, status: application.status },
            { $set: { status } },
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return res.status(409).json({
                message: 'Application status changed before this update could be saved. Please refresh and try again.'
            });
        }

        let emailSent = null;
        if (status === 'Accepted' || status === 'Rejected') {
            try {
                await sendApplicationStatusEmail(updatedApplication);
                emailSent = true;
            } catch (error) {
                emailSent = false;
                console.error('[application-status-email] Notification failed; application status remains saved.', {
                    applicationId: String(updatedApplication._id),
                    status,
                    name: error.name || 'Error',
                    code: error.code || null,
                    responseCode: Number.isInteger(error.responseCode) ? error.responseCode : null
                });
            }
        } else {
            console.info('[application-status-email] Notification skipped for non-final status.', {
                status
            });
        }

        res.status(200).json({
            message: emailSent === false
                ? `Application status updated to ${status}, but the email notification failed.`
                : `Application status updated to ${status}.`,
            application: updatedApplication,
            emailSent
        });
    } catch (error) {
        console.error('Update status error:', error);
        res.status(500).json({
            message: 'Failed to update application status.'
        });
    }
};

// Delete an application (Admin)
exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Application.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Application not found.' });
        }

        res.status(200).json({ message: 'Application deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete application.' });
    }
};
