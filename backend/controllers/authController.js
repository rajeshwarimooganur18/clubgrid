const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const Student = require('../models/Student');
const sendPasswordResetEmail = require('../utils/passwordResetEmail');

const PASSWORD_RESET_TTL_MS = 15 * 60 * 1000;
const PASSWORD_RESET_SUCCESS_MESSAGE =
    'If an account with that email exists, a password reset link has been sent.';

const generateToken = (student) => {
    const secret = process.env.JWT_SECRET || 'clubgrid_jwt_secret_key_2026_super_secure_random_string';
    return jwt.sign(
        { id: student._id, role: student.role },
        secret,
        { expiresIn: '7d' }
    );
};

// Validate file content by checking magic numbers
const validateFileContent = (filePath) => {
    return new Promise((resolve, reject) => {
        const buffer = Buffer.alloc(8);
        const fd = fs.openSync(filePath, 'r');
        fs.readSync(fd, buffer, 0, 8, 0);
        fs.closeSync(fd);

        // Check magic numbers
        // JPEG: FF D8 FF
        // PNG: 89 50 4E 47 0D 0A 1A 0A
        // PDF: 25 50 44 46 (%PDF)
        const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
        const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
        const isPdf = buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46;

        if (isJpeg || isPng || isPdf) {
            resolve(true);
        } else {
            reject(new Error('Invalid file content. Only JPEG, PNG, and PDF files are allowed.'));
        }
    });
};

// Clean up uploaded file
const cleanupFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.error('Failed to cleanup uploaded file:', err);
    }
};

// Register a new student
exports.register = async (req, res) => {
    let uploadedFilePath = null;

    try {
        // Handle both JSON and multipart/form-data
        const { fullName, email, password, department, year, studentId, phoneNumber, smsConsent } = req.body;

        if (!fullName || !email || !password || !department || !year ||
            typeof studentId !== 'string' || !studentId.trim()) {
            // Clean up uploaded file if validation fails
            if (req.file && req.file.path) {
                cleanupFile(req.file.path);
            }
            return res.status(400).json({
                message: 'Please provide full name, email, password, department, year, and USN.'
            });
        }

        if (password.length < 6) {
            if (req.file && req.file.path) {
                cleanupFile(req.file.path);
            }
            return res.status(400).json({
                message: 'Password must be at least 6 characters long.'
            });
        }

        // Validate phone number if provided
        if (phoneNumber && (typeof phoneNumber !== 'string' || phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber))) {
            if (req.file && req.file.path) {
                cleanupFile(req.file.path);
            }
            return res.status(400).json({
                message: 'Phone number must be a valid 10-digit number.'
            });
        }

        const normalizedStudentId = studentId.trim().toUpperCase();
        const normalizedEmail = email.trim().toLowerCase();
        const existingStudent = await Student.findOne({ email: normalizedEmail });

        if (existingStudent) {
            if (req.file && req.file.path) {
                cleanupFile(req.file.path);
            }
            return res.status(409).json({
                message: 'An account with this email address already exists. Please log in.'
            });
        }

        const escapedStudentId = normalizedStudentId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const existingStudentId = await Student.findOne({
            studentId: new RegExp(`^${escapedStudentId}$`, 'i')
        }).select('_id');

        if (existingStudentId) {
            if (req.file && req.file.path) {
                cleanupFile(req.file.path);
            }
            return res.status(409).json({
                message: 'This USN is already associated with another student.'
            });
        }

        // Validate and process ID card file if uploaded
        let idCardUrl = '';
        if (req.file && req.file.path) {
            uploadedFilePath = req.file.path;
            try {
                await validateFileContent(uploadedFilePath);
                // Store relative path for security - files are not publicly accessible
                idCardUrl = path.join('uploads', 'id-cards', path.basename(uploadedFilePath)).replace(/\\/g, '/');
            } catch (fileError) {
                cleanupFile(uploadedFilePath);
                return res.status(400).json({
                    message: fileError.message
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            department: department.trim(),
            year: year.trim(),
            studentId: normalizedStudentId,
            phoneNumber: phoneNumber || '',
            idCardUrl: idCardUrl,
            smsConsent: smsConsent === 'true' || smsConsent === true,
            role: 'student'
        });

        await newStudent.save();

        const token = generateToken(newStudent);

        res.status(201).json({
            message: 'Registration successful! Welcome to ClubGrid.',
            token,
            student: {
                id: newStudent._id,
                fullName: newStudent.fullName,
                email: newStudent.email,
                department: newStudent.department,
                year: newStudent.year,
                studentId: newStudent.studentId,
                phoneNumber: newStudent.phoneNumber,
                idCardUrl: newStudent.idCardUrl,
                smsConsent: newStudent.smsConsent,
                role: newStudent.role
            }
        });
    } catch (error) {
        // Clean up uploaded file on any error
        if (uploadedFilePath) {
            cleanupFile(uploadedFilePath);
        }
        console.error('Registration controller error:', error);
        res.status(500).json({
            message: 'Server error during registration. Please try again later.'
        });
    }
};

// Login user (Student or Admin)
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const student = await Student.findOne({ email: normalizedEmail });

        if (!student) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        // Check if role filter was requested (e.g. logging in from admin tab)
        if (role && role === 'admin' && student.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied. This account does not have administrator privileges.'
            });
        }

        const passwordMatch = await bcrypt.compare(password, student.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const token = generateToken(student);

        res.status(200).json({
            message: 'Login successful!',
            token,
            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email,
                department: student.department,
                year: student.year,
                studentId: student.studentId,
                role: student.role
            }
        });
    } catch (error) {
        console.error('Login controller error:', error);
        res.status(500).json({
            message: 'Server error during login. Please try again later.'
        });
    }
};

