const express = require('express');
const applicationController = require('../controllers/applicationController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, applicationController.createApplication);
router.get('/my', verifyToken, applicationController.getMyApplications);
router.get('/my-applications', verifyToken, applicationController.getMyApplications);
router.get('/', verifyToken, requireAdmin, applicationController.getAllApplications);
router.patch('/:id/status', verifyToken, requireAdmin, applicationController.updateApplicationStatus);
router.delete('/:id', verifyToken, requireAdmin, applicationController.deleteApplication);

module.exports = router;
