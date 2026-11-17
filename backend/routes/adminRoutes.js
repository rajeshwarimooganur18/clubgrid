const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/stats', verifyToken, requireAdmin, adminController.getDashboardStats);
router.get('/students', verifyToken, requireAdmin, adminController.getRegisteredStudents);

module.exports = router;