// Request a password reset link
exports.forgotPassword = async (req, res) => {
    try {
        const email = req.body && req.body.email;
        if (typeof email !== 'string' || !email.trim()) {
            return res.status(400).json({ message: 'A valid email address is required.' });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const student = await Student.findOne({ email: normalizedEmail });

        if (!student) {
            return res.status(200).json({ message: PASSWORD_RESET_SUCCESS_MESSAGE });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        student.passwordResetTokenHash = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        student.passwordResetExpiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS);
        await student.save();

        await sendPasswordResetEmail(student, resetToken);

        return res.status(200).json({ message: PASSWORD_RESET_SUCCESS_MESSAGE });
    } catch (error) {
        console.error('Forgot password controller error:', {
            name: error.name || 'Error',
            code: error.code || null
        });
        return res.status(500).json({
            message: 'Unable to process the password reset request. Please try again later.'
        });
    }
};

// Set a new password using a valid reset token
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body || {};
        if (typeof token !== 'string' || !token.trim()) {
            return res.status(400).json({ message: 'A password reset token is required.' });
        }
        if (typeof newPassword !== 'string' || newPassword.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long.'
            });
        }

        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const student = await Student.findOneAndUpdate(
            {
                passwordResetTokenHash: tokenHash,
                passwordResetExpiresAt: { $gt: new Date() }
            },
            {
                $set: {
                    password: await bcrypt.hash(newPassword, 10),
                    passwordResetTokenHash: null,
                    passwordResetExpiresAt: null
                }
            },
            { new: true }
        );

        if (!student) {
            return res.status(400).json({
                message: 'The password reset link is invalid or has expired.'
            });
        }

        return res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Reset password controller error:', {
            name: error.name || 'Error',
            code: error.code || null
        });
        return res.status(500).json({
            message: 'Unable to reset the password. Please try again later.'
        });
    }
};

// Get current student profile
exports.getProfile = async (req, res) => {
    try {
        res.status(200).json({
            student: req.user
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            message: 'Failed to retrieve profile.'
        });
    }
};

// Update student profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, department, year, studentId } = req.body || {};

        const student = await Student.findById(req.user._id);

        if (!student) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let normalizedStudentId;
        if (studentId !== undefined) {
            if (typeof studentId !== 'string' || !studentId.trim()) {
                return res.status(400).json({ message: 'USN is required.' });
            }

            normalizedStudentId = studentId.trim().toUpperCase();
            const escapedStudentId = normalizedStudentId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const existingStudent = await Student.findOne({
                _id: { $ne: req.user._id },
                studentId: new RegExp(`^${escapedStudentId}$`, 'i')
            }).select('_id');

            if (existingStudent) {
                return res.status(409).json({
                    message: 'This USN is already associated with another student.'
                });
            }
        }

        if (fullName) student.fullName = fullName.trim();
        if (department) student.department = department.trim();
        if (year) student.year = year.trim();
        if (normalizedStudentId !== undefined) student.studentId = normalizedStudentId;

        await student.save();

        res.status(200).json({
            message: 'Profile updated successfully!',
            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email,
                department: student.department,
                year: student.year,
                studentId: student.studentId,
                role: student.role
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            message: 'Failed to update profile.'
        });
    }
};
