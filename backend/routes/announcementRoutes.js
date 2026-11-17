const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', announcementController.getAnnouncements);
router.post('/', verifyToken, requireAdmin, announcementController.createAnnouncement);
router.put('/:id', verifyToken, requireAdmin, announcementController.updateAnnouncement);
router.delete('/:id', verifyToken, requireAdmin, announcementController.deleteAnnouncement);

module.exports = router;
